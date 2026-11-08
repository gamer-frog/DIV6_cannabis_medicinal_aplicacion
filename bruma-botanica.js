(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const board = $('tablero');
  const roundValue = $('roundValue');
  const scoreValue = $('scoreValue');
  const timeValue = $('timeValue');
  const pairsValue = $('pairsValue');
  const progressBar = $('progressBar');
  const roundPrompt = $('roundPrompt');
  const gameStatus = $('gameStatus');
  const victoryPanel = $('victoryPanel');
  const victoryCopy = $('victoryCopy');
  const ROUND_NAMES = ['El primer brote', 'Jardín en flor', 'La última cosecha'];
  const TOTAL_PAIRS = [4, 5, 6].reduce((sum, count) => sum + count, 0);
  let round = 1;
  let score = 0;
  let matchedPairs = 0;
  let deck = [];
  let selected = [];
  let locked = false;
  let startedAt = null;
  let elapsedBeforeRound = 0;
  let timerId = null;
  let resolveMismatchId = null;
  let transitionId = null;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainder = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
  }

  function elapsedSeconds() {
    return elapsedBeforeRound + (startedAt === null ? 0 : Math.floor((Date.now() - startedAt) / 1000));
  }

  function updateTimer() {
    timeValue.textContent = formatTime(elapsedSeconds());
  }

  function updateScoreboard() {
    const pairsThisRound = round + 3;
    roundValue.innerHTML = `${round} <small>/ ${BrumaCore.roundCount}</small>`;
    scoreValue.textContent = String(score).padStart(3, '0');
    pairsValue.innerHTML = `${matchedPairs} <small>/ ${pairsThisRound}</small>`;
    const pairsBefore = [4, 5, 6].slice(0, round - 1).reduce((sum, count) => sum + count, 0);
    progressBar.style.width = `${((pairsBefore + matchedPairs) / TOTAL_PAIRS) * 100}%`;
  }

  function describeCard(card, index, state) {
    if (state === 'matched') return `${card.name}, pareja encontrada, carta ${index + 1}`;
    if (state === 'revealed') return `${card.name}, carta ${index + 1}`;
    return `Carta oculta ${index + 1}`;
  }

  function renderBoard(focusIndex = null) {
    board.replaceChildren();
    deck.forEach((card, index) => {
      const button = document.createElement('button');
      const state = card.matched ? 'matched' : card.revealed ? 'revealed' : 'hidden';
      button.type = 'button';
      button.className = `memory-card${card.revealed ? ' is-revealed' : ''}${card.matched ? ' is-matched' : ''}`;
      button.disabled = card.matched || (locked && !card.revealed);
      button.setAttribute('aria-label', describeCard(card, index, state));
      button.setAttribute('aria-pressed', String(card.revealed || card.matched));
      button.innerHTML = `<span class="card-back" aria-hidden="true">✳</span><span class="card-face" aria-hidden="true">${card.icon}</span>`;
      button.addEventListener('click', () => selectCard(index));
      board.append(button);
    });
    if (focusIndex !== null) board.children[focusIndex]?.focus();
  }

  function beginClock() {
    if (startedAt !== null) return;
    startedAt = Date.now();
    timerId = window.setInterval(updateTimer, 250);
  }

  function selectCard(index) {
    if (locked) return;
    const card = deck[index];
    if (!card || card.matched || card.revealed) return;
    beginClock();
    card.revealed = true;
    selected.push(index);
    renderBoard(index);
    if (selected.length < 2) {
      gameStatus.textContent = `Revelaste ${card.name}. Buscá su pareja.`;
      return;
    }

    const [firstIndex, secondIndex] = selected;
    const first = deck[firstIndex];
    const second = deck[secondIndex];
    locked = true;
    if (first.pair === second.pair) {
      first.matched = true;
      second.matched = true;
      matchedPairs += 1;
      score = BrumaCore.scoreMatch(score, true);
      selected = [];
      locked = false;
      gameStatus.textContent = `¡Pareja de ${first.name}! +100 puntos.`;
      updateScoreboard();
      const nextIndex = deck.findIndex((candidate, candidateIndex) => candidateIndex > index && !candidate.matched);
      renderBoard(nextIndex >= 0 ? nextIndex : deck.findIndex((candidate) => !candidate.matched));
      if (matchedPairs === round + 3) finishRound();
      return;
    }

    score = BrumaCore.scoreMatch(score, false);
    gameStatus.textContent = 'No coinciden. Probá otra vez: −10 puntos.';
    updateScoreboard();
    renderBoard(index);
    resolveMismatchId = window.setTimeout(() => {
      first.revealed = false;
      second.revealed = false;
      selected = [];
      locked = false;
      resolveMismatchId = null;
      gameStatus.textContent = 'Seguí buscando las parejas.';
      renderBoard(index);
    }, 750);
  }

  function finishRound() {
    if (round === BrumaCore.roundCount) {
      window.clearInterval(timerId);
      timerId = null;
      elapsedBeforeRound = elapsedSeconds();
      startedAt = null;
      updateTimer();
      progressBar.style.width = '100%';
      gameStatus.textContent = 'Partida completada.';
      victoryCopy.textContent = `Terminaste con ${score} puntos en ${formatTime(elapsedBeforeRound)}. ¡Una pausa bien aprovechada!`;
      victoryPanel.hidden = false;
      $('playAgainButton').focus();
      return;
    }

    gameStatus.textContent = `Ronda ${round} completa. Preparando el siguiente jardín…`;
    transitionId = window.setTimeout(() => {
      transitionId = null;
      elapsedBeforeRound = elapsedSeconds();
      startedAt = null;
      round += 1;
      matchedPairs = 0;
      selected = [];
      locked = false;
      deck = BrumaCore.makeDeck(round);
      roundPrompt.textContent = `Ronda ${round} · ${ROUND_NAMES[round - 1]}`;
      updateScoreboard();
      renderBoard();
      gameStatus.textContent = `Ronda ${round}. ¡Encontrá ${round + 3} parejas!`;
      board.querySelector('button:not(:disabled)')?.focus();
    }, 650);
  }

  function restartGame() {
    window.clearInterval(timerId);
    window.clearTimeout(resolveMismatchId);
    window.clearTimeout(transitionId);
    timerId = null;
    resolveMismatchId = null;
    transitionId = null;
    round = 1;
    score = 0;
    matchedPairs = 0;
    selected = [];
    locked = false;
    startedAt = null;
    elapsedBeforeRound = 0;
    victoryPanel.hidden = true;
    roundPrompt.textContent = `Ronda 1 · ${ROUND_NAMES[0]}`;
    gameStatus.textContent = 'Elegí una carta para empezar.';
    deck = BrumaCore.makeDeck(round);
    updateScoreboard();
    updateTimer();
    renderBoard();
  }

  $('restartButton').addEventListener('click', restartGame);
  $('playAgainButton').addEventListener('click', restartGame);
  restartGame();
})();
