"use client";

import { useEffect, useRef } from 'react';
import { format, isToday, getDay } from 'date-fns';

interface Habit {
  id: string;
  title: string;
  description: string;
  reminderTime?: string;
  reminderDays?: number[];
}

interface NotificationManagerProps {
  habits: Habit[];
}

export default function NotificationManager({ habits }: NotificationManagerProps) {
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load notification sound
    notificationSound.current = new Audio('/notification.mp3');
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = format(now, 'HH:mm');
      const currentDay = getDay(now);

      habits.forEach((habit) => {
        if (
          habit.reminderTime &&
          habit.reminderDays?.includes(currentDay) &&
          habit.reminderTime === currentTime
        ) {
          // Request notification permission if not already granted
          if (Notification.permission === 'default') {
            Notification.requestPermission();
          }

          // Show notification
          if (Notification.permission === 'granted') {
            new Notification('Habit Reminder', {
              body: `Time to ${habit.title.toLowerCase()}`,
              icon: '/icon.png',
            });

            // Play sound
            if (notificationSound.current) {
              notificationSound.current.play().catch(console.error);
            }
          }
        }
      });
    };

    // Check every minute
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [habits]);

  return null;
} 