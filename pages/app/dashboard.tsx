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

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task300[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(1);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [revenueGenerated, setRevenueGenerated] = useState(0);
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      // Simuler la progression jusqu'au jour 150 pour la démo
      const simulatedDay = 150; 
      setCurrentDay(simulatedDay);

      // Calculer les métriques basées sur la simulation
      const completed = tasks.filter(task => task.status === 'done' && task.day <= simulatedDay).length;
      setTasksCompleted(completed);

      const revenue = tasks.filter(task => task.status === 'done' && task.day <= simulatedDay)
                           .reduce((sum, task) => sum + task.profitTarget, 0);
      setRevenueGenerated(revenue);

      const totalTasks = tasks.length;
      const progress = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
      setProgression(progress);
    }
  }, [tasks]); 

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
  const next7DaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    const diffTime = Math.abs(taskDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && taskDate >= today;
  }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

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
                <Link href="/app/dashboard" className="nav-link text-blue-400 font-medium active">Dashboard</Link>
                <Link href="/app/tasks" className="nav-link text-slate-300 hover:text-white">Tasks</Link>
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
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 text-center stat-card">
            <div className="text-3xl font-bold text-white mb-2">{currentDay}</div>
            <div className="text-slate-400">Jour actuel</div>
            <div className="text-2xl mt-2">📅</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center stat-card">
            <div className="text-3xl font-bold text-white mb-2">{tasksCompleted}</div>
            <div className="text-slate-400">Tâches complétées</div>
            <div className="text-2xl mt-2">✅</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center stat-card">
            <div className="text-3xl font-bold text-white mb-2">€{revenueGenerated}</div>
            <div className="text-slate-400">Revenue généré</div>
            <div className="text-2xl mt-2">💰</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center stat-card">
            <div className="text-3xl font-bold text-white mb-2">{progression}%</div>
            <div className="text-slate-400">Progression</div>
            <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
              <div className="progress-bar" style={{ width: `${progression}%` }}></div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Timeline - 7 prochains jours</h3>
          <div className="space-y-6">
            {next7DaysTasks.length > 0 ? (
              next7DaysTasks.map((task) => (
                <div key={task.id} className={`timeline-item ${task.status === 'done' ? 'completed' : ''}`}>
                  <h4 className="text-lg font-semibold text-white">{task.id} - {task.phase}</h4>
                  <p className="text-slate-400 text-sm">{task.dueDate}</p>
                  <p className="text-slate-300 mt-1">{task.keyTasks.replace(/"/g, '').split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'done' ? 'bg-green-500/20 text-green-400' :
                      task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {task.status}
                    </span>
                    <span className="text-purple-400">€{task.profitTarget}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Aucune tâche prévue pour les 7 prochains jours.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

