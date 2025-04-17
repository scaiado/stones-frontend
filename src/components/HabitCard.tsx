"use client";

import HabitGrid from '@/components/HabitGrid';
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

interface HabitCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  isArchived?: boolean;
  onArchive?: () => void;
  onUnarchive?: () => void;
  onDelete?: () => void;
}

export default function HabitCard({ 
  title, 
  description, 
  icon, 
  color, 
  days = 30, 
  isArchived = false,
  onArchive,
  onUnarchive,
  onDelete
}: HabitCardProps) {
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
        <div className="flex gap-2">
          <button
            onClick={isArchived ? onUnarchive : onArchive}
            className={`h-8 w-8 rounded-full bg-gray-700/50 flex items-center justify-center transition-colors text-gray-400 ${
              isArchived 
                ? 'hover:bg-blue-500/20 hover:text-blue-500' 
                : 'hover:bg-red-500/20 hover:text-red-500'
            }`}
            title={isArchived ? "Unarchive habit" : "Archive habit"}
          >
            {isArchived ? (
              <ArchiveBoxXMarkIcon className="h-4 w-4" />
            ) : (
              <ArchiveBoxIcon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center transition-colors text-gray-400"
            title="Delete habit"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <HabitGrid days={days} habitId={habitId} />
    </div>
  );
}