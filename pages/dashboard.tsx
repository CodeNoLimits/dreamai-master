import { useCollection, useDocument, getCurrentDay, getWeekTasks, getMonthProfit } from '../hooks/useFirestore'
import Head from 'next/head'

export default function Dashboard() {
  const { data: tasks, loading: tasksLoading } = useCollection('tasks300')
  const { data: notes, loading: notesLoading } = useCollection('notes')
  const { data: contacts, loading: contactsLoading } = useCollection('contacts')
  const { data: config } = useDocument('config/today')

  const currentDay = config?.currentDay || 1
  const weekTasks = getWeekTasks(tasks)
  const monthProfit = getMonthProfit(tasks)

  return (
    <>
      <Head>
        <title>Dashboard - Dream AI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-accent mb-8">Dashboard</h1>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-accent text-2xl">📅</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">Day {currentDay}</div>
                  <div className="text-gray-400">/ 300</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Today</h3>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-accent text-2xl">✅</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{weekTasks.length}</div>
                  <div className="text-gray-400">open</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold">This-week Tasks</h3>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-accent text-2xl">💶</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">€{monthProfit.toLocaleString()}</div>
                  <div className="text-gray-400">target</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold">This-month Profit</h3>
            </div>
          </div>

          {/* Timeline and Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 7-day glance */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-accent mb-6">7-day glance</h2>
              {tasksLoading ? (
                <div className="text-center py-8">Loading tasks...</div>
              ) : weekTasks.length > 0 ? (
                <div className="space-y-4">
                  {weekTasks.slice(0, 5).map((task, index) => (
                    <div key={task.id} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-semibold">Day {task.day}</div>
                        <div className="text-sm text-gray-400">{task.keyTasks}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No tasks yet</div>
              )}
              <div className="mt-4 text-sm text-gray-500 italic">
                /* map tasks300 where due&lt;=7 */
              </div>
            </div>

            {/* Latest Notes */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-accent mb-6">Latest Notes</h2>
              {notesLoading ? (
                <div className="text-center py-8">Loading notes...</div>
              ) : notes.length > 0 ? (
                <div className="space-y-4">
                  {notes.slice(0, 3).map((note) => (
                    <div key={note.id} className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="font-semibold text-white mb-2">{note.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{note.content}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">No notes yet</div>
              )}
              <div className="mt-4 text-sm text-gray-500 italic">
                /* latest notes collection */
              </div>
              <button className="mt-4 w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">
                View All Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}