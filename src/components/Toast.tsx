'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}>
        <span>{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
} 