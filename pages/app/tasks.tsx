import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task300 {
  id: string;
  day: number;
  phase: string;
  keyTasks: string;
  status: 'pending' | 'in_progress' | 'done';
  profitTarget: number;
  dueDate: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task300[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch('/data/tasks300.json');
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
      setLoading(false);
    }
  };

  const today = new Date();
  const currentDay = Math.floor((today.getTime() - new Date('2025-07-16').getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'week') {
      return task.day >= currentDay && task.day < currentDay + 7;
    } else if (filter === 'month') {
      return task.day >= currentDay && task.day < currentDay + 30;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="border-b border-slate-700 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white float-element">Mission Control</h1>
              <nav className="flex space-x-4">
                <Link href="/app/dashboard" className="nav-link text-slate-300 hover:text-white">Dashboard</Link>
                <Link href="/app/tasks" className="nav-link text-blue-400 font-medium active">Tasks</Link>
                <Link href="/app/notes" className="nav-link text-slate-300 hover:text-white">Notes</Link>
                <Link href="/app/contacts" className="nav-link text-slate-300 hover:text-white">Contacts</Link>
              </nav>
            </div>
            <Link href="/summary" className="btn-primary text-white px-4 py-2 rounded-lg font-medium">
              Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Plan 300 Jours</h2>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === "all" ? "btn-primary" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Toutes les tâches
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === "week" ? "btn-primary" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Cette semaine
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === "month" ? "btn-primary" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Ce mois-ci
          </button>
        </div>

        {/* Tasks Table */}
        <div className="glass-card rounded-xl p-6 overflow-x-auto enhanced-table">
          <table className="min-w-full divide-y divide-slate-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Jour</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Phase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Tâches Clés</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Objectif Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{task.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{task.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{task.phase}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {task.keyTasks.replace(/"/g, "").split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === "done" ? "status-done" :
                      task.status === "in_progress" ? "status-progress" :
                      "status-pending"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">€{task.profitTarget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{task.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

