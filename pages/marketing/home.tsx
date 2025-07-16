import Head from 'next/head'
import { useState } from 'react'

export default function MarketingHome() {
  const [ideaInput, setIdeaInput] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const callGeminiAPI = async (prompt: string) => {
    setIsLoading(true)
    setAiOutput('')
    
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
        setAiOutput(result.candidates[0].content.parts[0].text)
      } else {
        setAiOutput('Could not retrieve a valid response from the AI.')
      }
    } catch (error) {
      setAiOutput('Sorry, we encountered an error. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const validateIdea = () => {
    if (!ideaInput.trim()) {
      setAiOutput('Please describe your idea in the text box first.')
      return
    }
    
    const prompt = `As a venture capital analyst, provide a brief, insightful analysis of the following business idea. Focus on potential strengths, weaknesses, and market opportunities. Keep the tone encouraging but realistic. Business Idea: "${ideaInput}"`
    callGeminiAPI(prompt)
  }

  return (
    <>
      <Head>
        <title>DreamAI - Build Dreams, Not Posts</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white font-inter">
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <section className="text-center mb-24 md:mb-32">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25"></div>
              <h2 className="relative text-white bg-gray-800 bg-opacity-60 py-2 px-4 rounded-lg text-sm md:text-base font-semibold tracking-wider">
                Build Dreams, Not Posts
              </h2>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mt-6 leading-tight max-w-4xl mx-auto">
              Turn Your Vision into Investor-Ready Ventures
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
              We combine AI-powered app generation with expert consulting to give your idea the best shot at success.
            </p>
          </section>

          {/* AI Toolkit Section */}
          <section className="mb-24 md:mb-32">
            <div className="bg-gray-800 bg-opacity-50 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-accent mb-4">Your AI-Powered Startup Toolkit</h2>
                <p className="text-lg text-gray-400">Describe your idea once, then let our AI analyze it, suggest names, create a plan, and write your pitch.</p>
              </div>
              <div className="max-w-3xl mx-auto">
                <textarea
                  className="w-full h-40 bg-gray-800 bg-opacity-60 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent focus:outline-none transition"
                  placeholder="E.g., 'A mobile app that uses AI to create personalized workout plans based on a user's fitness goals and available equipment.'"
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                />
                <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
                  <button
                    onClick={validateIdea}
                    className="bg-accent hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
                  >
                    ✨ Validate Idea
                  </button>
                </div>
                {(aiOutput || isLoading) && (
                  <div className="mt-8 p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-700 text-gray-300">
                    {isLoading ? 'Analyzing your idea...' : aiOutput}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 md:mb-32">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl text-center shadow-xl">
              <div className="w-16 h-16 mb-6 bg-indigo-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto border border-indigo-500 border-opacity-50">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Micro-apps in minutes</h3>
              <p className="text-gray-400">Generate functional prototypes and MVPs with our AI to validate your idea instantly.</p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl text-center shadow-xl">
              <div className="w-16 h-16 mb-6 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto border border-purple-500 border-opacity-50">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Consulting €9k Pack</h3>
              <p className="text-gray-400">Get access to our premium consulting package to refine your strategy and roadmap.</p>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl text-center shadow-xl">
              <div className="w-16 h-16 mb-6 bg-pink-500 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto border border-pink-500 border-opacity-50">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Invest-ready DCS Scores</h3>
              <p className="text-gray-400">Our proprietary Dream-Concept-Scale score helps you measure and present viability to investors.</p>
            </div>
          </section>

          {/* KPI Section */}
          <section className="mb-24 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trusted by the Ambitious</h2>
              <p className="text-lg text-gray-400">We're just getting started, but our impact is already being felt.</p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl font-extrabold text-accent mb-2">10,000+</p>
                <p className="text-lg text-gray-300">Active Users</p>
                <div className="mt-3 h-2 w-full bg-gray-700 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-accent mb-2">€1M</p>
                <p className="text-lg text-gray-300">Target MRR</p>
                <div className="mt-3 h-2 w-full bg-gray-700 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-accent mb-2">50+</p>
                <p className="text-lg text-gray-300">Grants Secured</p>
                <div className="mt-3 h-2 w-full bg-gray-700 rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gray-800 bg-opacity-50 rounded-2xl p-10 md:p-16 border border-gray-700 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Build Your Dream?</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Be the first to know when we launch. Get exclusive access, perks, and updates.</p>
            <button className="bg-accent hover:bg-opacity-80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Join the wait-list
            </button>
          </section>
        </div>
      </div>
    </>
  )
}