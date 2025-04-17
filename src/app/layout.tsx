import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserMenu from '@/components/UserMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stones Habit Tracker',
  description: 'Build lasting habits, one day at a time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-900">
                <header className="bg-gray-800 shadow-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-bold text-white">
                        Stones Habit Tracker
                      </h1>
                      <UserMenu />
                    </div>
                  </div>
                </header>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {children}
                </main>
              </div>
            </ProtectedRoute>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
