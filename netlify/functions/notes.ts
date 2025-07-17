import { Handler } from '@netlify/functions';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
}

// Simulation d'une base de données en mémoire (pour la démo)
// En production, vous utiliseriez une vraie base de données comme Neon
let notes: Note[] = [
  {
    id: '1',
    title: 'Première note DreamAI',
    content: '# Vision DreamAI\n\nConstruire l\'infrastructure pour l\'avenir émotionnel et économique de l\'humanité.\n\n## Objectifs immédiats\n- Voice2Text Pro: €9.99/mois\n- Diagnostics B2B: €2-5k\n- Grant Israël: 31 juillet\n- Grant France: 15 septembre',
    createdAt: new Date().toISOString(),
    author: 'demo_user'
  }
];

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(notes),
        };

      case 'POST':
        const newNote: Note = JSON.parse(event.body || '{}');
        newNote.id = Date.now().toString();
        newNote.createdAt = new Date().toISOString();
        notes.push(newNote);
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newNote),
        };

      case 'PUT':
        const updatedNote: Note = JSON.parse(event.body || '{}');
        const index = notes.findIndex(note => note.id === updatedNote.id);
        
        if (index !== -1) {
          notes[index] = { ...notes[index], ...updatedNote };
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(notes[index]),
          };
        } else {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Note not found' }),
          };
        }

      case 'DELETE':
        const noteId = event.queryStringParameters?.id;
        if (noteId) {
          notes = notes.filter(note => note.id !== noteId);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Note deleted' }),
          };
        } else {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Note ID required' }),
          };
        }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

