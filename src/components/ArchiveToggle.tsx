"use client";

import { useState } from 'react';

interface ArchiveToggleProps {
  onToggle: (showArchived: boolean) => void;
}

export default function ArchiveToggle({ onToggle }: ArchiveToggleProps) {
  const [showArchived, setShowArchived] = useState(false);

  const handleToggle = () => {
    const newValue = !showArchived;
    setShowArchived(newValue);
    onToggle(newValue);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={handleToggle}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          showArchived
            ? 'bg-blue-500 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        {showArchived ? 'Hide Archived' : 'Show Archived'}
      </button>
    </div>
  );
} 