import StoneIcon from '@/components/icons/StoneIcon';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <StoneIcon size={32} className="flex-shrink-0" />
          <h1 className="text-xl font-semibold">Stones Habit Tracker</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      <footer className="p-4 text-center text-sm bg-gray-800">
        © {new Date().getFullYear()} Stones
      </footer>
    </div>
  );
} 