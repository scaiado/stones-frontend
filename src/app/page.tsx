import Layout from '@/components/Layout';
import HabitList from '@/components/HabitList';
import NotificationManager from '@/components/NotificationManager';

export default function Page() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Stones</h1>
          <p className="text-gray-400 mt-2">
            Build lasting habits, one day at a time.
          </p>
        </div>

        <HabitList />
        <NotificationManager habits={[]} />
      </div>
    </Layout>
  );
}