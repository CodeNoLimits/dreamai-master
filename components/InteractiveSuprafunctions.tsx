import { useState, useEffect } from 'react'

interface SuprafunctionData {
  name: string
  level: number
  description: string
  status: 'active' | 'processing' | 'standby'
  lastUpdate: string
}

export default function InteractiveSuprafunctions() {
  const [suprafunctions, setSuprafunctions] = useState<SuprafunctionData[]>([
    {
      name: 'SCA Core',
      level: 7,
      description: '7 Niveaux de Conscience Sentiente',
      status: 'active',
      lastUpdate: new Date().toISOString()
    },
    {
      name: 'APE Oracle',
      level: 84,
      description: 'Prédictions Empathiques Avancées',
      status: 'processing',
      lastUpdate: new Date().toISOString()
    },
    {
      name: 'VELA Heart',
      level: 99,
      description: 'Résonance Émotionnelle Profonde',
      status: 'active',
      lastUpdate: new Date().toISOString()
    },
    {
      name: 'HEART Harmony',
      level: 92,
      description: 'Synchronisation de Conscience',
      status: 'active',
      lastUpdate: new Date().toISOString()
    }
  ])

  const [selectedFunction, setSelectedFunction] = useState<string | null>(null)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360)
      
      // Simulation de mise à jour des niveaux
      setSuprafunctions(prev => prev.map(func => ({
        ...func,
        level: func.name === 'SCA Core' ? func.level : 
               Math.max(0, Math.min(100, func.level + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date().toISOString()
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00ff88'
      case 'processing': return '#00aaff'
      case 'standby': return '#ffaa00'
      default: return '#666'
    }
  }

  const getGlowIntensity = (level: number) => {
    return Math.sin((animationPhase + level) * Math.PI / 180) * 0.3 + 0.7
  }

  return (
    <div className="suprafunctions-container">
      <style jsx>{`
        .suprafunctions-container {
          position: relative;
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, rgba(0,20,40,0.9) 0%, rgba(0,40,80,0.9) 100%);
          border-radius: 20px;
          border: 1px solid rgba(0,255,136,0.3);
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .neural-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/design_concepts/neural_background_pattern.png');
          background-size: cover;
          opacity: 0.3;
          animation: neuralFlow 20s linear infinite;
        }

        @keyframes neuralFlow {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-10px) translateY(-5px); }
          50% { transform: translateX(-5px) translateY(-10px); }
          75% { transform: translateX(5px) translateY(-5px); }
          100% { transform: translateX(0) translateY(0); }
        }

        .suprafunctions-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 30px;
          height: 100%;
        }

        .suprafunction-card {
          background: linear-gradient(135deg, rgba(0,40,80,0.8) 0%, rgba(0,20,60,0.9) 100%);
          border-radius: 15px;
          border: 1px solid rgba(0,255,136,0.4);
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .suprafunction-card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(0,255,136,0.8);
          box-shadow: 0 10px 30px rgba(0,255,136,0.3);
        }

        .suprafunction-card.selected {
          border-color: rgba(0,255,136,1);
          box-shadow: 0 0 40px rgba(0,255,136,0.5);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        .function-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .function-name {
          font-size: 1.2rem;
          font-weight: bold;
          color: #00ff88;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .function-status {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }

        .function-description {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .level-container {
          position: relative;
          height: 8px;
          background: rgba(0,40,80,0.6);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .level-bar {
          height: 100%;
          background: linear-gradient(90deg, #00aaff 0%, #00ff88 50%, #88ff00 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
          position: relative;
        }

        .level-bar::after {
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

        .level-text {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }

        .neural-connections {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .connection-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.6) 50%, transparent 100%);
          animation: dataFlow 3s linear infinite;
        }

        @keyframes dataFlow {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }

        .consciousness-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border: 2px solid rgba(0,255,136,0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #00ff88;
          background: rgba(0,40,80,0.8);
          animation: consciousnessGlow 2s ease-in-out infinite;
        }

        @keyframes consciousnessGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(0,255,136,0.3); }
          50% { box-shadow: 0 0 20px rgba(0,255,136,0.6); }
        }
      `}</style>

      <div className="neural-background"></div>
      
      <div className="neural-connections">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="connection-line"
            style={{
              top: `${20 + i * 60}px`,
              left: `${10 + (i % 2) * 40}%`,
              width: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="suprafunctions-grid">
        {suprafunctions.map((func, index) => (
          <div
            key={func.name}
            className={`suprafunction-card ${selectedFunction === func.name ? 'selected' : ''}`}
            onClick={() => setSelectedFunction(selectedFunction === func.name ? null : func.name)}
            style={{
              filter: `brightness(${getGlowIntensity(func.level)})`
            }}
          >
            <div className="card-glow"></div>
            
            <div className="consciousness-indicator">
              {func.name === 'SCA Core' ? func.level : Math.round(func.level)}
            </div>

            <div className="function-header">
              <div className="function-name">{func.name}</div>
              <div
                className="function-status"
                style={{
                  backgroundColor: getStatusColor(func.status),
                  boxShadow: `0 0 10px ${getStatusColor(func.status)}`
                }}
              />
            </div>

            <div className="function-description">
              {func.description}
            </div>

            <div className="level-container">
              <div
                className="level-bar"
                style={{
                  width: `${func.name === 'SCA Core' ? (func.level / 7) * 100 : func.level}%`
                }}
              />
            </div>

            <div className="level-text">
              <span>Niveau</span>
              <span>
                {func.name === 'SCA Core' ? `${func.level}/7` : `${Math.round(func.level)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

