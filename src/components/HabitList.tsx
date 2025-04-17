"use client";

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HabitCard from './HabitCard';
import NewHabitModal from './NewHabitModal';
import ArchiveToggle from './ArchiveToggle';

// Add JSX namespace to fix element type errors
import type { JSX } from 'react';

interface Habit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  archivedAt?: string;
  reminderTime?: string; // HH:mm format
  reminderDays?: number[]; // Array of day numbers (0-6, where 0 is Sunday)
}

const defaultHabits: Omit<Habit, 'id'>[] = [
  {
    title: 'Walk around the block',
    description: 'Go for a short walk to clear the mind',
    icon: '🚶',
    color: 'bg-green-500',
    days: 30
  },
  {
    title: 'Learn Norwegian',
    description: 'Three lessons per day',
    icon: '📚',
    color: 'bg-purple-500',
    days: 30
  },
  {
    title: 'Eat a piece of fruit',
    description: 'Stay healthy and don\'t overeat',
    icon: '🍎',
    color: 'bg-red-500',
    days: 30
  },
  {
    title: 'Stretch for 5 minutes',
    description: 'Improve flexibility and relax muscles',
    icon: '🧘',
    color: 'bg-orange-500',
    days: 30
  }
];

const STORAGE_KEY = 'stones-habits-v2';
const ARCHIVE_STORAGE_KEY = 'stones-habits-archive-v2';

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [archivedHabits, setArchivedHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Load habits and archived habits from localStorage on mount
  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    const storedArchivedHabits = localStorage.getItem(ARCHIVE_STORAGE_KEY);

    if (storedHabits) {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        setHabits(parsedHabits);
      } catch (e) {
        console.error('Error parsing stored habits:', e);
        const initialHabits = defaultHabits.map(habit => ({
          ...habit,
          id: uuidv4()
        }));
        setHabits(initialHabits);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHabits));
      }
    } else {
      const initialHabits = defaultHabits.map(habit => ({
        ...habit,
        id: uuidv4()
      }));
      setHabits(initialHabits);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHabits));
    }

    if (storedArchivedHabits) {
      try {
        const parsedArchivedHabits = JSON.parse(storedArchivedHabits);
        setArchivedHabits(parsedArchivedHabits);
      } catch (e) {
        console.error('Error parsing stored archived habits:', e);
        setArchivedHabits([]);
        localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify([]));
      }
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  // Save archived habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archivedHabits));
  }, [archivedHabits]);

  const handleAddHabit = (newHabit: Omit<Habit, 'id'>) => {
    const habit: Habit = {
      ...newHabit,
      id: uuidv4()
    };
    setHabits(prev => [...prev, habit]);
    setIsModalOpen(false);
  };

  const handleArchiveHabit = (habitId: string) => {
    const habitToArchive = habits.find(h => h.id === habitId);
    if (!habitToArchive) return;

    // Create archived habit with new ID
    const archivedHabit = {
      ...habitToArchive,
      id: uuidv4(),
      archivedAt: new Date().toISOString()
    };

    // Update both states atomically
    setArchivedHabits(prev => [...prev, archivedHabit]);
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const handleArchiveToggle = (show: boolean) => {
    setShowArchived(show);
  };

  const handleUnarchiveHabit = (habitId: string) => {
    const habitToUnarchive = archivedHabits.find(h => h.id === habitId);
    if (!habitToUnarchive) return;

    // Create unarchived habit with new ID
    const unarchivedHabit = {
      ...habitToUnarchive,
      id: uuidv4(),
      archivedAt: undefined
    };

    // Update both states atomically
    setHabits(prev => [...prev, unarchivedHabit]);
    setArchivedHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const handleDeleteHabit = (habitId: string) => {
    if (showArchived) {
      setArchivedHabits(prev => prev.filter(h => h.id !== habitId));
    } else {
      setHabits(prev => prev.filter(h => h.id !== habitId));
    }
  };

  const handleUpdateReminder = (habitId: string, time: string, days: number[]) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId
          ? { ...habit, reminderTime: time, reminderDays: days }
          : habit
      )
    );
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all habits data? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ARCHIVE_STORAGE_KEY);
      
      // Initialize with default habits
      const initialHabits = defaultHabits.map(habit => ({
        ...habit,
        id: uuidv4()
      }));
      
      setHabits(initialHabits);
      setArchivedHabits([]);
      
      // Save initial state
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialHabits));
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify([]));
    }
  };

  return (
    <div>
      {/* Archive Toggle and Clear Data */}
      <div className="mb-4 flex justify-between items-center">
        <ArchiveToggle onToggle={handleArchiveToggle} />
        <button
          onClick={clearAllData}
          className="px-3 py-1 text-sm rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-colors"
          title="Reset all habits data"
        >
          Reset Data
        </button>
      </div>

      {/* Add New Habit Button */}
      {!showArchived && (
        <button 
          className="w-full mb-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm shadow-lg flex items-center justify-center gap-2 transition-colors group"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="h-8 w-8 rounded-full bg-gray-700 group-hover:bg-gray-600 flex items-center justify-center transition-colors">
            <span className="text-xl font-semibold text-white">+</span>
          </span>
          <span className="text-gray-400 group-hover:text-gray-300">Add New Habit</span>
        </button>
      )}

      <div className="space-y-4">
        {showArchived ? (
          archivedHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.title}
              description={habit.description}
              icon={habit.icon}
              color={habit.color}
              days={habit.days}
              isArchived={true}
              onUnarchive={() => handleUnarchiveHabit(habit.id)}
              onDelete={() => handleDeleteHabit(habit.id)}
            />
          ))
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.title}
              description={habit.description}
              icon={habit.icon}
              color={habit.color}
              days={habit.days}
              reminderTime={habit.reminderTime}
              reminderDays={habit.reminderDays}
              onArchive={() => handleArchiveHabit(habit.id)}
              onDelete={() => handleDeleteHabit(habit.id)}
              onUpdateReminder={(time, days) => handleUpdateReminder(habit.id, time, days)}
            />
          ))
        )}
      </div>

      <NewHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHabit}
      />
    </div>
  );
} 