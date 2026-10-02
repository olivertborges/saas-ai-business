import './globals.css';

export const metadata = {
  title: 'SaaS AI Business',
  description: 'Sistema inteligente para gestionar y hacer crecer tu negocio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
