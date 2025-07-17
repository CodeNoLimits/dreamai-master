import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface Note {
  id: string;
  title: string;
  content: string;      // markdown
  createdAt: string;    // ISO
  author: string;       // uid
}

const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : 'http://localhost:8888/.netlify/functions';

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await fetch(`${API_BASE}/notes`);
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        // Fallback to localStorage if API fails
        const storedNotes = localStorage.getItem('dreamai_notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notes:', error);
      // Fallback to localStorage
      const storedNotes = localStorage.getItem('dreamai_notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } finally {
      setLoading(false);
    }
  };

  const addNote = async () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: Omit<Note, 'id' | 'createdAt'> = {
        title: newNoteTitle,
        content: newNoteContent,
        author: 'demo_user_id',
      };

      try {
        const response = await fetch(`${API_BASE}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          const createdNote = await response.json();
          setNotes([...notes, createdNote]);
        } else {
          throw new Error('Failed to create note');
        }
      } catch (error) {
        console.error('Erreur lors de la création de la note:', error);
        // Fallback to localStorage
        const fallbackNote: Note = {
          ...newNote,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        setNotes([...notes, fallbackNote]);
        localStorage.setItem('dreamai_notes', JSON.stringify([...notes, fallbackNote]));
      }

      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/notes?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
      } else {
        throw new Error('Failed to delete note');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
      // Fallback to localStorage
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem('dreamai_notes', JSON.stringify(updatedNotes));
    }

    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(null);
    }
  };

  const updateNote = async () => {
    if (selectedNote && newNoteContent.trim()) {
      const updatedNote = {
        ...selectedNote,
        title: newNoteTitle,
        content: newNoteContent,
      };

      try {
        const response = await fetch(`${API_BASE}/notes`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNote),
        });

        if (response.ok) {
          const updated = await response.json();
          setNotes(notes.map(note => note.id === updated.id ? updated : note));
        } else {
          throw new Error('Failed to update note');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la note:', error);
        // Fallback to localStorage
        const updatedNotes = notes.map(note => note.id === selectedNote.id ? updatedNote : note);
        setNotes(updatedNotes);
        localStorage.setItem('dreamai_notes', JSON.stringify(updatedNotes));
      }

      setSelectedNote(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  const selectNoteForEdit = (note: Note) => {
    setSelectedNote(note);
    setNewNoteTitle(note.title);
    setNewNoteContent(note.content);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0f23]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="border-b border-slate-700 glass-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white float-element">Mission Control</h1>
              <nav className="flex space-x-4">
                <Link href="/app/dashboard" className="nav-link text-slate-300 hover:text-white">Dashboard</Link>
                <Link href="/app/tasks" className="nav-link text-slate-300 hover:text-white">Tasks</Link>
                <Link href="/app/notes" className="nav-link text-blue-400 font-medium active">Notes</Link>
                <Link href="/app/contacts" className="nav-link text-slate-300 hover:text-white">Contacts</Link>
              </nav>
            </div>
            <Link href="/summary" className="btn-primary text-white px-4 py-2 rounded-lg font-medium">
              Retour
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">Carnet de Notes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Note List */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Mes Notes</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {notes.length === 0 && !loading ? (
                <p className="text-slate-400">Aucune note pour le moment. Créez-en une !</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{note.title}</h4>
                      <p className="text-sm text-slate-400">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => selectNoteForEdit(note)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="glass-card rounded-xl p-6 notes-editor">
            <h3 className="text-xl font-bold text-white mb-4">{selectedNote ? "Éditer la Note" : "Nouvelle Note"}</h3>
            <input
              type="text"
              placeholder="Titre de la note"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 mb-4 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              placeholder="Contenu de la note (Markdown supporté)"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={10}
              className="w-full p-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 mb-4 border border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <div className="flex space-x-2">
              <button
                onClick={selectedNote ? updateNote : addNote}
                className="btn-primary text-white px-4 py-2 rounded-lg font-medium"
              >
                {selectedNote ? "Mettre à jour" : "Ajouter la note"}
              </button>
              {selectedNote && (
                <button
                  onClick={() => {
                    setSelectedNote(null);
                    setNewNoteTitle("");
                    setNewNoteContent("");
                  }}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Annuler
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Markdown Preview */}
        {newNoteContent && (
          <div className="glass-card rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Prévisualisation Markdown</h3>
            <div className="prose prose-invert max-w-none text-slate-300">
              <ReactMarkdown>{newNoteContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

