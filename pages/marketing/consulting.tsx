import Head from 'next/head'
import { useState } from 'react'

export default function Consulting() {
  const [loadingStates, setLoadingStates] = useState({
    ideas: false,
    useCases: false,
    term: false,
    strategy: false
  })
  
  const [outputs, setOutputs] = useState({
    ideas: '',
    useCases: '',
    term: '',
    strategy: ''
  })

  const callGeminiAPI = async (prompt: string, type: string) => {
    setLoadingStates(prev => ({ ...prev, [type]: true }))
    setOutputs(prev => ({ ...prev, [type]: '' }))
    
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
        setOutputs(prev => ({ ...prev, [type]: result.candidates[0].content.parts[0].text }))
      } else {
        setOutputs(prev => ({ ...prev, [type]: 'Could not generate response. Please try again.' }))
      }
    } catch (error) {
      setOutputs(prev => ({ ...prev, [type]: 'Error occurred. Please try again later.' }))
    } finally {
      setLoadingStates(prev => ({ ...prev, [type]: false }))
    }
  }

  const generateIdeas = () => {
    const input = (document.getElementById('challengeInput') as HTMLTextAreaElement).value.trim()
    if (!input) return
    
    const prompt = `Given the business challenge: "${input}", suggest 3-5 innovative AI project ideas that could help address this challenge. For each idea, provide a brief description and potential benefits. Format your response as a clear, readable list.`
    callGeminiAPI(prompt, 'ideas')
  }

  const generateUseCases = () => {
    const input = (document.getElementById('useCaseAreaInput') as HTMLTextAreaElement).value.trim()
    if (!input) return
    
    const prompt = `Suggest 5-7 specific and innovative AI use cases for the following area or industry: "${input}". For each use case, provide a brief description and explain its potential impact. Format your response as a clear, readable list.`
    callGeminiAPI(prompt, 'useCases')
  }

  const explainTerm = () => {
    const input = (document.getElementById('termInput') as HTMLInputElement).value.trim()
    if (!input) return
    
    const prompt = `Provide a concise and easy-to-understand explanation for the AI term: "${input}". Focus on clarity and brevity, suitable for a business audience.`
    callGeminiAPI(prompt, 'term')
  }

  const brainstormStrategy = () => {
    const input = (document.getElementById('goalInput') as HTMLTextAreaElement).value.trim()
    if (!input) return
    
    const prompt = `Given the business goal: "${input}", suggest 3-5 high-level AI-driven strategies or approaches that could help achieve this goal. For each strategy, provide a brief explanation of how AI would be leveraged. Format your response as a clear, readable list.`
    callGeminiAPI(prompt, 'strategy')
  }

  return (
    <>
      <Head>
        <title>DreamAI Consulting - Unlock AI in 4 weeks</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center py-16 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50 mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent mb-4 leading-tight">
              DreamAI Consulting
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300">
              Unlock AI in 4 weeks
            </p>
          </section>

          {/* Offer Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-3xl font-bold text-accent mb-4">Pack Acculturation IA</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Audit 360°</li>
                <li>Workshop 2 jours</li>
                <li>MVP prototype</li>
              </ul>
              <div className="text-right">
                <p className="text-4xl font-extrabold text-white">€9 000</p>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-3xl font-bold text-accent mb-4">Diag IA Bpifrance</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>50 % subvention</li>
                <li>Diag livrable</li>
              </ul>
              <div className="text-right">
                <p className="text-4xl font-extrabold text-white">€3 000 net</p>
              </div>
            </div>
          </section>

          {/* AI Tools Sections */}
          <div className="space-y-12">
            {/* AI Project Idea Generator */}
            <section className="text-center py-12 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50">
              <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-8">✨ AI Project Idea Generator ✨</h2>
              <p className="text-gray-300 mb-6">Describe a business challenge or area you'd like to improve, and let AI suggest project ideas.</p>
              <textarea
                id="challengeInput"
                className="w-full h-32 p-4 mb-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                placeholder="e.g., 'Our customer support is overwhelmed with common queries.' or 'We need to better predict sales trends.'"
              />
              <button
                onClick={generateIdeas}
                className="bg-accent text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-80 transition-colors"
                disabled={loadingStates.ideas}
              >
                {loadingStates.ideas ? 'Generating...' : 'Generate AI Ideas'}
              </button>
              {outputs.ideas && (
                <div className="mt-8 text-left p-6 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap">
                  {outputs.ideas}
                </div>
              )}
            </section>

            {/* AI Use Case Expander */}
            <section className="text-center py-12 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50">
              <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-8">✨ AI Use Case Expander ✨</h2>
              <p className="text-gray-300 mb-6">Enter a general area or industry, and AI will suggest specific use cases.</p>
              <textarea
                id="useCaseAreaInput"
                className="w-full h-24 p-4 mb-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                placeholder="e.g., 'Healthcare', 'Retail', 'Supply Chain', 'Customer Service'"
              />
              <button
                onClick={generateUseCases}
                className="bg-accent text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-80 transition-colors"
                disabled={loadingStates.useCases}
              >
                {loadingStates.useCases ? 'Generating...' : 'Generate Use Cases'}
              </button>
              {outputs.useCases && (
                <div className="mt-8 text-left p-6 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap">
                  {outputs.useCases}
                </div>
              )}
            </section>

            {/* AI Terminology Explainer */}
            <section className="text-center py-12 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50">
              <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-8">✨ AI Terminology Explainer ✨</h2>
              <p className="text-gray-300 mb-6">Enter an AI-related term to get a clear explanation.</p>
              <input
                type="text"
                id="termInput"
                className="w-full p-4 mb-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="e.g., 'Machine Learning', 'Neural Network', 'Generative AI'"
              />
              <button
                onClick={explainTerm}
                className="bg-accent text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-80 transition-colors"
                disabled={loadingStates.term}
              >
                {loadingStates.term ? 'Explaining...' : 'Explain Term'}
              </button>
              {outputs.term && (
                <div className="mt-8 text-left p-6 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap">
                  {outputs.term}
                </div>
              )}
            </section>

            {/* AI Strategy Brainstormer */}
            <section className="text-center py-12 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50">
              <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-8">✨ AI Strategy Brainstormer ✨</h2>
              <p className="text-gray-300 mb-6">Enter a business goal, and AI will suggest strategic approaches.</p>
              <textarea
                id="goalInput"
                className="w-full h-24 p-4 mb-6 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                placeholder="e.g., 'Increase customer retention by 15%', 'Optimize logistics and delivery times', 'Reduce operational costs in manufacturing'"
              />
              <button
                onClick={brainstormStrategy}
                className="bg-accent text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-80 transition-colors"
                disabled={loadingStates.strategy}
              >
                {loadingStates.strategy ? 'Brainstorming...' : 'Brainstorm Strategies'}
              </button>
              {outputs.strategy && (
                <div className="mt-8 text-left p-6 bg-gray-700 rounded-lg border border-gray-600 whitespace-pre-wrap">
                  {outputs.strategy}
                </div>
              )}
            </section>
          </div>

          {/* Proof Section */}
          <section className="text-center py-12 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50 mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-8">Trusted by</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              <div className="h-12 sm:h-16 px-6 bg-accent bg-opacity-20 rounded-md flex items-center justify-center">
                <span className="text-accent font-bold">Bpifrance</span>
              </div>
              <div className="h-12 sm:h-16 px-6 bg-accent bg-opacity-20 rounded-md flex items-center justify-center">
                <span className="text-accent font-bold">Hub France IA</span>
              </div>
              <div className="h-12 sm:h-16 px-6 bg-accent bg-opacity-20 rounded-md flex items-center justify-center">
                <span className="text-accent font-bold">Innovation Authority</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 px-4 rounded-xl shadow-lg bg-gray-800 bg-opacity-50 mt-16">
            <button className="bg-accent text-white font-bold py-4 px-8 rounded-full text-lg sm:text-xl shadow-lg hover:bg-opacity-80 transition-colors">
              Book a call
            </button>
          </section>
        </div>
      </div>
    </>
  )
}