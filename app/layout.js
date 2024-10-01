// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Game Project',
  description: 'A mobile-focused game built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}