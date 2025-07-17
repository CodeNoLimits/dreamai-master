import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Configuration Firebase (utilise les mêmes variables que l'app)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

interface Task300 {
  id: string;
  day: number;
  phase: string;
  keyTasks: string;
  status: 'pending' | 'in_progress' | 'done';
  profitTarget: number;
  dueDate: string;
}

function parseCSV(csvContent: string): Task300[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      id: values[0],
      day: parseInt(values[1]),
      phase: values[2],
      keyTasks: values[3].replace(/\\n/g, '\n'),
      status: values[4] as 'pending' | 'in_progress' | 'done',
      profitTarget: parseInt(values[5]),
      dueDate: values[6]
    };
  });
}

async function importTasks() {
  console.log('🚀 Démarrage de l\'importation CSV...');
  
  // Pour la démo, on simule l'importation sans Firebase réel
  const csvPath = path.join(process.cwd(), 'data', 'dreamai_day_by_day_300.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ Fichier CSV non trouvé:', csvPath);
    return;
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const tasks = parseCSV(csvContent);
  
  console.log(`📊 ${tasks.length} tâches trouvées dans le CSV`);
  
  // Simulation de l'importation (sans Firebase réel)
  for (const task of tasks) {
    console.log(`✅ Importation simulée: ${task.id} - ${task.phase}`);
  }
  
  console.log('🎉 Importation terminée avec succès !');
  
  // Sauvegarder les données en JSON pour utilisation locale
  const jsonPath = path.join(process.cwd(), 'data', 'tasks300.json');
  fs.writeFileSync(jsonPath, JSON.stringify(tasks, null, 2));
  console.log(`💾 Données sauvegardées en JSON: ${jsonPath}`);
}

// Exécuter l'importation
importTasks().catch(console.error);

