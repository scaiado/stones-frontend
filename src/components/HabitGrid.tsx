"use client";

import { useState, useEffect } from "react";
import { format, subDays, isToday, isFirstDayOfMonth, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import Confetti from 'react-confetti';

type Day = {
  date: string;
  completed: boolean;
};

const generateDaysForMonth = (date: Date): Day[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return eachDayOfInterval({ start, end }).map(day => ({
    date: day.toISOString(),
    completed: false,
  }));
};

export default function HabitGrid({ days = 30, habitId }: { days: number, habitId: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysGrid, setDaysGrid] = useState<Day[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const storageKey = `habitGrid_${habitId}_${format(currentDate, 'yyyy-MM')}`;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setDaysGrid(JSON.parse(stored));
    } else {
      setDaysGrid(generateDaysForMonth(currentDate));
    }
  }, [currentDate, habitId, storageKey]);

  useEffect(() => {
    if (daysGrid.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(daysGrid));
    }
  }, [daysGrid, storageKey]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDay = (index: number) => {
    setDaysGrid((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, completed: !day.completed } : day
      )
    );
  };

  const calculateStreak = (): number => {
    let streak = 0;
    for (let i = daysGrid.length - 1; i >= 0; i--) {
      if (daysGrid[i].completed) streak++;
      else if (streak > 0) break;
    }
    return streak;
  };

  useEffect(() => {
    const streak = calculateStreak();
    if (streak >= days) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [daysGrid, days]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1);
    setCurrentDate(newDate);
  };

  // If daysGrid is empty, don't render anything yet
  if (daysGrid.length === 0) {
    return null;
  }

  // Calculate the starting day offset
  const startDayOffset = new Date(daysGrid[0].date).getDay();
  const streak = calculateStreak();

  return (
    <div className="relative">
      {showConfetti && (
        <div className="fixed inset-0">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
              <p className="text-white">You've achieved your {days}-day streak goal!</p>
            </div>
          </div>
        </div>
      )}

      {/* Month Header with Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={() => navigateMonth('prev')}
          className="text-gray-400 hover:text-gray-300 p-1"
          title="Previous month"
        >
          ←
        </button>
        <div className="text-sm font-medium text-gray-300">
          {format(currentDate, 'MMMM yyyy')}
        </div>
        <button 
          onClick={() => navigateMonth('next')}
          className="text-gray-400 hover:text-gray-300 p-1"
          title="Next month"
        >
          →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Habit Tracking Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Add empty cells for proper alignment */}
        {[...Array(startDayOffset)].map((_, index) => (
          <div key={`empty-${index}`} className="h-6 w-6" />
        ))}
        
        {/* Render the actual day squares */}
        {daysGrid.map((day, index) => {
          const date = new Date(day.date);
          const isCurrentDay = isToday(date);
          
          return (
            <div key={day.date} className="relative">
              <button
                onClick={() => toggleDay(index)}
                className={`h-6 w-6 rounded-sm transition-colors relative ${
                  day.completed ? "bg-green-500" : "bg-gray-700/50 hover:bg-gray-600/50"
                } ${
                  isCurrentDay 
                    ? "ring-2 ring-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)] z-10 bg-blue-500/20" 
                    : ""
                }`}
                title={format(date, "PPP")}
              >
                <span className={`absolute inset-0 flex items-center justify-center text-[10px] ${
                  isCurrentDay ? "text-white font-bold" : "text-gray-400"
                }`}>
                  {format(date, 'd')}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Streak Counter */}
      <div className="mt-2 text-sm text-gray-400">
        Current streak: <span className="font-medium text-gray-300">{streak} days</span>
        {streak >= days && (
          <span className="ml-2 text-green-400">🎯 Goal achieved!</span>
        )}
      </div>
    </div>
  );
}