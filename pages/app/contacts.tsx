import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Contact {
  id: string;
  name: string;
  org: string;
  email: string;
  phone: string;
  tag: 'investor' | 'grant' | 'partner';
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pour la démo, on utilise des données statiques
    const staticContacts: Contact[] = [
      {
        id: '1',
        name: 'Ariel',
        org: 'DreamAI France',
        email: 'ariel@dreamai.fr',
        phone: '+33 6 12 34 56 78',
        tag: 'partner',
      },
      {
        id: '2',
        name: 'OurCrowd',
        org: 'OurCrowd Ventures',
        email: 'info@ourcrowd.com',
        phone: '+972 2 632 3000',
        tag: 'investor',
      },
      {
        id: '3',
        name: 'Innovation Authority',
        org: 'Israel Innovation Authority',
        email: 'grants@innovationisrael.org.il',
        phone: '+972 3 760 6000',
        tag: 'grant',
      },
      {
        id: '4',
        name: 'Bpifrance',
        org: 'Bpifrance',
        email: 'contact@bpifrance.fr',
        phone: '+33 1 41 79 80 00',
        tag: 'grant',
      },
    ];
    setContacts(staticContacts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0f23] via-[#1a1d3a] to-[#0d0f23]">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white">Mission Control</h1>
              <nav className="flex space-x-4">
                <Link href="/app/dashboard" className="text-slate-300 hover:text-white">Dashboard</Link>
                <Link href="/app/tasks" className="text-slate-300 hover:text-white">Tasks</Link>
                <Link href="/app/notes" className="text-slate-300 hover:text-white">Notes</Link>
                <Link href="/app/contacts" className="text-blue-400 font-medium">Contacts</Link>
              </nav>
            </div>
            <Link href="/summary" className="text-slate-300 hover:text-white">
              Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Carnet de Contacts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">{contact.name}</h3>
              <p className="text-slate-400 mb-1">{contact.org}</p>
              <div className="flex items-center space-x-2 text-slate-300 mb-2">
                <span className="text-blue-400">📧</span>
                <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 mb-4">
                <span className="text-green-400">📞</span>
                <button onClick={() => navigator.clipboard.writeText(contact.phone)} className="hover:underline">
                  {contact.phone} (cliquer pour copier)
                </button>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                contact.tag === 'investor' ? 'bg-purple-500/20 text-purple-400' :
                contact.tag === 'grant' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {contact.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

