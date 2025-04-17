import { useState } from 'react';

interface EditHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (habit: {
    title: string;
    description: string;
    icon: string;
    color: string;
    days: number;
  }) => void;
  initialHabit: {
    title: string;
    description: string;
    icon: string;
    color: string;
    days: number;
  };
}

const colorOptions = [
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
];

const iconOptions = ['🚶', '📚', '🍎', '🧘', '💪', '🎨', '🎵', '✍️', '🏃', '🧠'];

export default function EditHabitModal({ isOpen, onClose, onSubmit, initialHabit }: EditHabitModalProps) {
  const [title, setTitle] = useState(initialHabit.title);
  const [description, setDescription] = useState(initialHabit.description);
  const [icon, setIcon] = useState(initialHabit.icon);
  const [color, setColor] = useState(initialHabit.color);
  const [days, setDays] = useState(initialHabit.days);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, icon, color, days });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Edit Habit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter habit title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter habit description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-xl ${
                    icon === emoji ? 'bg-blue-500 ring-2 ring-blue-400' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setColor(colorOption.value)}
                  className={`h-8 rounded-md ${colorOption.value} ${
                    color === colorOption.value ? 'ring-2 ring-blue-400' : ''
                  }`}
                >
                  <span className="sr-only">{colorOption.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-1">
              Days to track
            </label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 30))}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 