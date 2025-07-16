import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Navbar Component
const Navbar = () => {
  const router = useRouter()
  const { pathname } = router

  // Check if we're on internal dashboard pages
  const isInternalPage = pathname.startsWith('/dashboard') || 
                         pathname.startsWith('/tasks') || 
                         pathname.startsWith('/notes') || 
                         pathname.startsWith('/contacts')

  if (isInternalPage) {
    // Internal navbar for dashboard
    return (
      <nav className="bg-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-accent">Dream AI Dashboard</div>
          <div className="flex space-x-6">
            <a href="/dashboard" className={`hover:text-accent transition-colors ${pathname === '/dashboard' ? 'text-accent' : ''}`}>
              Dashboard
            </a>
            <a href="/tasks" className={`hover:text-accent transition-colors ${pathname === '/tasks' ? 'text-accent' : ''}`}>
              Tasks
            </a>
            <a href="/notes" className={`hover:text-accent transition-colors ${pathname === '/notes' ? 'text-accent' : ''}`}>
              Notes
            </a>
            <a href="/contacts" className={`hover:text-accent transition-colors ${pathname === '/contacts' ? 'text-accent' : ''}`}>
              Contacts
            </a>
          </div>
        </div>
      </nav>
    )
  } else {
    // Public navbar for marketing pages
    return (
      <nav className="bg-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-accent">DreamAI</div>
          <div className="flex space-x-6">
            <a href="/" className={`hover:text-accent transition-colors ${pathname === '/' ? 'text-accent' : ''}`}>
              Home
            </a>
            <a href="/marketing/micro-apps" className={`hover:text-accent transition-colors ${pathname === '/marketing/micro-apps' ? 'text-accent' : ''}`}>
              Micro-Apps
            </a>
            <a href="/marketing/consulting" className={`hover:text-accent transition-colors ${pathname === '/marketing/consulting' ? 'text-accent' : ''}`}>
              Consulting
            </a>
            <a href="/marketing/investors" className={`hover:text-accent transition-colors ${pathname === '/marketing/investors' ? 'text-accent' : ''}`}>
              Investors
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}