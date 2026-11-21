import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cannabis-lider — Botardo OS',
  description: 'cannabis-lider division app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
