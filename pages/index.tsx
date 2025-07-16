import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to marketing home
    router.push('/marketing/home')
  }, [router])

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-white text-xl">Redirecting to home...</div>
    </div>
  )
}