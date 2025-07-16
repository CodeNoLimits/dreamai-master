import { useCollection } from '../hooks/useFirestore'
import Head from 'next/head'
import { useState } from 'react'

export default function Contacts() {
  const { data: contacts, loading } = useCollection('contacts')
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Contacts - Dream AI</title>
      </Head>
      
      <div className="min-h-screen bg-primary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-accent">Contacts</h1>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
            >
              Add Contact
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Contacts Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {loading ? (
              <div className="text-center py-16">Loading contacts...</div>
            ) : filteredContacts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Organization</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{contact.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{contact.org}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{contact.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{contact.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            contact.type === 'investor' ? 'bg-green-600 text-white' :
                            contact.type === 'partner' ? 'bg-blue-600 text-white' :
                            'bg-purple-600 text-white'
                          }`}>
                            {contact.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-accent hover:text-white transition-colors">
                              Edit
                            </button>
                            <button className="text-red-400 hover:text-red-300 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet. Add your first contact!'}
                </div>
                {!searchTerm && (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                  >
                    Add Contact
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Create Contact Modal */}
          {isCreating && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-accent mb-4">Add New Contact</h2>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="text"
                  placeholder="Organization"
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <select className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="client">Client</option>
                  <option value="investor">Investor</option>
                  <option value="partner">Partner</option>
                </select>
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
                    Add Contact
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