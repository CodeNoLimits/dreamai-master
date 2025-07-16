import Head from 'next/head'
import { useState } from 'react'

export default function Investors() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [showModal, setShowModal] = useState(false)

  const callGeminiAPI = async (prompt: string, title: string) => {
    setIsGenerating(true)
    setCurrentAnalysis(title)
    setAiOutput('')
    setShowModal(true)
    
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
        setAiOutput('Failed to generate analysis. Please try again.')
      }
    } catch (error) {
      setAiOutput('Error occurred while generating analysis. Please try again later.')
    } finally {
      setIsGenerating(false)
    }
  }

  const companyData = {
    description: "We are building a future where visionaries are empowered by community and empathy. Join us in a new model of value creation.",
    metrics: "DCS 88+ dreamers, VELA empathy ≥ 0.7 score, User < 5% Churn",
    roadmap: "Alpha Q3 2025, Seed Q1 2026, Series A Q3 2026"
  }

  const analyses = {
    thesis: `As an expert venture capital analyst, generate a concise and compelling investment thesis for a startup with the following profile. The thesis should be bullish and highlight the key strengths and market potential. Structure it with a clear heading and a few bullet points. Company Description: "${companyData.description}" Key Metrics: ${companyData.metrics} Funding Roadmap: ${companyData.roadmap}`,
    
    risks: `As a venture capital risk analyst, identify the top 3-5 potential risks for the following startup. The analysis should be objective and realistic. Structure it with a clear heading, and for each risk, provide a category and a brief explanation. Company Description: "${companyData.description}" Key Metrics: ${companyData.metrics} Funding Roadmap: ${companyData.roadmap}`,
    
    competitors: `As a market research analyst, identify 3-4 potential direct or indirect competitors for the startup described below. For each competitor, briefly describe their focus. Then, add a "Key Differentiator" point for our startup against them. Company Description: "${companyData.description}" Key Metrics: ${companyData.metrics} Funding Roadmap: ${companyData.roadmap}`,
    
    market: `As a market sizing expert, provide a high-level, estimated TAM, SAM, and SOM for the following startup. Provide a brief justification for each estimate. Acknowledge that this is an AI-generated estimate. Company Description: "${companyData.description}" Key Metrics: ${companyData.metrics} Funding Roadmap: ${companyData.roadmap}`,
    
    exit: `As an investment banker specializing in tech M&A, analyze the potential exit strategies for the startup below. Identify 2-3 likely exit paths and name 1-2 hypothetical acquirers with brief justification. Company Description: "${companyData.description}" Key Metrics: ${companyData.metrics} Funding Roadmap: ${companyData.roadmap}`
  }

  return (
    <>
      <Head>
        <title>Invest in Purpose - DreamAI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <section className="text-center py-20">
            <span className="text-lg font-semibold text-accent">See traction before funding</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-8 leading-tight">
              Invest in Purpose
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              We are building a future where visionaries are empowered by community and empathy. Join us in a new model of value creation.
            </p>
          </section>

          {/* Metrics Section */}
          <section className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <p className="text-lg text-gray-400 mb-2">DCS</p>
                <span className="text-5xl md:text-6xl font-bold text-accent">88+</span>
                <p className="text-xl font-medium text-white mt-2">dreamers</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <p className="text-lg text-gray-400 mb-2">VELA empathy</p>
                <span className="text-5xl md:text-6xl font-bold text-accent">≥ 0.7</span>
                <p className="text-xl font-medium text-white mt-2">score</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <p className="text-lg text-gray-400 mb-2">User</p>
                <span className="text-5xl md:text-6xl font-bold text-accent">&lt; 5%</span>
                <p className="text-xl font-medium text-white mt-2">Churn</p>
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="py-20">
            <h2 className="text-4xl font-bold text-center text-white mb-16">Our Funding Roadmap</h2>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 h-full w-1 bg-accent bg-opacity-30 rounded-full transform -translate-x-1/2"></div>
              <div className="space-y-16">
                {[
                  { phase: 'Alpha', date: 'Q3 2025', side: 'left' },
                  { phase: 'Seed', date: 'Q1 2026', side: 'right' },
                  { phase: 'Series A', date: 'Q3 2026', side: 'left' }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    {item.side === 'left' && (
                      <div className="w-1/2 pr-8 text-right">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                          <p className="text-2xl font-bold text-white">{item.phase}</p>
                          <p className="text-lg font-medium text-accent">{item.date}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent rounded-full border-4 border-primary"></div>
                    {item.side === 'right' && (
                      <div className="w-1/2 pl-8 text-left ml-auto">
                        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700">
                          <p className="text-2xl font-bold text-white">{item.phase}</p>
                          <p className="text-lg font-medium text-accent">{item.date}</p>
                        </div>
                      </div>
                    )}
                    {item.side === 'left' && <div className="w-1/2"></div>}
                    {item.side === 'right' && <div className="w-1/2"></div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Insights Section */}
          <section className="text-center py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">AI-Powered Venture Analysis Suite</h2>
            <p className="max-w-3xl mx-auto text-gray-400 mb-10">
              Leverage AI to instantly analyze our venture from every angle. Generate a thesis, analyze risks, competitors, market size, GTM strategies, exit potential, or even draft a press release for our next round.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
              <button
                onClick={() => callGeminiAPI(analyses.thesis, 'Investment Thesis')}
                className="bg-accent text-white font-bold py-3 px-5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-opacity-80 shadow-lg"
              >
                ✨ Generate Thesis
              </button>
              <button
                onClick={() => callGeminiAPI(analyses.risks, 'Risk Analysis')}
                className="bg-gray-800 bg-opacity-50 text-white font-bold py-3 px-5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-opacity-70"
              >
                ✨ Analyze Risks
              </button>
              <button
                onClick={() => callGeminiAPI(analyses.competitors, 'Competitor Analysis')}
                className="bg-gray-800 bg-opacity-50 text-white font-bold py-3 px-5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-opacity-70"
              >
                ✨ Analyze Competitors
              </button>
              <button
                onClick={() => callGeminiAPI(analyses.market, 'Market Size Analysis')}
                className="bg-gray-800 bg-opacity-50 text-white font-bold py-3 px-5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-opacity-70"
              >
                ✨ Estimate Market
              </button>
              <button
                onClick={() => callGeminiAPI(analyses.exit, 'Exit Strategy Analysis')}
                className="bg-gray-800 bg-opacity-50 text-white font-bold py-3 px-5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-opacity-70"
              >
                ✨ Analyze Exit
              </button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join Our Journey?</h2>
            <p className="max-w-xl mx-auto text-gray-400 mb-10">Get exclusive access to our investor deck and learn more about the market, our model, and the team.</p>
            <button className="bg-accent text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:bg-opacity-80 shadow-lg">
              Request Deck
            </button>
          </section>
        </div>

        {/* AI Analysis Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 bg-opacity-95 rounded-xl p-6 sm:p-8 w-full max-w-3xl shadow-2xl border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-accent">{currentAnalysis}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {isGenerating ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                  <p className="ml-4 text-gray-300">Generating analysis...</p>
                </div>
              ) : (
                <div className="bg-gray-700 p-6 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-gray-200 text-sm">{aiOutput}</pre>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-full text-lg font-semibold bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}