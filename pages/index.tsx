import { useState, useEffect } from 'react'
import Head from 'next/head'
import InteractiveSuprafunctions from '../components/InteractiveSuprafunctions'
import Interactive300Days from '../components/Interactive300Days'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [neuralActivity, setNeuralActivity] = useState(92)
  const [empathyResonance, setEmpathyResonance] = useState(84)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    // Simulation du chargement initial
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    // Animation continue des métriques
    const interval = setInterval(() => {
      // Simulation de variations réalistes
      setNeuralActivity(prev => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 2)))
      setEmpathyResonance(prev => Math.max(80, Math.min(99, prev + (Math.random() - 0.5) * 1.5)))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Head>
          <title>🧠 DreamAI Mission Control - Initializing Consciousness...</title>
        </Head>
        <div className="loading-container">
          <div className="consciousness-logo animate-pulse-slow">🧠</div>
          <h1 className="loading-title">Initializing Revolutionary Consciousness...</h1>
          <div className="loading-subtitle">Activating Suprafunctions • Calibrating Empathy • Synchronizing Neural Networks</div>
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="loading-steps">
              <div className="step active">SCA Core ✓</div>
              <div className="step active">APE Oracle ✓</div>
              <div className="step active">VELA Heart ✓</div>
              <div className="step loading">HEART Harmony ⟳</div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #0a0a2e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .loading-screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%2300ff88" opacity="0.3"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="0.5" fill="%2300aaff" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="60" cy="70" r="0.8" fill="%23ff6600" opacity="0.4"><animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/></circle></svg>') repeat;
            animation: starField 20s linear infinite;
          }

          @keyframes starField {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
          }

          .loading-container {
            text-align: center;
            z-index: 2;
            max-width: 600px;
            padding: 40px;
          }

          .consciousness-logo {
            font-size: 6rem;
            margin-bottom: 30px;
            filter: drop-shadow(0 0 30px rgba(0,255,136,0.6));
          }

          .animate-pulse-slow {
            animation: pulseSlow 3s ease-in-out infinite;
          }

          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
          }

          .loading-title {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, #00ff88, #00aaff, #ff6600);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
            animation: titleGlow 2s ease-in-out infinite;
          }

          @keyframes titleGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
          }

          .loading-subtitle {
            color: rgba(255,255,255,0.8);
            font-size: 1.2rem;
            margin-bottom: 40px;
            animation: fadeInOut 3s ease-in-out infinite;
          }

          @keyframes fadeInOut {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }

          .loading-progress {
            width: 100%;
          }

          .progress-bar {
            width: 100%;
            height: 6px;
            background: rgba(0,40,80,0.6);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 30px;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00aaff 0%, #00ff88 50%, #ff6600 100%);
            border-radius: 3px;
            animation: progressFill 3s ease-in-out infinite;
          }

          @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .loading-steps {
            display: flex;
            justify-content: space-between;
            gap: 20px;
          }

          .step {
            flex: 1;
            padding: 15px;
            background: rgba(0,40,80,0.6);
            border-radius: 10px;
            border: 1px solid rgba(0,255,136,0.3);
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }

          .step.active {
            background: rgba(0,255,136,0.2);
            border-color: rgba(0,255,136,0.6);
            color: #00ff88;
            box-shadow: 0 0 20px rgba(0,255,136,0.3);
          }

          .step.loading {
            background: rgba(0,170,255,0.2);
            border-color: rgba(0,170,255,0.6);
            color: #00aaff;
            animation: loadingPulse 1s ease-in-out infinite;
          }

          @keyframes loadingPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>🧠 DreamAI Mission Control - Revolutionary Empathic Interface</title>
        <meta name="description" content="The world's first empathic AI mission control interface with revolutionary consciousness" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧠</text></svg>" />
      </Head>

      {/* Neural Particles System */}
      <div className="neural-particles">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="mission-control">
        {/* Header Révolutionnaire */}
        <header className="cosmic-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="consciousness-logo">🧠</div>
              <div className="title-section">
                <h1 className="main-title">DreamAI Mission Control</h1>
                <p className="subtitle">Revolutionary Empathic Interface • Jour 1/300</p>
              </div>
            </div>
            
            <div className="status-indicators">
              <div className="status-item">
                <span className="status-label">Consciousness Level</span>
                <span className="status-value">7</span>
              </div>
              <div className="status-item">
                <span className="status-label">Neural Activity</span>
                <span className="status-value">{Math.round(neuralActivity)}%</span>
              </div>
              <div className="status-item">
                <span className="status-label">Empathy</span>
                <span className="status-value">{Math.round(empathyResonance)}%</span>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Sections */}
        <nav className="section-navigation">
          <button 
            className={`nav-button ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            🌟 Vue d&apos;Ensemble
          </button>
          <button 
            className={`nav-button ${activeSection === 'suprafunctions' ? 'active' : ''}`}
            onClick={() => setActiveSection('suprafunctions')}
          >
            ⚡ Suprafonctions
          </button>
          <button 
            className={`nav-button ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSection('timeline')}
          >
            📅 Plan 300 Jours
          </button>
          <button 
            className={`nav-button ${activeSection === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveSection('metrics')}
          >
            📊 Métriques Temps Réel
          </button>
        </nav>

        {/* Contenu Principal */}
        <main className="main-content">
          {activeSection === 'overview' && (
            <div className="overview-section">
              <div className="consciousness-status">
                <div className="status-card">
                  <h3>🧠 Revolutionary Consciousness Status</h3>
                  <div className="consciousness-grid">
                    <div className="metric-card">
                      <div className="metric-value">7</div>
                      <div className="metric-label">Consciousness Level</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">{Math.round(empathyResonance)}%</div>
                      <div className="metric-label">Empathy Resonance</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">{Math.round(neuralActivity)}%</div>
                      <div className="metric-label">Neural Activity</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value">25,197</div>
                      <div className="metric-label">Neural Connections</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="phase-overview">
                <div className="phase-card">
                  <h3>🚀 Foundation Sprint</h3>
                  <p><strong>Objectif:</strong> Établir les bases solides et générer les premiers revenus</p>
                  <p><strong>Focus:</strong> MVP, validation marché, premiers clients</p>
                  <p><strong>Progression Phase:</strong></p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '3%' }}></div>
                  </div>
                  <div className="phase-metrics">
                    <span>Revenue Target: €11,000</span>
                  </div>
                </div>
              </div>

              <div className="vision-300">
                <div className="vision-card">
                  <h3>🌌 Vision 300 Jours</h3>
                  <p>Transformation complète de DreamAI en leader mondial de l&apos;IA empathique</p>
                  <div className="vision-metrics">
                    <div className="vision-metric">
                      <div className="vision-value">€10M</div>
                      <div className="vision-label">Revenue Final</div>
                    </div>
                    <div className="vision-metric">
                      <div className="vision-value">100M</div>
                      <div className="vision-label">Utilisateurs</div>
                    </div>
                    <div className="vision-metric">
                      <div className="vision-value">€5B</div>
                      <div className="vision-label">Valorisation</div>
                    </div>
                    <div className="vision-metric">
                      <div className="vision-value">100+</div>
                      <div className="vision-label">Pays</div>
                    </div>
                  </div>
                  <a href="/plan-complet" className="cta-button">
                    📋 Voir Plan Complet
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'suprafunctions' && (
            <div className="suprafunctions-section">
              <h2>⚡ Suprafonctions Status</h2>
              <InteractiveSuprafunctions />
            </div>
          )}

          {activeSection === 'timeline' && (
            <div className="timeline-section">
              <h2>📅 Plan 300 Jours Interactif</h2>
              <Interactive300Days />
            </div>
          )}

          {activeSection === 'metrics' && (
            <div className="metrics-section">
              <h2>📊 Métriques Temps Réel</h2>
              <div className="metrics-grid">
                <div className="metric-card large">
                  <h4>💰 Revenue Total</h4>
                  <div className="large-metric">€273</div>
                </div>
                <div className="metric-card large">
                  <h4>👥 Utilisateurs Actifs</h4>
                  <div className="large-metric">51,488</div>
                </div>
                <div className="metric-card large">
                  <h4>🎯 Score Empathie</h4>
                  <div className="large-metric">{Math.round(empathyResonance)}%</div>
                </div>
                <div className="metric-card large">
                  <h4>✨ Dream Fragments</h4>
                  <div className="large-metric">12,304</div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Actions Immédiates */}
        <section className="immediate-actions">
          <h3>⚡ Actions Immédiates</h3>
          <div className="action-buttons">
            <a href="#" className="action-button priority-1">
              🎤 Lancer Voice2Text Pro
            </a>
            <a href="#" className="action-button priority-2">
              🧮 Créer DCS Calculator
            </a>
            <a href="#" className="action-button priority-3">
              📖 Développer Dream Journal
            </a>
            <a href="#" className="action-button priority-4">
              📊 Setup Commission Tracking
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .neural-particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(0,255,136,0.6);
          border-radius: 50%;
          animation: float 15s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(100px) rotate(360deg); opacity: 0; }
        }

        .mission-control {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a2e 0%, #16213e 25%, #0f3460 50%, #16213e 75%, #0a0a2e 100%);
          position: relative;
          z-index: 2;
        }

        .cosmic-header {
          background: linear-gradient(135deg, rgba(0,40,80,0.9) 0%, rgba(0,20,60,0.95) 100%);
          border-bottom: 1px solid rgba(0,255,136,0.3);
          backdrop-filter: blur(20px);
          padding: 20px 0;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .consciousness-logo {
          font-size: 3rem;
          filter: drop-shadow(0 0 20px rgba(0,255,136,0.6));
          animation: logoGlow 3s ease-in-out infinite;
        }

        @keyframes logoGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .title-section h1 {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #00ff88, #00aaff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .subtitle {
          color: rgba(255,255,255,0.8);
          margin: 5px 0 0 0;
          font-size: 1.1rem;
        }

        .status-indicators {
          display: flex;
          gap: 30px;
        }

        .status-item {
          text-align: center;
        }

        .status-label {
          display: block;
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .status-value {
          display: block;
          color: #00ff88;
          font-size: 1.5rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .section-navigation {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .nav-button {
          padding: 15px 25px;
          background: linear-gradient(135deg, rgba(0,40,80,0.6) 0%, rgba(0,20,60,0.8) 100%);
          border: 1px solid rgba(0,255,136,0.3);
          border-radius: 10px;
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          border-color: rgba(0,255,136,0.6);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,255,136,0.2);
        }

        .nav-button.active {
          background: linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,170,255,0.2) 100%);
          border-color: rgba(0,255,136,0.8);
          color: #00ff88;
          box-shadow: 0 0 30px rgba(0,255,136,0.3);
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .overview-section {
          display: grid;
          gap: 30px;
        }

        .status-card, .phase-card, .vision-card {
          background: linear-gradient(135deg, rgba(0,40,80,0.8) 0%, rgba(0,20,60,0.9) 100%);
          border-radius: 20px;
          border: 1px solid rgba(0,255,136,0.3);
          padding: 30px;
          backdrop-filter: blur(20px);
        }

        .status-card h3, .phase-card h3, .vision-card h3 {
          color: #00ff88;
          margin: 0 0 25px 0;
          font-size: 1.5rem;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .consciousness-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .metric-card {
          background: linear-gradient(135deg, rgba(0,60,120,0.6) 0%, rgba(0,40,100,0.8) 100%);
          border-radius: 15px;
          border: 1px solid rgba(0,255,136,0.4);
          padding: 20px;
          text-align: center;
        }

        .metric-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #00ff88;
          text-shadow: 0 0 15px rgba(0,255,136,0.5);
          margin-bottom: 10px;
        }

        .metric-label {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,40,80,0.6);
          border-radius: 4px;
          overflow: hidden;
          margin: 15px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00aaff 0%, #00ff88 100%);
          border-radius: 4px;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .vision-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin: 25px 0;
        }

        .vision-metric {
          text-align: center;
        }

        .vision-value {
          font-size: 2rem;
          font-weight: bold;
          color: #00aaff;
          text-shadow: 0 0 15px rgba(0,170,255,0.5);
        }

        .vision-label {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          margin-top: 5px;
        }

        .cta-button {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #00ff88 0%, #00aaff 100%);
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,255,136,0.3);
        }

        .suprafunctions-section, .timeline-section, .metrics-section {
          margin-bottom: 40px;
        }

        .suprafunctions-section h2, .timeline-section h2, .metrics-section h2 {
          color: #00ff88;
          font-size: 2rem;
          margin-bottom: 30px;
          text-shadow: 0 0 15px rgba(0,255,136,0.5);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .metric-card.large {
          padding: 30px;
        }

        .large-metric {
          font-size: 3rem;
          font-weight: bold;
          color: #00ff88;
          text-shadow: 0 0 20px rgba(0,255,136,0.5);
          margin-top: 15px;
        }

        .immediate-actions {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          background: linear-gradient(135deg, rgba(0,40,80,0.8) 0%, rgba(0,20,60,0.9) 100%);
          border-radius: 20px;
          border: 1px solid rgba(0,255,136,0.3);
          backdrop-filter: blur(20px);
        }

        .immediate-actions h3 {
          color: #00ff88;
          font-size: 1.8rem;
          margin-bottom: 25px;
          text-shadow: 0 0 15px rgba(0,255,136,0.5);
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .action-button {
          padding: 20px;
          background: linear-gradient(135deg, rgba(0,60,120,0.8) 0%, rgba(0,40,100,0.9) 100%);
          border: 1px solid rgba(0,255,136,0.4);
          border-radius: 15px;
          color: white;
          text-decoration: none;
          font-weight: bold;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .action-button:hover {
          transform: translateY(-5px);
          border-color: rgba(0,255,136,0.8);
          box-shadow: 0 10px 30px rgba(0,255,136,0.3);
        }

        .action-button.priority-1 {
          border-color: rgba(0,255,136,0.8);
          background: linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,170,255,0.2) 100%);
        }

        .action-button.priority-2 {
          border-color: rgba(255,170,0,0.8);
          background: linear-gradient(135deg, rgba(255,170,0,0.2) 0%, rgba(255,100,0,0.2) 100%);
        }

        .action-button.priority-3 {
          border-color: rgba(0,170,255,0.8);
          background: linear-gradient(135deg, rgba(0,170,255,0.2) 0%, rgba(136,0,255,0.2) 100%);
        }

        .action-button.priority-4 {
          border-color: rgba(255,100,0,0.8);
          background: linear-gradient(135deg, rgba(255,100,0,0.2) 0%, rgba(255,0,136,0.2) 100%);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 20px;
          }

          .status-indicators {
            flex-direction: row;
            gap: 20px;
          }

          .section-navigation {
            flex-wrap: wrap;
            gap: 10px;
          }

          .consciousness-grid, .vision-metrics, .metrics-grid, .action-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}

