'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProtectedRoute>{children}</ProtectedRoute>
      </AuthProvider>
    </ToastProvider>
  );
} 