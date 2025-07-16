import { useCollection } from '../hooks/useFirestore'
import Head from 'next/head'
import { useState } from 'react'

export default function Notes() {
  const { data: notes, loading } = useCollection('notes')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Notes - Dream AI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-accent">Notes</h1>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              New Note
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Notes Grid */}
          {loading ? (
            <div className="text-center py-16">Loading notes...</div>
          ) : filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div key={note.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3">{note.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-4">{note.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-accent hover:text-white transition-colors">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
              </div>
              {!searchTerm && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                >
                  Create Note
                </button>
              )}
            </div>
          )}

          {/* Create Note Modal */}
          {isCreating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-accent mb-4">Create New Note</h2>
                <input
                  type="text"
                  placeholder="Note title..."
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <textarea
                  placeholder="Write your note here..."
                  rows={10}
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 rounded-lg bg-accent text-white hover:bg-opacity-80 transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}