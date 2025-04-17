"use client";

import HabitGrid from '@/components/HabitGrid';
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, TrashIcon, BellIcon, BellSlashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface HabitCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  days?: number;
  isArchived?: boolean;
  reminderTime?: string;
  reminderDays?: number[];
  onArchive?: () => void;
  onUnarchive?: () => void;
  onDelete?: () => void;
  onUpdateReminder?: (time: string, days: number[]) => void;
  onEdit?: () => void;
}

export default function HabitCard({ 
  title, 
  description, 
  icon, 
  color, 
  days = 30, 
  isArchived = false,
  reminderTime = '',
  reminderDays = [],
  onArchive,
  onUnarchive,
  onDelete,
  onUpdateReminder,
  onEdit
}: HabitCardProps) {
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [time, setTime] = useState(reminderTime);
  const [selectedDays, setSelectedDays] = useState<number[]>(reminderDays);
  
  // Create a unique ID for each habit based on its title
  const habitId = title.toLowerCase().replace(/\s+/g, '-');

  const handleReminderUpdate = () => {
    if (onUpdateReminder) {
      onUpdateReminder(time, selectedDays);
    }
    setShowReminderSettings(false);
  };

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

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
          {!isArchived && (
            <>
              <button
                onClick={onEdit}
                className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-blue-500/20 hover:text-blue-500 flex items-center justify-center transition-colors text-gray-400"
                title="Edit habit"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowReminderSettings(!showReminderSettings)}
                className={`h-8 w-8 rounded-full bg-gray-700/50 flex items-center justify-center transition-colors text-gray-400 ${
                  reminderTime ? 'hover:bg-yellow-500/20 hover:text-yellow-500' : 'hover:bg-gray-600/50'
                }`}
                title={reminderTime ? "Edit reminder" : "Add reminder"}
              >
                {reminderTime ? (
                  <BellIcon className="h-4 w-4" />
                ) : (
                  <BellSlashIcon className="h-4 w-4" />
                )}
              </button>
            </>
          )}
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

      {showReminderSettings && !isArchived && (
        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Reminder Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Days of Week
              </label>
              <div className="grid grid-cols-7 gap-1">
                {[
                  { key: 'sun', label: 'S', value: 0 },
                  { key: 'mon', label: 'M', value: 1 },
                  { key: 'tue', label: 'T', value: 2 },
                  { key: 'wed', label: 'W', value: 3 },
                  { key: 'thu', label: 'T', value: 4 },
                  { key: 'fri', label: 'F', value: 5 },
                  { key: 'sat', label: 'S', value: 6 }
                ].map((day) => (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`h-8 w-8 rounded-md flex items-center justify-center text-sm ${
                      selectedDays.includes(day.value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReminderUpdate}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowReminderSettings(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <HabitGrid days={days} habitId={habitId} />
    </div>
  );
}