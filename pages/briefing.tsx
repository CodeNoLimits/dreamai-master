import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useCollection, useDocument } from '../hooks/useFirestore'

export default function Briefing() {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set())
  
  // Firestore data
  const { data: tasks } = useCollection('tasks300')
  const { data: contacts } = useCollection('contacts')
  const { data: grants } = useCollection('grants')
  const { data: today } = useDocument('config', 'today')

  const currentDay = today?.currentDay || 1

  // Filter tasks by timeframe
  const next7Days = tasks?.filter(task => task.day >= currentDay && task.day <= currentDay + 7) || []
  const next30Days = tasks?.filter(task => task.day >= currentDay && task.day <= currentDay + 30) || []

  // KPIs and Vision
  const kpis = {
    users: "88+ dreamers",
    mrr: "Target: 1M€ (Day 300)",
    grants: "Hub France IA + IIA"
  }

  const vision = [
    "Fusionner social, financement participatif et IA bienveillante",
    "Micro-apps mobiles générant revenus immédiats",
    "Couche 3D immersive pour communauté empathique"
  ]

  // Contacts France & Israel
  const strategicContacts = [
    {
      name: "Gaëlle Pinson",
      org: "Hub France IA",
      tel: "+33 1 84 88 05 60",
      email: "contact@hub-franceia.fr",
      tag: "Label IA Responsable"
    },
    {
      name: "Bpifrance Diag IA",
      org: "Bpifrance",
      tel: "+33 1 53 89 78 78",
      email: "contact@bpifrance.fr",
      tag: "Diagnostic IA"
    },
    {
      name: "Israel Innovation Authority",
      org: "IIA",
      tel: "+972 52 418 9734",
      email: "info@innovationisrael.org.il",
      tag: "Data for AI Grant"
    },
    {
      name: "Digital Israel",
      org: "MSE",
      tel: "+972 2 666 2200",
      email: "pniyot@mse.gov.il",
      tag: "Digital Initiative"
    }
  ]

  // Grants & Funding
  const fundingOpportunities = [
    {
      name: "Hub France IA - Label IA Responsable",
      amount: "€15,000",
      deadline: "Q1 2025",
      status: "En cours",
      link: "https://www.hub-franceia.fr/en/home-hub-france-ia-2-2/"
    },
    {
      name: "Bpifrance Diag Data/IA",
      amount: "€5,000",
      deadline: "Rolling",
      status: "À soumettre",
      link: "https://www.bpifrance.fr/catalogue-offres/diag-data-ia"
    },
    {
      name: "IIA Data for AI Call",
      amount: "$50,000",
      deadline: "Mars 2025",
      status: "Préparation",
      link: "https://innovationisrael.org.il/en/calls_for_proposal/data-for-ai/"
    }
  ]

  // Tech Stack
  const techStack = [
    "Next.js 14", "TypeScript", "Tailwind CSS", "Firebase", "Gemini AI", "n8n", "Netlify", "GitHub"
  ]

  // FAQ for non-tech
  const faq = [
    {
      q: "Qu'est-ce que DreamAI concrètement ?",
      a: "Une plateforme qui aide les gens à réaliser leurs rêves en combinant réseau social, financement participatif et intelligence artificielle. Chaque utilisateur a un score de progression et des micro-applications mobiles génèrent des revenus."
    },
    {
      q: "Comment on gagne de l'argent ?",
      a: "3 sources : 1) Micro-apps mobiles (€0.99-2.99 chacune), 2) Consulting IA pour PME (€9k/mois), 3) Commissions sur financements participatifs (2-5%)"
    },
    {
      q: "Quels sont nos avantages concurrentiels ?",
      a: "Score d'empathie VELA unique, algorithme H.E.A.R.T anti-dérive, focus marché français-israélien, intégration IA native"
    },
    {
      q: "Pourquoi France + Israël ?",
      a: "France : marché PME €9k consulting + subventions IA. Israël : écosystème tech + grants innovation. Synergie culturelle pour expansion internationale."
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-section').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>DreamAI Briefing - Mission Control</title>
        <meta name="description" content="Plan détaillé 7j/30j/300j pour équipe DreamAI" />
      </Head>

      <style jsx global>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#0d0f23] text-white">
        {/* Header Hero */}
        <header className="py-20 text-center bg-gradient-to-b from-[#7b5cff]/20 to-transparent">
          <h1 className="text-5xl font-bold text-[#7b5cff] mb-4">DreamAI Mission Control</h1>
          <p className="text-xl text-gray-300 mb-8">Plan détaillé 7j/30j/300j - Jour {currentDay}/300</p>
          <a href="/dashboard" className="bg-[#7b5cff] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all">
            Accéder au Dashboard
          </a>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Vision & KPIs */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">🚀 Vision & KPIs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#7b5cff]">Notre Vision</h3>
                <ul className="space-y-2">
                  {vision.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#7b5cff] mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#7b5cff]">KPIs Clés</h3>
                <div className="space-y-3">
                  <div><strong>Utilisateurs:</strong> {kpis.users}</div>
                  <div><strong>MRR:</strong> {kpis.mrr}</div>
                  <div><strong>Grants:</strong> {kpis.grants}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Next 7 Days */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">📅 Prochains 7 jours</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg">
              {next7Days.length > 0 ? (
                <div className="space-y-3">
                  {next7Days.map((task, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={checkedTasks.has(task.id)}
                        onChange={() => {
                          const newChecked = new Set(checkedTasks)
                          if (newChecked.has(task.id)) {
                            newChecked.delete(task.id)
                          } else {
                            newChecked.add(task.id)
                          }
                          setCheckedTasks(newChecked)
                        }}
                        className="w-4 h-4 text-[#7b5cff] rounded focus:ring-[#7b5cff]"
                      />
                      <span className="text-[#7b5cff] font-mono">J{task.day}</span>
                      <span className={checkedTasks.has(task.id) ? 'line-through text-gray-500' : 'text-gray-300'}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune tâche programmée pour les 7 prochains jours</p>
              )}
            </div>
          </section>

          {/* Next 30 Days */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">📊 Prochains 30 jours</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(week => {
                const weekTasks = next30Days.filter(task => 
                  task.day >= currentDay + (week - 1) * 7 && 
                  task.day < currentDay + week * 7
                )
                return (
                  <div key={week} className="bg-slate-800/50 rounded-lg">
                    <button
                      onClick={() => setOpenSection(openSection === `week${week}` ? null : `week${week}`)}
                      className="w-full p-4 text-left font-semibold text-[#7b5cff] hover:bg-slate-700/50 rounded-lg transition-colors"
                    >
                      Semaine {week} ({weekTasks.length} tâches)
                    </button>
                    {openSection === `week${week}` && (
                      <div className="px-4 pb-4 space-y-2">
                        {weekTasks.map((task, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="text-[#7b5cff] font-mono text-sm">J{task.day}</span>
                            <span className="text-gray-300">{task.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* 300-Day Roadmap */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">🗺️ Roadmap 300 jours</h2>
            <div className="bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setOpenSection(openSection === 'roadmap' ? null : 'roadmap')}
                className="w-full p-4 text-left font-semibold text-[#7b5cff] hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                Afficher roadmap complet ({tasks?.length || 0} tâches)
              </button>
              {openSection === 'roadmap' && (
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700 sticky top-0">
                      <tr>
                        <th className="p-3 text-left">Jour</th>
                        <th className="p-3 text-left">Tâche</th>
                        <th className="p-3 text-left">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks?.map((task, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                          <td className="p-3 font-mono text-[#7b5cff]">J{task.day}</td>
                          <td className="p-3 text-gray-300">{task.title}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              task.status === 'completed' ? 'bg-green-600' :
                              task.status === 'in-progress' ? 'bg-yellow-600' :
                              'bg-gray-600'
                            }`}>
                              {task.status || 'pending'}
                            </span>
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-gray-500">
                            Aucune tâche trouvée. Importez le CSV 300 jours.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* Strategic Contacts */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">👥 Contacts Stratégiques</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {strategicContacts.map((contact, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                      <p className="text-gray-400">{contact.org}</p>
                    </div>
                    <span className="bg-[#7b5cff] text-white px-2 py-1 rounded text-xs">
                      {contact.tag}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => copyToClipboard(contact.tel)}
                      className="flex items-center space-x-2 text-[#7b5cff] hover:text-white transition-colors"
                    >
                      <span>📞</span>
                      <span>{contact.tel}</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(contact.email)}
                      className="flex items-center space-x-2 text-[#7b5cff] hover:text-white transition-colors"
                    >
                      <span>✉️</span>
                      <span>{contact.email}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Funding Tracker */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">💰 Tracker Subventions</h2>
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="p-4 text-left">Grant</th>
                    <th className="p-4 text-left">Montant</th>
                    <th className="p-4 text-left">Deadline</th>
                    <th className="p-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fundingOpportunities.map((grant, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/50'}>
                      <td className="p-4">
                        <a href={grant.link} target="_blank" rel="noopener noreferrer" className="text-[#7b5cff] hover:underline">
                          {grant.name}
                        </a>
                      </td>
                      <td className="p-4 font-semibold text-green-400">{grant.amount}</td>
                      <td className="p-4 text-gray-300">{grant.deadline}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          grant.status === 'En cours' ? 'bg-yellow-600' :
                          grant.status === 'Préparation' ? 'bg-blue-600' :
                          'bg-gray-600'
                        }`}>
                          {grant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">⚙️ Tech Stack</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg">
              <div className="flex flex-wrap gap-3 mb-6">
                {techStack.map((tech, index) => (
                  <span key={index} className="bg-[#7b5cff] text-white px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <p>Deploy: Netlify • Repo: GitHub/dreamai-master • Status: ✅ Active</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="reveal-section">
            <h2 className="text-3xl font-bold text-[#7b5cff] mb-8">❓ FAQ Équipe</h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg">
                  <button
                    onClick={() => setOpenSection(openSection === `faq${index}` ? null : `faq${index}`)}
                    className="w-full p-4 text-left font-semibold text-[#7b5cff] hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    {item.q}
                  </button>
                  {openSection === `faq${index}` && (
                    <div className="px-4 pb-4 text-gray-300">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 py-8 text-center text-gray-400">
          <p>© 2025 DreamAI - 
            <a href="https://github.com/CodeNoLimits/dreamai-master" className="text-[#7b5cff] hover:underline ml-1">
              Repo
            </a> - 
            <a href="https://dreamaimastertracker.netlify.app" className="text-[#7b5cff] hover:underline ml-1">
              Deploy
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}