import { useState, useEffect } from 'react'

interface DayData {
  day: number
  date: string
  phase: string
  theme: string
  priority: string
  revenue_target: string
  tasks: string[]
  status: 'completed' | 'in_progress' | 'upcoming'
  progress: number
}

export default function Interactive300Days() {
  const [selectedDay, setSelectedDay] = useState<number>(1)
  const [currentPhase, setCurrentPhase] = useState<number>(1)
  const [animationFrame, setAnimationFrame] = useState(0)
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'phases'>('timeline')

  // Données des 300 jours (version simplifiée pour la démo)
  const [daysData, setDaysData] = useState<DayData[]>([])

  useEffect(() => {
    // Génération des données des 300 jours
    const generateDaysData = () => {
      const phases = [
        { name: 'Foundation Sprint', days: 30, color: '#00ff88' },
        { name: 'Revenue Acceleration', days: 60, color: '#00aaff' },
        { name: 'Scale & Optimize', days: 90, color: '#ff6600' },
        { name: 'Market Domination', days: 90, color: '#ff0088' },
        { name: 'Global Expansion', days: 30, color: '#8800ff' }
      ]

      const data: DayData[] = []
      let currentDay = 1
      const startDate = new Date('2025-07-17')

      phases.forEach((phase, phaseIndex) => {
        for (let i = 0; i < phase.days; i++) {
          const date = new Date(startDate)
          date.setDate(startDate.getDate() + currentDay - 1)
          
          data.push({
            day: currentDay,
            date: date.toISOString().split('T')[0],
            phase: phase.name,
            theme: `Jour ${currentDay} - ${phase.name}`,
            priority: currentDay <= 3 ? 'CRITIQUE' : currentDay <= 30 ? 'HAUTE' : 'NORMALE',
            revenue_target: currentDay <= 30 ? '€1,000' : currentDay <= 90 ? '€5,000' : '€10,000',
            tasks: [
              `Tâche principale du jour ${currentDay}`,
              `Objectif secondaire ${currentDay}`,
              `Validation étape ${currentDay}`
            ],
            status: currentDay <= 3 ? 'in_progress' : currentDay > 300 ? 'upcoming' : 'upcoming',
            progress: currentDay <= 3 ? Math.random() * 100 : 0
          })
          currentDay++
        }
      })

      return data
    }

    setDaysData(generateDaysData())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getPhaseColor = (phaseName: string) => {
    const colors: { [key: string]: string } = {
      'Foundation Sprint': '#00ff88',
      'Revenue Acceleration': '#00aaff',
      'Scale & Optimize': '#ff6600',
      'Market Domination': '#ff0088',
      'Global Expansion': '#8800ff'
    }
    return colors[phaseName] || '#666'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITIQUE': return '#ff0044'
      case 'HAUTE': return '#ff6600'
      case 'NORMALE': return '#00aaff'
      default: return '#666'
    }
  }

  const selectedDayData = daysData.find(day => day.day === selectedDay)

  const renderTimelineView = () => (
    <div className="timeline-container">
      <div className="timeline-header">
        <h3>Timeline des 300 Jours DreamAI</h3>
        <div className="progress-overview">
          <span>Progression Globale: {Math.round((selectedDay / 300) * 100)}%</span>
        </div>
      </div>
      
      <div className="timeline-scroll">
        {daysData.slice(0, 50).map((day, index) => (
          <div
            key={day.day}
            className={`timeline-item ${selectedDay === day.day ? 'selected' : ''}`}
            onClick={() => setSelectedDay(day.day)}
            style={{
              borderColor: getPhaseColor(day.phase),
              transform: selectedDay === day.day ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div className="day-number">{day.day}</div>
            <div className="day-info">
              <div className="day-date">{day.date}</div>
              <div className="day-phase" style={{ color: getPhaseColor(day.phase) }}>
                {day.phase}
              </div>
              <div className="day-priority" style={{ color: getPriorityColor(day.priority) }}>
                {day.priority}
              </div>
            </div>
            <div className="day-revenue">{day.revenue_target}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDayDetails = () => (
    selectedDayData && (
      <div className="day-details">
        <div className="details-header">
          <h2>Jour {selectedDayData.day} - {selectedDayData.phase}</h2>
          <div className="status-badge" style={{ backgroundColor: getPhaseColor(selectedDayData.phase) }}>
            {selectedDayData.status.toUpperCase()}
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <h4>📅 Date</h4>
            <p>{selectedDayData.date}</p>
          </div>
          
          <div className="detail-card">
            <h4>🎯 Priorité</h4>
            <p style={{ color: getPriorityColor(selectedDayData.priority) }}>
              {selectedDayData.priority}
            </p>
          </div>
          
          <div className="detail-card">
            <h4>💰 Objectif Revenue</h4>
            <p>{selectedDayData.revenue_target}</p>
          </div>
          
          <div className="detail-card">
            <h4>📊 Progression</h4>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${selectedDayData.progress}%`,
                  backgroundColor: getPhaseColor(selectedDayData.phase)
                }}
              />
            </div>
            <p>{Math.round(selectedDayData.progress)}%</p>
          </div>
        </div>

        <div className="tasks-section">
          <h4>📋 Tâches du Jour</h4>
          <ul className="tasks-list">
            {selectedDayData.tasks.map((task, index) => (
              <li key={index} className="task-item">
                <span className="task-bullet">•</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  )

  return (
    <div className="days-300-container">
      <style jsx>{`
        .days-300-container {
          width: 100%;
          height: 600px;
          background: linear-gradient(135deg, rgba(0,20,40,0.95) 0%, rgba(0,40,80,0.95) 100%);
          border-radius: 20px;
          border: 1px solid rgba(0,255,136,0.3);
          overflow: hidden;
          backdrop-filter: blur(20px);
          display: flex;
          position: relative;
        }

        .timeline-container {
          flex: 1;
          padding: 20px;
          border-right: 1px solid rgba(0,255,136,0.3);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(0,255,136,0.3);
        }

        .timeline-header h3 {
          color: #00ff88;
          margin: 0;
          font-size: 1.3rem;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .progress-overview {
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
        }

        .timeline-scroll {
          height: 500px;
          overflow-y: auto;
          padding-right: 10px;
        }

        .timeline-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .timeline-scroll::-webkit-scrollbar-track {
          background: rgba(0,40,80,0.5);
          border-radius: 3px;
        }

        .timeline-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,255,136,0.5);
          border-radius: 3px;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          padding: 15px;
          margin-bottom: 10px;
          background: linear-gradient(135deg, rgba(0,40,80,0.6) 0%, rgba(0,20,60,0.8) 100%);
          border-radius: 10px;
          border: 1px solid rgba(0,255,136,0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .timeline-item:hover {
          transform: translateX(5px) scale(1.02);
          border-color: rgba(0,255,136,0.6);
          box-shadow: 0 5px 20px rgba(0,255,136,0.2);
        }

        .timeline-item.selected {
          border-color: rgba(0,255,136,1);
          box-shadow: 0 0 30px rgba(0,255,136,0.4);
          background: linear-gradient(135deg, rgba(0,60,120,0.8) 0%, rgba(0,40,100,0.9) 100%);
        }

        .day-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00aaff 0%, #00ff88 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          margin-right: 15px;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .day-info {
          flex: 1;
        }

        .day-date {
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .day-phase {
          font-weight: bold;
          font-size: 0.95rem;
          margin-bottom: 3px;
        }

        .day-priority {
          font-size: 0.8rem;
          font-weight: bold;
        }

        .day-revenue {
          color: #00ff88;
          font-weight: bold;
          font-size: 1.1rem;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .day-details {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }

        .details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(0,255,136,0.3);
        }

        .details-header h2 {
          color: #00ff88;
          margin: 0;
          font-size: 1.4rem;
          text-shadow: 0 0 10px rgba(0,255,136,0.5);
        }

        .status-badge {
          padding: 5px 15px;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 25px;
        }

        .detail-card {
          background: linear-gradient(135deg, rgba(0,40,80,0.6) 0%, rgba(0,20,60,0.8) 100%);
          border-radius: 10px;
          border: 1px solid rgba(0,255,136,0.3);
          padding: 15px;
        }

        .detail-card h4 {
          color: #00ff88;
          margin: 0 0 10px 0;
          font-size: 0.9rem;
        }

        .detail-card p {
          color: rgba(255,255,255,0.9);
          margin: 0;
          font-size: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0,40,80,0.6);
          border-radius: 4px;
          overflow: hidden;
          margin: 10px 0;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
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

        .tasks-section {
          background: linear-gradient(135deg, rgba(0,40,80,0.6) 0%, rgba(0,20,60,0.8) 100%);
          border-radius: 10px;
          border: 1px solid rgba(0,255,136,0.3);
          padding: 20px;
        }

        .tasks-section h4 {
          color: #00ff88;
          margin: 0 0 15px 0;
          font-size: 1.1rem;
        }

        .tasks-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .task-item {
          color: rgba(255,255,255,0.9);
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,255,136,0.1);
          display: flex;
          align-items: center;
        }

        .task-item:last-child {
          border-bottom: none;
        }

        .task-bullet {
          color: #00ff88;
          margin-right: 10px;
          font-size: 1.2rem;
        }

        .cosmic-particles {
          position: absolute;
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
          animation: float 6s linear infinite;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(50px); opacity: 0; }
        }
      `}</style>

      {/* Particules cosmiques */}
      <div className="cosmic-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {renderTimelineView()}
      {renderDayDetails()}
    </div>
  )
}

