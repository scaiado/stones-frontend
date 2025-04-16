"use client";

import HabitGrid from '@/components/HabitGrid';

interface HabitCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  onArchive?: () => void;
}

export default function HabitCard({ title, description, icon, color, days = 30, onArchive }: HabitCardProps) {
  // Create a unique ID for each habit based on its title
  const habitId = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="rounded-lg p-4 bg-gray-800/50 backdrop-blur-sm shadow-lg hover:bg-gray-800/70 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color} shadow-lg`}>
            <span className="text-xl">{icon}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <button
          onClick={onArchive}
          className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center transition-colors text-gray-400"
          title="Archive habit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
      <HabitGrid days={days} habitId={habitId} />
    </div>
  );
}