interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 text-xl font-semibold bg-gray-800">
        Stones Habit Tracker
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