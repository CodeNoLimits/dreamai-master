import { useCollection } from '../hooks/useFirestore'
import Head from 'next/head'
import { useState } from 'react'

export default function Tasks() {
  const { data: tasks, loading } = useCollection('tasks300')
  const [filter, setFilter] = useState('All')

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true
    if (filter === 'Completed') return task.status === 'completed'
    if (filter === 'Pending') return task.status === 'pending'
    if (filter === 'In Progress') return task.status === 'in_progress'
    return true
  })

  return (
    <>
      <Head>
        <title>Tasks - Dream AI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-accent mb-8">Tasks</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            {['All', 'Pending', 'In Progress', 'Completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  filter === filterOption
                    ? 'bg-accent text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          {/* Tasks Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="text-center py-16">Loading tasks...</div>
            ) : filteredTasks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Day</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phase</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Key Tasks</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profit Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{task.day}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{task.phase}</td>
                        <td className="px-6 py-4 text-sm text-gray-200 max-w-md">{task.keyTasks}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.status === 'completed' ? 'bg-green-600 text-white' :
                            task.status === 'in_progress' ? 'bg-yellow-600 text-white' :
                            'bg-blue-600 text-white'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                          €{task.profitTarget?.toLocaleString() || '0'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                No tasks found for this filter.
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-accent mb-4">Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Completed Tasks</span>
              <span className="text-white font-semibold">
                {tasks.filter(t => t.status === 'completed').length} / {tasks.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-accent h-4 rounded-full transition-all duration-300"
                style={{ 
                  width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}