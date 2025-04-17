"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/Layout';
import HabitList from '@/components/HabitList';
import NotificationManager from '@/components/NotificationManager';

interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  archivedAt?: string;
  reminderTime?: string;
  reminderDays?: number[];
}

const STORAGE_KEY = 'stones-habits-v2';

export default function Page() {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    if (storedHabits) {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        setHabits(parsedHabits);
      } catch (e) {
        console.error('Error parsing stored habits:', e);
        setHabits([]);
      }
    }
  }, []);

  // Pass habits state update function to HabitList
  const updateHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Stones</h1>
          <p className="text-gray-400 mt-2">
            Build lasting habits, one day at a time.
          </p>
        </div>

        <HabitList habits={habits} onHabitsChange={updateHabits} />
        <NotificationManager habits={habits} />
      </div>
    </Layout>
  );
}