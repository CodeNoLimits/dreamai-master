import { useState } from 'react';
import Link from 'next/link';

export default function Summary() {
  const [currentDay] = useState(1);
  const [tasksCompleted] = useState(0);
  const [revenueGenerated] = useState(0);
  const [progression] = useState(0);

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="border-b border-slate-700 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white float-element">DreamAI Mission Control</h1>
            <div className="flex space-x-4">
              <Link href="/app/dashboard" className="btn-primary text-white px-6 py-2 rounded-lg font-medium">
                Accéder au Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Transforming Dreams into Reality
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Transformons les rêves en réalité grâce à l&apos;IA. L&apos;infrastructure pour l&apos;avenir émotionnel et économique de l&apos;humanité.
        </p>
        <p className="text-lg text-slate-400 mb-12">
          Progression sur 300 jours vers la révolution de l&apos;IA empathique.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Vision</h3>
            <p className="text-slate-300">Une IA qui comprend et amplifie l&apos;empathie humaine</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Revenue</h3>
            <p className="text-slate-300">€500 juillet → €3k/mois octobre</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Global</h3>
            <p className="text-slate-300">Double stratégie France + Israël</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">{currentDay}</div>
            <div className="text-slate-400">Jour actuel</div>
            <div className="text-2xl mt-2">📅</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">{tasksCompleted}</div>
            <div className="text-slate-400">Tâches complétées</div>
            <div className="text-2xl mt-2">✅</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">€{revenueGenerated}</div>
            <div className="text-slate-400">Revenue généré</div>
            <div className="text-2xl mt-2">💰</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-white mb-2">{progression}%</div>
            <div className="text-slate-400">Progression</div>
            <div className="text-2xl mt-2">📊</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">Prêt à transformer vos rêves ?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Accédez au Mission Control et suivez votre progression vers l&apos;IA empathique
          </p>
          <Link href="/app/dashboard" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200">
            Lancer Mission Control
          </Link>
        </div>
      </section>
    </div>
  );
}

