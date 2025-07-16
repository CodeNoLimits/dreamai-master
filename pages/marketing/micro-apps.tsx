import Head from 'next/head'
import { useState } from 'react'

export default function MicroApps() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentApp, setCurrentApp] = useState('')
  const [modalInput, setModalInput] = useState('')
  const [modalOutput, setModalOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const apps = {
    email: {
      title: '✨ Smart Email Writer',
      placeholder: 'e.g., Write a short, friendly email...',
      promptPrefix: 'Write a professional and clear email based on the following request: '
    },
    dream: {
      title: '✨ Dream Compatibility Calculator',
      placeholder: 'e.g., I love building beautiful UIs...',
      promptPrefix: 'Based on the following description, identify key skills, suggest 3 suitable job roles, and propose 3 types of projects. Format clearly with headings.'
    },
    timebox: {
      title: '✨ Productivity TimeBox',
      placeholder: 'e.g., Develop a new feature...',
      promptPrefix: 'Break down the following task into smaller, actionable sub-tasks for focused work sprints: '
    }
  }

  const callGeminiAPI = async (prompt: string) => {
    setIsLoading(true)
    setModalOutput('AI is thinking...')
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      })
      
      const result = await response.json()
      
      if (result.candidates && result.candidates[0].content) {
        setModalOutput(result.candidates[0].content.parts[0].text)
      } else {
        setModalOutput('Sorry, something went wrong.')
      }
    } catch (error) {
      setModalOutput('Sorry, something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const openDemo = (appType: string) => {
    setCurrentApp(appType)
    setModalInput('')
    setModalOutput('AI output will appear here...')
    setModalOpen(true)
  }

  const generateDemo = () => {
    if (!modalInput.trim()) {
      setModalOutput('Please enter a prompt.')
      return
    }
    
    const appConfig = apps[currentApp as keyof typeof apps]
    const prompt = appConfig.promptPrefix + modalInput
    callGeminiAPI(prompt)
  }

  return (
    <>
      <Head>
        <title>AI Micro-Apps - DreamAI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="py-6 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">MicroApps.AI</h2>
          </header>

          <main className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <section className="text-center py-16 md:py-24">
              <div className="mb-4">
                <span className="inline-block bg-gray-800 text-accent text-sm font-medium px-4 py-1.5 rounded-full">
                  Publish on Play Store in 24h
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white leading-tight">
                AI-Powered Micro-Apps
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                Launch your own suite of AI applications without writing a single line of code. Try our AI-powered tools below!
              </p>
            </section>

            {/* Apps Section */}
            <section className="py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Smart Email Writer</h3>
                      <span className="text-xs font-semibold bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full">Freemium</span>
                    </div>
                    <p className="text-gray-400">AI-powered replies to craft perfect emails in seconds, saving you time and boosting your communication.</p>
                  </div>
                  <button
                    onClick={() => openDemo('email')}
                    className="mt-6 w-full bg-accent bg-opacity-20 text-accent font-semibold py-2 px-4 rounded-lg hover:bg-opacity-40 transition-colors"
                  >
                    Try Demo ✨
                  </button>
                </div>

                <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Dream Compat Calc</h3>
                      <span className="text-xs font-semibold bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full">Ads</span>
                    </div>
                    <p className="text-gray-400">Match your personal goals with potential teams and projects using our unique compatibility algorithm.</p>
                  </div>
                  <button
                    onClick={() => openDemo('dream')}
                    className="mt-6 w-full bg-accent bg-opacity-20 text-accent font-semibold py-2 px-4 rounded-lg hover:bg-opacity-40 transition-colors"
                  >
                    Try Demo ✨
                  </button>
                </div>

                <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Productivity TimeBox</h3>
                      <span className="text-xs font-semibold bg-purple-500 bg-opacity-20 text-purple-400 px-3 py-1 rounded-full">IAP</span>
                    </div>
                    <p className="text-gray-400">Enhance your focus with structured work sprints and break timers, designed for maximum productivity.</p>
                  </div>
                  <button
                    onClick={() => openDemo('timebox')}
                    className="mt-6 w-full bg-accent bg-opacity-20 text-accent font-semibold py-2 px-4 rounded-lg hover:bg-opacity-40 transition-colors"
                  >
                    Try Demo ✨
                  </button>
                </div>
              </div>
            </section>

            {/* Workflow Section */}
            <section className="py-16 md:py-24">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Your Idea to App Store in 3 Simple Steps</h2>
                <p className="mt-4 text-gray-400">An automated workflow that handles the heavy lifting for you.</p>
              </div>
              <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 bg-opacity-50 -translate-y-1/2"></div>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-accent bg-opacity-10 border-2 border-accent border-opacity-50 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl font-bold text-accent">1</span>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">Scope & Design</h3>
                    <p className="mt-1 text-gray-400">Use AI to scope your idea and generate a unique app icon.</p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-accent bg-opacity-10 border-2 border-accent border-opacity-50 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl font-bold text-accent">2</span>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">Auto-build APK</h3>
                    <p className="mt-1 text-gray-400">Our system compiles and builds your app automatically.</p>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 bg-accent bg-opacity-10 border-2 border-accent border-opacity-50 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl font-bold text-accent">3</span>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">1-click Publish</h3>
                    <p className="mt-1 text-gray-400">Directly publish your finished app to the Google Play Store.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16">
              <button className="bg-accent hover:bg-opacity-80 text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors shadow-lg">
                Generate Your App →
              </button>
            </section>
          </main>
        </div>

        {/* Demo Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="bg-gray-800 bg-opacity-50 w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-lg border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">{apps[currentApp as keyof typeof apps]?.title}</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <textarea
                  className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-white placeholder-gray-400"
                  placeholder={apps[currentApp as keyof typeof apps]?.placeholder}
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                />
                <button
                  onClick={generateDemo}
                  disabled={isLoading}
                  className="w-full bg-accent text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>
              <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded-lg min-h-[100px] whitespace-pre-wrap text-gray-300">
                {modalOutput}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}