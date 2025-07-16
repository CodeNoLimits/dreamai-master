import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Summary() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleAskAI = async () => {
    if (!question.trim()) {
      setError("Veuillez poser une question.")
      return
    }
    setLoading(true)
    setAnswer('')
    setError('')

    try {
      const systemPrompt = `Vous êtes un expert en intelligence artificielle et en gestion de projet, spécialisé dans la plateforme DreamAI. Répondez aux questions sur DreamAI en vous basant sur les informations suivantes:
        - DreamAI fusionne social, financement participatif et IA bienveillante pour guider chaque utilisateur vers ses rêves.
        - Un score de cohérence (DCS) et d'empathie (VELA) mesure les progrès des utilisateurs.
        - Des micro-applications mobiles génèrent des revenus immédiats.
        - Une couche 3D immersive accueillera la communauté.
        - Le Dashboard MVP est pour le suivi des tâches sur 300 jours, notes, contacts.
        - 5 micro-apps prévues: Voice2Text Pro, Dream Compat, Email Writer, TimeBox, Investment Tracker.
        - Pack Consulting IA (4 semaines, 9 k€) pour PME françaises.
        - Objectifs: Juillet: 500 € CA + Voice2Text lancé; Jour 30: 10 k € MRR + 5 micro-apps publiées; Jour 300: 1 M € MRR + 10 k utilisateurs.
        - DCS (Dream Consistency Score): mesure la régularité, diversité d'actions et feedback positif (0-100).
        - L'IA aide en générant des plans, rappelant les jalons et bloquant les dérives grâce à l'algorithme H.E.A.R.T.
        - Une micro-app est une petite application Android centrée sur une fonction (ex : transcrire la voix), générant des revenus rapides et attirant des utilisateurs vers DreamAI.
        
        Répondez de manière concise et professionnelle, en français. Si la question n'est pas directement liée à DreamAI ou aux informations fournies, indiquez que vous ne pouvez pas y répondre.`

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\nQuestion: " + question }] }]
        })
      })

      const result = await response.json()
      
      if (result.candidates && result.candidates[0].content) {
        setAnswer(result.candidates[0].content.parts[0].text)
      } else {
        setError("Impossible de générer une réponse. Veuillez réessayer.")
      }
    } catch (err) {
      setError("Erreur lors de la communication avec l'IA. Veuillez vérifier votre connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>DreamAI · Mission Control</title>
        <meta name="description" content="Vue complète et pédagogique du projet pour Ariel (non-tech)." />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', sans-serif;
        }
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
        @keyframes pulseBackground {
          0% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.1); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.05; }
        }
        .pulse-bg {
          animation: pulseBackground 10s infinite alternate;
        }
      `}</style>

      <div className="min-h-screen bg-primary text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center px-4 lg:px-8 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0 opacity-10 pulse-bg" style={{
            backgroundImage: 'radial-gradient(circle at center, #7b5cff 0%, transparent 70%)',
            backgroundSize: '200% 200%'
          }}></div>
          
          <div className="z-10 reveal-on-scroll">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight text-accent">
              Bienvenue dans DreamAI
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8">
              La plateforme qui transforme chaque rêve en plan d'action
            </p>
            <a
              href="/dashboard"
              className="inline-block px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg bg-accent text-primary"
            >
              Ouvrir le tableau de bord
            </a>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto py-12">
          {/* Section 1 - Accordion */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">1 · Pourquoi DreamAI ?</h2>
            <div className="space-y-4">
              {[
                { 
                  label: "Le problème", 
                  content: "Les réseaux actuels (Facebook, LinkedIn, Kickstarter) éparpillent nos objectifs. DreamAI fusionne social, financement participatif et IA bienveillante pour guider chaque utilisateur vers ses rêves." 
                },
                { 
                  label: "La solution", 
                  content: "Un score de cohérence (DCS) et d'empathie (VELA) mesure vos progrès. Des micro-applications mobiles génèrent des revenus immédiats. Une couche 3D immersive accueillera la communauté." 
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-700">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left text-lg font-semibold rounded-lg focus:outline-none text-accent"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {openAccordion === index && (
                    <div className="p-4 pt-0 text-gray-300">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 & 3 - Two Column */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2 p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 border border-gray-700">
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-accent">2 · Ce qu'on construit d'abord</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li><strong>Dashboard MVP</strong> : suivi des tâches 300 jours, notes, contacts (déjà en cours)</li>
                  <li><strong>5 micro-apps</strong> Play Store (Voice2Text Pro, Dream Compat, Email Writer, TimeBox, Investment Tracker)</li>
                  <li><strong>Pack Consulting IA</strong> (4 semaines, 9 k€) pour PME françaises</li>
                </ul>
              </div>
              <div className="lg:w-1/2 p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 border border-gray-700">
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-accent">3 · Chiffres cibles</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>📅 <strong>Juillet</strong> : 500 € de CA + Voice2Text lancé</li>
                  <li>📈 <strong>Jour 30</strong> : 10 k € MRR + 5 micro-apps publiées</li>
                  <li>🚀 <strong>Jour 300</strong> : 1 M € MRR + 10 k utilisateurs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 - Timeline */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">4 · Votre feuille de route (7 jours)</h2>
            <div className="relative border-l-2 border-dashed border-accent">
              {[
                { date: "Aujourd'hui", label: "Déploiement Dashboard Netlify" },
                { date: "+1 jour", label: "Appel Hub France IA (label 'IA responsable')" },
                { date: "+3 jours", label: "Importer CSV 300 jours + contacts Firestore" },
                { date: "+5 jours", label: "Soumettre brouillon 'Ambassadeur IA'" },
                { date: "+7 jours", label: "Pré-dossier Israel Innovation Authority" }
              ].map((event, index) => (
                <div key={index} className="mb-8 flex items-center w-full">
                  <div className="absolute w-4 h-4 bg-accent rounded-full -left-2.5 z-10"></div>
                  <div className="flex-grow ml-8 p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 border border-gray-700">
                    <p className="font-semibold text-accent">{event.date}</p>
                    <p className="text-gray-300">{event.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 - Cards */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">5 · Contacts stratégiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Hub France IA", text: "Gaëlle Pinson — +33 1 84 88 05 60 — contact@hub-franceia.fr" },
                { title: "Bpifrance Diag IA", text: "+33 1 53 89 78 78" },
                { title: "Israel Innovation Authority", text: "+972 52 418 9734" },
                { title: "Digital Israel Initiative", text: "pniyot@mse.gov.il" }
              ].map((card, index) => (
                <div key={index} className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 border border-gray-700">
                  <h3 className="text-xl font-bold mb-2 text-accent">{card.title}</h3>
                  <p className="text-gray-300">{card.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 - FAQ */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">6 · Questions fréquentes</h2>
            <div className="space-y-4">
              {[
                { 
                  q: "Qu'est-ce qu'une micro-app ?", 
                  a: "Une petite application Android centrée sur une fonction (ex : transcrire la voix). Chaque micro-app rapporte des revenus rapides et attire des utilisateurs vers DreamAI." 
                },
                { 
                  q: "C'est quoi le DCS ?", 
                  a: "Le **Dream Consistency Score** (0-100) mesure votre régularité, diversité d'actions et feedback positif." 
                },
                { 
                  q: "Comment l'IA m'aide-t-elle ?", 
                  a: "Elle génère des plans, rappelle vos jalons et bloque les dérives grâce à l'algorithme H.E.A.R.T." 
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg border border-gray-700">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left text-lg font-semibold rounded-lg focus:outline-none text-accent"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {openFAQ === index && (
                    <div className="p-4 pt-0 text-gray-300">
                      <p dangerouslySetInnerHTML={{ __html: item.a }}></p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 - Ask AI */}
          <section className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">7 · Demandez à DreamAI</h2>
            <div className="p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-50 border border-gray-700">
              <textarea
                className="w-full p-3 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-accent bg-primary text-white border border-gray-600"
                rows={3}
                placeholder="Posez votre question sur DreamAI (ex: Qu'est-ce que l'algorithme H.E.A.R.T. ?)..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="w-full px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center bg-accent text-primary"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Demander à l'IA ✨"
                )}
              </button>

              {error && (
                <p className="text-red-400 mt-4 text-center">{error}</p>
              )}

              {answer && (
                <div className="mt-6 p-4 rounded-lg bg-gray-700 border border-accent">
                  <h3 className="text-xl font-bold mb-2 text-accent">Réponse de DreamAI :</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
                </div>
              )}
            </div>
          </section>

          {/* Section Links */}
          <section id="links" className="py-12 px-4 lg:px-8 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">🔗 Liens utiles</h2>
            <ul className="space-y-2 list-disc list-inside text-gray-300">
              <li><a href="https://www.hub-franceia.fr/en/home-hub-france-ia-2-2/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Hub France IA — label "IA Responsable"</a></li>
              <li><a href="https://www.bpifrance.fr/catalogue-offres/diag-data-ia" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Bpifrance — Diag Data/IA</a></li>
              <li><a href="https://innovationisrael.org.il/en/calls_for_proposal/data-for-ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">IIA — Call "Data for AI"</a></li>
              <li><a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Documentation n8n (workflows)</a></li>
              <li><a href="https://firebase.google.com/docs/web/setup" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Guide Firebase Web Setup</a></li>
            </ul>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DreamAI. Tous droits réservés.</p>
        </footer>
      </div>
    </>
  )
}