import { useState, useEffect } from 'react'
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore'
import { db } from '../pages/_app'

export const useCollection = (collectionName: string) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const q = query(collection(db, collectionName))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setData(docs)
        setLoading(false)
      }, (err) => {
        setError(err.message)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }, [collectionName])

  return { data, loading, error }
}

export const useDocument = (documentPath: string) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, documentPath)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() })
        } else {
          setData(null)
        }
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchDoc()
  }, [documentPath])

  return { data, loading, error }
}

// Helper function to get current day from config
export const getCurrentDay = () => {
  const { data } = useDocument('config/today')
  return data?.currentDay || 1
}

// Helper function to get week tasks
export const getWeekTasks = (tasks: any[]) => {
  const currentDay = getCurrentDay()
  return tasks.filter(task => task.day >= currentDay && task.day <= currentDay + 7)
}

// Helper function to calculate month profit
export const getMonthProfit = (tasks: any[]) => {
  const currentDay = getCurrentDay()
  const monthTasks = tasks.filter(task => task.day >= currentDay && task.day <= currentDay + 30)
  return monthTasks.reduce((total, task) => total + (task.profitTarget || 0), 0)
}