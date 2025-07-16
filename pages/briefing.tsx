import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useCollection, useDocument } from '../hooks/useFirestore'

export default function Briefing() {
  const [activeTab, setActiveTab] = useState('overview')
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)
  
  // Firestore data
  const { data: tasks } = useCollection('tasks300')
  const { data: contacts } = useCollection('contacts')
  const { data: today } = useDocument('config', 'today')

  const currentDay = today?.currentDay || 1

  // Filter tasks by timeframe
  const next7Days = tasks?.filter(task => task.day >= currentDay && task.day <= currentDay + 7) || []
  const next30Days = tasks?.filter(task => task.day >= currentDay && task.day <= currentDay + 30) || []

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  // Strategic contacts data
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
    },
    {
      name: "Ariel - Co-fondateur",
      org: "DreamAI",
      tel: "Contact direct",
      email: "ariel@dreamai.com",
      tag: "Investisseur 50/50"
    }
  ]

  // Revenue streams data
  const revenueStreams = [
    { name: "Consulting & Services", month1: "€197", month3: "€9,000", month6: "€12,000", month10: "€12,000", percent: "24%" },
    { name: "Commissions", month1: "€0", month3: "€3,000", month6: "€10,000", month10: "€20,000", percent: "40%" },
    { name: "Micro-Apps", month1: "€0", month3: "€1,000", month6: "€5,000", month10: "€10,000", percent: "20%" },
    { name: "Subscriptions", month1: "€0", month3: "€2,000", month6: "€3,000", month10: "€8,000", percent: "16%" }
  ]

  // Tech stack
  const techStack = [
    "Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Gemini AI", "n8n", "Netlify", "GitHub",
    "Stripe", "Airtable", "Apollo", "TikTok", "LinkedIn", "GCP", "Vercel"
  ]

  return (
    <>
      <Head>
        <title>🚀 DreamAI Master Dashboard - 300 Days Roadmap</title>
        <meta name="description" content="Plan détaillé 300 jours pour atteindre €1M MRR - DreamAI" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :root {
          --bg-dark: #0d0f23;
          --accent: #7b5cff;
          --accent-light: #9b7fff;
          --accent-dark: #5b3cdf;
          --text-light: #e2e8f0;
          --text-muted: #94a3b8;
          --border: rgba(123, 92, 255, 0.3);
          --glass: rgba(255, 255, 255, 0.05);
          --glass-border: rgba(255, 255, 255, 0.1);
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--bg-dark);
          color: var(--text-light);
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .header {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        
        .header h1 {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .header .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        
        .nav-tabs {
          background: var(--glass);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          overflow-x: auto;
          white-space: nowrap;
        }
        
        .nav-tabs::-webkit-scrollbar {
          height: 6px;
        }
        
        .nav-tabs::-webkit-scrollbar-track {
          background: var(--glass);
        }
        
        .nav-tabs::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 3px;
        }
        
        .tab {
          display: inline-block;
          padding: 1rem 2rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          font-weight: 600;
          color: var(--text-muted);
        }
        
        .tab:hover {
          color: var(--text-light);
          background: rgba(123, 92, 255, 0.1);
        }
        
        .tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .tab-content {
          display: none;
          animation: fadeIn 0.5s ease;
        }
        
        .tab-content.active {
          display: block;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .section {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .section::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, var(--accent), transparent, var(--accent));
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .section:hover::before {
          opacity: 0.3;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .section-icon {
          font-size: 2rem;
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          border-radius: 12px;
          flex-shrink: 0;
        }
        
        .section h2 {
          color: var(--text-light);
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .section h3 {
          color: var(--accent);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .card {
          background: rgba(123, 92, 255, 0.1);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(123, 92, 255, 0.3);
          border-color: var(--accent);
        }
        
        .card-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent);
        }
        
        .stats-bar {
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          color: white;
          box-shadow: 0 10px 30px rgba(123, 92, 255, 0.3);
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
        }
        
        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-top: 0.5rem;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .metric-card {
          background: linear-gradient(135deg, rgba(123, 92, 255, 0.1), rgba(123, 92, 255, 0.05));
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }
        
        .metric-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
        }
        
        .metric-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        
        .timeline {
          position: relative;
          padding-left: 3rem;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 1rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--accent), transparent);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 2rem;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .timeline-item:hover {
          transform: translateX(10px);
          border-color: var(--accent);
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -2.5rem;
          top: 1.5rem;
          width: 1rem;
          height: 1rem;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 0 4px var(--bg-dark), 0 0 0 6px var(--accent);
        }
        
        .timeline-date {
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }
        
        .timeline-content {
          color: var(--text-light);
        }
        
        .timeline-tasks {
          margin-top: 0.5rem;
          padding-left: 1rem;
          border-left: 2px solid var(--border);
        }
        
        .badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin: 0.2rem;
        }
        
        .badge-primary {
          background: var(--accent);
          color: white;
        }
        
        .badge-success {
          background: #10b981;
          color: white;
        }
        
        .badge-warning {
          background: #f59e0b;
          color: white;
        }
        
        .badge-info {
          background: #3b82f6;
          color: white;
        }
        
        .feature-list {
          list-style: none;
        }
        
        .feature-list li {
          position: relative;
          padding-left: 2rem;
          margin-bottom: 1rem;
          color: var(--text-light);
        }
        
        .feature-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-size: 1.2rem;
        }
        
        .table-container {
          overflow-x: auto;
          margin-top: 1rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background: rgba(123, 92, 255, 0.2);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--accent);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        td {
          padding: 1rem;
          border-bottom: 1px solid var(--glass-border);
        }
        
        tr:hover {
          background: rgba(123, 92, 255, 0.05);
        }
        
        .contact-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }
        
        .contact-card:hover {
          transform: translateX(5px);
          border-color: var(--accent);
        }
        
        .contact-info h4 {
          color: var(--accent);
          margin-bottom: 0.3rem;
        }
        
        .phase-card {
          background: linear-gradient(135deg, var(--glass), rgba(123, 92, 255, 0.05));
          border: 2px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .phase-header {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .phase-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent);
        }
        
        .phase-duration {
          background: var(--accent);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
        }
        
        .tool-tag {
          display: inline-block;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #3b82f6;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          margin: 0.2rem;
        }
        
        .gemini-tag {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }
        
        .link-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .link-card {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 1.5rem;
          text-decoration: none;
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .link-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 10px 30px rgba(123, 92, 255, 0.3);
        }
        
        .link-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--accent);
        }
        
        .accordion-item {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        
        .accordion-header {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s ease;
        }
        
        .accordion-header:hover {
          background: rgba(123, 92, 255, 0.1);
        }
        
        .accordion-content {
          padding: 0 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        
        .accordion-item.active .accordion-content {
          max-height: 500px;
          padding: 0 1.5rem 1.5rem;
        }
        
        .accordion-arrow {
          transition: transform 0.3s ease;
          color: var(--accent);
        }
        
        .accordion-item.active .accordion-arrow {
          transform: rotate(180deg);
        }
        
        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }
          
          .container {
            padding: 1rem;
          }
          
          .section {
            padding: 1.5rem;
          }
          
          .timeline {
            padding-left: 2rem;
          }
          
          .nav-tabs {
            padding: 0 1rem;
          }
          
          .tab {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="min-h-screen bg-primary text-white">
        {/* Header */}
        <header className="header">
          <h1>🚀 DreamAI Master Dashboard</h1>
          <p className="subtitle">300 Days Journey to €1M MRR - Complete Roadmap & Execution Plan</p>
        </header>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <div className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => showTab('overview')}>📊 Overview</div>
          <div className={`tab ${activeTab === 'vision' ? 'active' : ''}`} onClick={() => showTab('vision')}>🎯 Vision & Strategy</div>
          <div className={`tab ${activeTab === 'day-by-day' ? 'active' : ''}`} onClick={() => showTab('day-by-day')}>📅 30-Day Detailed</div>
          <div className={`tab ${activeTab === 'phases' ? 'active' : ''}`} onClick={() => showTab('phases')}>🎨 All Phases</div>
          <div className={`tab ${activeTab === 'metrics' ? 'active' : ''}`} onClick={() => showTab('metrics')}>📈 Metrics & KPIs</div>
          <div className={`tab ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => showTab('tools')}>🛠️ Tech Stack</div>
          <div className={`tab ${activeTab === 'revenue' ? 'active' : ''}`} onClick={() => showTab('revenue')}>💰 Revenue Streams</div>
          <div className={`tab ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => showTab('contacts')}>📞 Contacts & Links</div>
        </nav>

        <div className="container">
          {/* Overview Tab */}
          <div className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
            {/* Quick Stats Bar */}
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-value">300</div>
                <div className="stat-label">Total Days</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">€50K</div>
                <div className="stat-label">Target Monthly Revenue</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">5</div>
                <div className="stat-label">Major Phases</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">15</div>
                <div className="stat-label">Revenue Sources</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">10K</div>
                <div className="stat-label">Target Users</div>
              </div>
            </div>

            {/* Current Status */}
            <section className="section">
              <div className="section-header">
                <div className="section-icon">📊</div>
                <h2>Current Status - Day {currentDay}/300</h2>
              </div>
              <div className="grid-3">
                <div className="metric-card">
                  <div className="metric-value">{next7Days.length}</div>
                  <div className="metric-label">Tasks Next 7 Days</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{next30Days.length}</div>
                  <div className="metric-label">Tasks Next 30 Days</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">{tasks?.length || 0}</div>
                  <div className="metric-label">Total Roadmap Tasks</div>
                </div>
              </div>
            </section>

            {/* Key Metrics Grid */}
            <section className="section">
              <div className="section-header">
                <div className="section-icon">📊</div>
                <h2>Key Performance Indicators</h2>
              </div>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-value">7</div>
                  <div className="metric-label">Profit Milestones</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">10</div>
                  <div className="metric-label">n8n Tools</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">9</div>
                  <div className="metric-label">Gemini Use Cases</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">43</div>
                  <div className="metric-label">Total Weeks</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">88+</div>
                  <div className="metric-label">DCS Score Target</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">0.7+</div>
                  <div className="metric-label">VELA Empathy</div>
                </div>
              </div>
            </section>

            {/* Phase Summary Cards */}
            <section className="section">
              <div className="section-header">
                <div className="section-icon">🎨</div>
                <h2>Journey Phases</h2>
              </div>
              <div className="grid-3">
                <div className="card">
                  <h3>Foundation Sprint</h3>
                  <p className="card-value">Days 1-7</p>
                  <p>Setup, MVP, First Sale</p>
                  <div className="badge badge-success">€197 target</div>
                </div>
                <div className="card">
                  <h3>Revenue Sprint</h3>
                  <p className="card-value">Days 8-30</p>
                  <p>Scale to €5K/month</p>
                  <div className="badge badge-success">€5,000 target</div>
                </div>
                <div className="card">
                  <h3>Agency Scale</h3>
                  <p className="card-value">Days 31-90</p>
                  <p>Consulting & Team</p>
                  <div className="badge badge-success">€15,000 target</div>
                </div>
                <div className="card">
                  <h3>SaaS Build</h3>
                  <p className="card-value">Days 91-180</p>
                  <p>Platform Development</p>
                  <div className="badge badge-success">€30,000 target</div>
                </div>
                <div className="card">
                  <h3>Platform & Seed</h3>
                  <p className="card-value">Days 181-300</p>
                  <p>Funding & Scale</p>
                  <div className="badge badge-success">€50,000 target</div>
                </div>
              </div>
            </section>
          </div>

          {/* Vision & Strategy Tab */}
          <div className={`tab-content ${activeTab === 'vision' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">🎯</div>
                <h2>Vision & Mission</h2>
              </div>
              <div className="grid-2">
                <div>
                  <h3>Core Vision</h3>
                  <ul className="feature-list">
                    <li>Transformer la loi d'attraction universelle en technologie accessible</li>
                    <li>Créer l'infrastructure émotionnelle du futur avant OpenAI wearable</li>
                    <li>Remplacer 7 plateformes par une solution unifiée DreamAI</li>
                    <li>Matérialiser les rêves en plans d'action concrets via l'IA</li>
                    <li>Construire une communauté de 10K dreamers actifs</li>
                  </ul>
                </div>
                <div>
                  <h3>Strategic Goals</h3>
                  <ul className="feature-list">
                    <li>Atteindre €1M MRR en 300 jours (€50K/mois initial)</li>
                    <li>Développer 15 sources de revenus diversifiées</li>
                    <li>Déposer 13 brevets technologiques clés</li>
                    <li>Maintenir DCS Score > 88 et VELA > 0.7</li>
                    <li>Lever seed round avant jour 300</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <div className="section-icon">🧠</div>
                <h2>Core Algorithms & IP</h2>
              </div>
              <div className="grid-3">
                <div className="card">
                  <h3>H.E.A.R.T Algorithm</h3>
                  <ul className="feature-list">
                    <li>Harmonic content filtering</li>
                    <li>Empathy score calculation</li>
                    <li>Authentic connection matching</li>
                    <li>Resilience building modules</li>
                    <li>Transformation tracking</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>DCS Score System</h3>
                  <ul className="feature-list">
                    <li>Dream clarity metrics</li>
                    <li>Consistency tracking</li>
                    <li>Scale of impact measurement</li>
                    <li>Real-time score updates</li>
                    <li>Peer benchmarking</li>
                  </ul>
                </div>
                <div className="card">
                  <h3>VELA Framework</h3>
                  <ul className="feature-list">
                    <li>Vision alignment scoring</li>
                    <li>Empathy level detection</li>
                    <li>Leadership potential analysis</li>
                    <li>Authenticity verification</li>
                    <li>Growth trajectory prediction</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* 30-Day Detailed Tab */}
          <div className={`tab-content ${activeTab === 'day-by-day' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">📅</div>
                <h2>Next 7 Days - Immediate Actions</h2>
              </div>
              
              <div className="timeline">
                {next7Days.length > 0 ? (
                  next7Days.map((task, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-date">Day {task.day}</div>
                      <div className="timeline-content">
                        <strong>{task.title}</strong>
                        {task.description && <p>{task.description}</p>}
                        <div className={`badge ${task.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                          {task.status || 'pending'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 1</div>
                      <div className="timeline-content">
                        <strong>Setup GCP + Gemini API + n8n</strong>
                        <p>Créer projet GCP, activer billing, obtenir clés Gemini, installer n8n, initialiser Git</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 2</div>
                      <div className="timeline-content">
                        <strong>Landing Page + Deploy Vercel</strong>
                        <p>Design Figma, setup Next.js + Tailwind, deploy Vercel avec domaine custom, analytics</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 3</div>
                      <div className="timeline-content">
                        <strong>LinkedIn Outreach Start</strong>
                        <p>20 DMs personnalisés Gemini, setup Airtable tracking, templates library, follow-up sequences</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 4</div>
                      <div className="timeline-content">
                        <strong>n8n Workflow Voice→Gemini→Keep</strong>
                        <p>Build prototype Voice2Text, test 5 use cases, documenter API connections, créer backups</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 5</div>
                      <div className="timeline-content">
                        <strong>First Offer €197 🎯</strong>
                        <p>Setup Stripe checkout, sales page Gemini copy, TikTok live session, email list</p>
                        <div className="badge badge-success">TARGET: €197</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 6</div>
                      <div className="timeline-content">
                        <strong>Analytics Review + Optimize</strong>
                        <p>Review KPIs, optimize landing copy, push Git updates, plan semaine 2</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-date">Jour 7</div>
                      <div className="timeline-content">
                        <strong>Plan Week 2 Revenue Sprint</strong>
                        <p>Content calendar, cold-email automation, webinar materials, social media schedule</p>
                        <div className="badge badge-info">pending</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <div className="section-icon">📊</div>
                <h2>Next 30 Days - Weekly Breakdown</h2>
              </div>
              
{[1, 2, 3, 4].map(week => {
                const weekTasks = next30Days.filter(task => 
                  task.day >= currentDay + (week - 1) * 7 && 
                  task.day < currentDay + week * 7
                )
                
                const getWeekTasks = (weekNum: number) => {
                  if (weekNum === 1) return [
                    { day: 8, title: "Multichannel Acquisition Launch", desc: "350 LinkedIn DMs/semaine (50/jour), 700 cold emails Apollo, daily TikTok AutoPost-∞", location: "Global" },
                    { day: 9, title: "Appel Hub France IA - Gaëlle Pinson", desc: "Tel: +33 1 84 88 05 60, Email: contact@hub-franceia.fr, demander label 'IA Responsable'", location: "France" },
                    { day: 10, title: "Dossier Bpifrance Diag IA", desc: "Tel: +33 1 53 89 78 78, Subvention 50% max 5k€, préparer dossier PME", location: "France" },
                    { day: 11, title: "Israel Innovation Authority - Data for AI", desc: "NIS 44M grant lancé juillet 2025! Contact: info@innovationisrael.org.il", location: "Israel" },
                    { day: 12, title: "LinkedIn automation scaling", desc: "PhantomBuster setup, Airtable tracking, 100 contacts/jour", location: "Global" },
                    { day: 13, title: "Webinar preparation", desc: "Gemini scripts, landing pages, email sequences", location: "Global" },
                    { day: 14, title: "Weekly review & optimize", desc: "KPIs analysis, A/B test results, plan semaine 2", location: "Global" }
                  ]
                  if (weekNum === 2) return [
                    { day: 15, title: "Webinar delivery #1", desc: "Onboard 10 clients, collect testimonials, upsell premium", location: "Global" },
                    { day: 16, title: "Ministry of Economy Israel contact", desc: "Email: pniyot@mse.gov.il, Digital Israel Initiative, présenter DreamAI", location: "Israel" },
                    { day: 17, title: "Station F application", desc: "Startup accelerator Paris, préparer dossier, networking events", location: "France" },
                    { day: 18, title: "Cold email automation", desc: "Apollo integration n8n, 1000 emails/jour, 15% open rate target", location: "Global" },
                    { day: 19, title: "French Tech ecosystem", desc: "Aleph VC, Partech, Serena Capital - warm introductions", location: "France" },
                    { day: 20, title: "Israel startup ecosystem", desc: "Vertex Ventures, Pitango, Grove Ventures - deck preparation", location: "Israel" },
                    { day: 21, title: "Revenue optimization", desc: "Stripe automation, billing cycles, churn reduction", location: "Global" }
                  ]
                  if (weekNum === 3) return [
                    { day: 22, title: "€9K Agency offer launch", desc: "Pack Acculturation IA, 4 semaines, PME françaises", location: "France" },
                    { day: 23, title: "Team building Israel", desc: "Recruter 1 AI developer Tel Aviv, 1 sales specialist", location: "Israel" },
                    { day: 24, title: "Bpifrance meeting", desc: "Présenter diagnostic IA, négocier partenariat long terme", location: "France" },
                    { day: 25, title: "Innovation Authority application", desc: "Dossier Data for AI grant NIS 44M, focus agrotech/health", location: "Israel" },
                    { day: 26, title: "Corporate partnerships", desc: "Orange, Thales, Dassault - POC propositions", location: "France" },
                    { day: 27, title: "Israeli corporates", desc: "Teva, CheckPoint, Wix - AI consulting proposals", location: "Israel" },
                    { day: 28, title: "Scale systems", desc: "Support automation, billing optimization, team onboarding", location: "Global" }
                  ]
                  if (weekNum === 4) return [
                    { day: 29, title: "€5K monthly target", desc: "Validate revenue run rate, optimize conversion funnels", location: "Global" },
                    { day: 30, title: "French grants final push", desc: "Submit all applications: Hub France IA, Bpifrance, ANRT", location: "France" },
                    { day: 31, title: "Israeli grants submission", desc: "Complete IIA application, prepare for next funding round", location: "Israel" },
                    { day: 32, title: "Agency phase preparation", desc: "Hire project manager, standardize delivery processes", location: "Global" },
                    { day: 33, title: "Networking acceleration", desc: "VivaTech Paris, Israel Innovation Week participation", location: "Both" },
                    { day: 34, title: "Phase 2 planning", desc: "90-day agency roadmap, team structure, revenue targets", location: "Global" },
                    { day: 35, title: "Investor outreach", desc: "Seed deck finalization, warm introductions, meeting scheduling", location: "Both" }
                  ]
                  return []
                }
                
                const defaultTasks = getWeekTasks(week)
                const tasksToShow = weekTasks.length > 0 ? weekTasks : defaultTasks
                
                return (
                  <div key={week} className={`accordion-item ${openAccordion === `week${week}` ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleAccordion(`week${week}`)}>
                      <h3>Semaine {week} ({tasksToShow.length} tâches)</h3>
                      <span className="accordion-arrow">▼</span>
                    </div>
                    <div className="accordion-content">
                      <div className="timeline">
                        {tasksToShow.map((task, index) => (
                          <div key={index} className="timeline-item">
                            <div className="timeline-date">
                              {'day' in task ? `Jour ${task.day}` : `Day ${task.day}`}
                              {'location' in task && (
                                <span className={`badge ${task.location === 'France' ? 'badge-primary' : 
                                                       task.location === 'Israel' ? 'badge-info' : 
                                                       task.location === 'Both' ? 'badge-warning' : 'badge-success'}`}>
                                  {task.location}
                                </span>
                              )}
                            </div>
                            <div className="timeline-content">
                              <strong>{'title' in task ? task.title : task.title}</strong>
                              <p>{'desc' in task ? task.desc : task.description}</p>
                              {task.status && (
                                <div className={`badge ${task.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                                  {task.status}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </section>
          </div>

          {/* All Phases Tab */}
          <div className={`tab-content ${activeTab === 'phases' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">🎨</div>
                <h2>Complete 300-Day Phase Breakdown</h2>
              </div>

              {/* Phase 1: Foundation Sprint */}
              <div className="phase-card">
                <div className="phase-header">
                  <h3 className="phase-title">Phase 1: Foundation Sprint</h3>
                  <span className="phase-duration">Days 1-7 (1 week)</span>
                </div>
                <div className="grid-3">
                  <div>
                    <h4>Objectives</h4>
                    <ul className="feature-list">
                      <li>Technical setup complete</li>
                      <li>First product launched</li>
                      <li>Initial revenue generated</li>
                      <li>Outreach systems active</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Key Deliverables</h4>
                    <ul className="feature-list">
                      <li>Landing page live</li>
                      <li>Stripe payment ready</li>
                      <li>n8n workflows built</li>
                      <li>First €197 sale</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Metrics</h4>
                    <div className="metric-card">
                      <div className="metric-value">€197</div>
                      <div className="metric-label">Revenue Target</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2-5 similar structure */}
              <div className="phase-card">
                <div className="phase-header">
                  <h3 className="phase-title">Phase 2: Revenue Sprint</h3>
                  <span className="phase-duration">Days 8-30 (3 weeks)</span>
                </div>
                <div className="grid-3">
                  <div>
                    <h4>Objectives</h4>
                    <ul className="feature-list">
                      <li>Scale to €5K MRR</li>
                      <li>Automate sales process</li>
                      <li>Build client base</li>
                      <li>Optimize conversions</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Key Activities</h4>
                    <ul className="feature-list">
                      <li>350 LinkedIn DMs/week</li>
                      <li>700 cold emails/week</li>
                      <li>Daily TikTok content</li>
                      <li>Weekly webinars</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Revenue Target</h4>
                    <div className="metric-card">
                      <div className="metric-value">€5K</div>
                      <div className="metric-label">Monthly Revenue</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue for other phases... */}
            </section>
          </div>

          {/* Tech Stack Tab */}
          <div className={`tab-content ${activeTab === 'tools' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">🛠️</div>
                <h2>Complete Technology Stack</h2>
              </div>
              
              <div className="grid-3">
                <div className="card">
                  <h3>Core Infrastructure</h3>
                  <ul className="feature-list">
                    <li><strong>GCP:</strong> Cloud platform</li>
                    <li><strong>Vercel:</strong> Frontend hosting</li>
                    <li><strong>Next.js:</strong> React framework</li>
                    <li><strong>Tailwind CSS:</strong> Styling</li>
                    <li><strong>Git/GitHub:</strong> Version control</li>
                    <li><strong>Firebase:</strong> Backend services</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h3>AI & Automation</h3>
                  <ul className="feature-list">
                    <li><strong>Gemini API:</strong> Content generation</li>
                    <li><strong>AI Studio:</strong> Model training</li>
                    <li><strong>n8n:</strong> Workflow automation</li>
                    <li><strong>ChatGPT:</strong> Support automation</li>
                    <li><strong>Claude:</strong> Advanced reasoning</li>
                  </ul>
                </div>
                
                <div className="card">
                  <h3>Business Tools</h3>
                  <ul className="feature-list">
                    <li><strong>Stripe:</strong> Payments</li>
                    <li><strong>Airtable:</strong> CRM</li>
                    <li><strong>Apollo:</strong> Cold outreach</li>
                    <li><strong>TikTok:</strong> Social media</li>
                    <li><strong>LinkedIn:</strong> B2B networking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <div className="section-icon">🤖</div>
                <h2>Gemini AI Use Cases</h2>
              </div>
              
              <div className="grid-2">
                <div>
                  <h3>Content Generation</h3>
                  <div className="badge gemini-tag">Write hero copy</div>
                  <div className="badge gemini-tag">DM personalization</div>
                  <div className="badge gemini-tag">Email personalization</div>
                  <div className="badge gemini-tag">Canvas flyer design</div>
                  <div className="badge gemini-tag">Social proof content</div>
                </div>
                <div>
                  <h3>Analysis & Insights</h3>
                  <div className="badge gemini-tag">Summarize client wins</div>
                  <div className="badge gemini-tag">Market analysis</div>
                  <div className="badge gemini-tag">Competitor research</div>
                  <div className="badge gemini-tag">Trend prediction</div>
                </div>
              </div>
            </section>
          </div>

          {/* Revenue Streams Tab */}
          <div className={`tab-content ${activeTab === 'revenue' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">💰</div>
                <h2>Revenue Mix Evolution</h2>
              </div>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Revenue Stream</th>
                      <th>Month 1</th>
                      <th>Month 3</th>
                      <th>Month 6</th>
                      <th>Month 10</th>
                      <th>% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueStreams.map((stream, index) => (
                      <tr key={index}>
                        <td>{stream.name}</td>
                        <td>{stream.month1}</td>
                        <td>{stream.month3}</td>
                        <td>{stream.month6}</td>
                        <td>{stream.month10}</td>
                        <td>{stream.percent}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 'bold' }}>
                      <td>Total MRR</td>
                      <td>€197</td>
                      <td>€15,000</td>
                      <td>€30,000</td>
                      <td>€50,000</td>
                      <td>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Contacts & Links Tab */}
          <div className={`tab-content ${activeTab === 'contacts' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">📞</div>
                <h2>Strategic Contacts</h2>
              </div>
              
              {strategicContacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-info">
                    <h4>{contact.name}</h4>
                    <p>{contact.org}</p>
                    <span className="badge badge-primary">{contact.tag}</span>
                  </div>
                  <div>
                    <p><strong>📞</strong> {contact.tel}</p>
                    <p><strong>✉️</strong> {contact.email}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="section">
              <div className="section-header">
                <div className="section-icon">🔗</div>
                <h2>Essential Resources</h2>
              </div>
              
              <div className="link-grid">
                <a href="https://www.hub-franceia.fr/en/home-hub-france-ia-2-2/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">🇫🇷</div>
                  <h4>Hub France IA</h4>
                  <p>Label "IA Responsable" et réseau d'experts</p>
                </a>
                
                <a href="https://www.bpifrance.fr/catalogue-offres/diag-data-ia" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">💶</div>
                  <h4>Bpifrance Diag Data/IA</h4>
                  <p>Programme de diagnostic et financement</p>
                </a>
                
                <a href="https://innovationisrael.org.il/en/calls_for_proposal/data-for-ai/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">🇮🇱</div>
                  <h4>IIA - Data for AI Call</h4>
                  <p>Innovation grants for AI startups</p>
                </a>
                
                <a href="https://docs.n8n.io/" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">⚙️</div>
                  <h4>n8n Documentation</h4>
                  <p>Workflow automation platform</p>
                </a>
                
                <a href="https://firebase.google.com/docs/web/setup" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">🔥</div>
                  <h4>Firebase Web Setup</h4>
                  <p>Backend infrastructure guide</p>
                </a>
                
                <a href="https://github.com/CodeNoLimits/dreamai-master" target="_blank" rel="noopener noreferrer" className="link-card">
                  <div className="link-icon">💻</div>
                  <h4>GitHub DreamAI</h4>
                  <p>Main repository & documentation</p>
                </a>
              </div>
            </section>
          </div>

          {/* Metrics Tab */}
          <div className={`tab-content ${activeTab === 'metrics' ? 'active' : ''}`}>
            <section className="section">
              <div className="section-header">
                <div className="section-icon">📊</div>
                <h2>Revenue Milestones Timeline</h2>
              </div>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Day 5</div>
                  <div className="timeline-content">
                    <h4>First Revenue: €197</h4>
                    <p>Foundation Sprint - First offer launch</p>
                    <div className="badge badge-success">+€197</div>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">Day 8</div>
                  <div className="timeline-content">
                    <h4>Scale to €500</h4>
                    <p>Revenue Sprint - Multichannel acquisition</p>
                    <div className="badge badge-success">+€303 (154% growth)</div>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">Day 30</div>
                  <div className="timeline-content">
                    <h4>5X Growth: €5,000</h4>
                    <p>Revenue Sprint - Scale & systemize</p>
                    <div className="badge badge-success">+€4,500 (900% growth)</div>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">Day 90</div>
                  <div className="timeline-content">
                    <h4>Agency Scale: €15,000</h4>
                    <p>Agency Scale - Premium offerings</p>
                    <div className="badge badge-success">+€10,000 (200% growth)</div>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">Day 180</div>
                  <div className="timeline-content">
                    <h4>SaaS Launch: €30,000</h4>
                    <p>SaaS Build - Platform monetization</p>
                    <div className="badge badge-success">+€15,000 (100% growth)</div>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">Day 300</div>
                  <div className="timeline-content">
                    <h4>Platform Scale: €50,000</h4>
                    <p>Platform & Seed - Full ecosystem</p>
                    <div className="badge badge-success">+€20,000 (67% growth)</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>© 2025 DreamAI - 
            <a href="https://github.com/CodeNoLimits/dreamai-master" style={{ color: 'var(--accent)', marginLeft: '0.5rem' }}>
              Repo
            </a> - 
            <a href="https://dreamaimastertracker.netlify.app" style={{ color: 'var(--accent)', marginLeft: '0.5rem' }}>
              Deploy
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}