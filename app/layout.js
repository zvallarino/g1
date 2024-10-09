// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Game Project',
  description: 'A mobile-focused game built with Next.js and Tailwind CSS',
};

// app/layout.js
import { QuestionProvider } from './context/QuestionContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QuestionProvider>{children}</QuestionProvider>
      </body>
    </html>
  );
}