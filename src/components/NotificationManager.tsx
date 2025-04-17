"use client";

import { useEffect, useRef } from 'react';
import { format, getDay } from 'date-fns';

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
  const lastNotificationTime = useRef<string>('');

  useEffect(() => {
    // Check if we're running on localhost or HTTPS
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isSecure = window.location.protocol === 'https:';
    
    if (!isLocalhost && !isSecure) {
      console.warn('Notifications require HTTPS or localhost. Current URL:', window.location.href);
      return;
    }

    // Request notification permission on component mount
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notifications");
      return;
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }

    // Load notification sound
    notificationSound.current = new Audio('/notification.mp3');
    notificationSound.current.load();
  }, []);

  useEffect(() => {
    console.log('NotificationManager mounted/updated with habits:', habits);

    const checkReminders = () => {
      const now = new Date();
      const currentTime = format(now, 'HH:mm');
      const currentDay = getDay(now);

      console.log('Checking reminders at:', currentTime);
      console.log('Current day:', currentDay);
      console.log('Number of habits to check:', habits.length);
      
      habits.forEach((habit) => {
        console.log('-------------------');
        console.log('Checking habit:', habit.title);
        console.log('Habit reminder time:', habit.reminderTime);
        console.log('Habit reminder days:', habit.reminderDays);
        console.log('Notification permission:', Notification.permission);

        // Prevent duplicate notifications in the same minute
        if (lastNotificationTime.current === currentTime) {
          console.log('Skipping duplicate notification for time:', currentTime);
          return;
        }

        const timeMatches = habit.reminderTime === currentTime;
        const dayMatches = habit.reminderDays?.includes(currentDay);

        console.log('Time matches:', timeMatches, '(current:', currentTime, 'reminder:', habit.reminderTime, ')');
        console.log('Day matches:', dayMatches, '(current:', currentDay, 'reminder days:', habit.reminderDays, ')');

        if (
          habit.reminderTime &&
          habit.reminderDays?.includes(currentDay) &&
          habit.reminderTime === currentTime
        ) {
          console.log('✅ Reminder conditions met for habit:', habit.title);
          lastNotificationTime.current = currentTime;
          
          // Show notification
          if (Notification.permission === 'granted') {
            try {
              new Notification('Habit Reminder', {
                body: `Time to ${habit.title.toLowerCase()}`,
                icon: '/icon.png',
                requireInteraction: true, // Keep notification visible until user interacts with it
                tag: `habit-${habit.id}`, // Prevent duplicate notifications
              });

              // Play sound
              if (notificationSound.current) {
                notificationSound.current.play().catch(error => {
                  console.error('Failed to play notification sound:', error);
                });
              }
            } catch (error) {
              console.error('Failed to show notification:', error);
            }
          } else {
            console.warn('Notification permission not granted');
          }
        }
      });
    };

    // Check immediately on mount or habits change
    checkReminders();

    // Then check every 30 seconds instead of every minute to avoid missing the exact time
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, [habits]);

  return null;
} 