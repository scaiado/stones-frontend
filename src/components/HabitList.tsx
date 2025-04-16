"use client";

import React, { useState, useEffect } from 'react';
import HabitCard from './HabitCard';
import NewHabitModal from './NewHabitModal';

interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  archivedAt?: string;
}

const defaultHabits: Habit[] = [
  {
    id: 'walk',
    title: 'Walk around the block',
    description: 'Go for a short walk to clear the mind',
    icon: '🚶',
    color: 'bg-green-500',
    days: 30
  },
  {
    id: 'norwegian',
    title: 'Learn Norwegian',
    description: 'Three lessons per day',
    icon: '📚',
    color: 'bg-purple-500',
    days: 30
  },
  {
    id: 'fruit',
    title: 'Eat a piece of fruit',
    description: 'Stay healthy and don\'t overeat',
    icon: '🍎',
    color: 'bg-red-500',
    days: 30
  },
  {
    id: 'stretch',
    title: 'Stretch for 5 minutes',
    description: 'Improve flexibility and relax muscles',
    icon: '🧘',
    color: 'bg-orange-500',
    days: 30
  }
];

const STORAGE_KEY = 'stones-habits';
const ARCHIVE_STORAGE_KEY = 'stones-habits-archive';

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [archivedHabits, setArchivedHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load habits and archived habits from localStorage on mount
  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    const storedArchivedHabits = localStorage.getItem(ARCHIVE_STORAGE_KEY);

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      setHabits(defaultHabits);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultHabits));
    }

    if (storedArchivedHabits) {
      setArchivedHabits(JSON.parse(storedArchivedHabits));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits]);

  // Save archived habits to localStorage whenever they change
  useEffect(() => {
    if (archivedHabits.length > 0) {
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archivedHabits));
    }
  }, [archivedHabits]);

  const handleAddHabit = (newHabit: Omit<Habit, 'id'>) => {
    const habit: Habit = {
      ...newHabit,
      id: newHabit.title.toLowerCase().replace(/\s+/g, '-'),
    };
    
    setHabits((prev) => [...prev, habit]);
    setIsModalOpen(false);
  };

  const handleArchiveHabit = (habitId: string) => {
    setHabits((prev) => {
      const habitToArchive = prev.find((h) => h.id === habitId);
      if (!habitToArchive) return prev;

      // Add to archived habits
      setArchivedHabits((archived) => [
        ...archived,
        { ...habitToArchive, archivedAt: new Date().toISOString() }
      ]);

      // Remove from active habits
      return prev.filter((h) => h.id !== habitId);
    });
  };

  return (
    <div>
      {/* Add New Habit Button */}
      <button 
        className="w-full mb-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm shadow-lg flex items-center justify-center gap-2 transition-colors group"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="h-8 w-8 rounded-full bg-gray-700 group-hover:bg-gray-600 flex items-center justify-center transition-colors">
          <span className="text-xl font-semibold text-white">+</span>
        </span>
        <span className="text-gray-400 group-hover:text-gray-300">Add New Habit</span>
      </button>

      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            title={habit.title}
            description={habit.description}
            icon={habit.icon}
            color={habit.color}
            days={habit.days}
            onArchive={() => handleArchiveHabit(habit.id)}
          />
        ))}
      </div>

      <NewHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHabit}
      />
    </div>
  );
} 