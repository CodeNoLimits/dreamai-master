// Import script pour le roadmap 300 jours
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, deleteDoc } = require('firebase/firestore');
const fs = require('fs');
const csv = require('csv-parser');

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjxhpjcVPz_7jqo5e-bQzOkCqmqOEfDk8",
  authDomain: "dreamai-master.firebaseapp.com",
  projectId: "dreamai-master",
  storageBucket: "dreamai-master.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importRoadmap() {
  console.log('🚀 Importing DreamAI 300 Days Roadmap...');
  
  // Lire le CSV
  const roadmapData = [];
  
  fs.createReadStream('/Users/codenolimits-dreamai-nanach/dreamai-master/00-VISION/300-days-roadmap.csv')
    .pipe(csv())
    .on('data', (row) => {
      // Transformer les données CSV en format Firestore
      const task = {
        day: parseInt(row.Day) || 0,
        phase: row.Phase || 'Unknown',
        focus: row.Focus || '',
        keyTasks: row.Tasks || '',
        revenueTarget: parseInt(row.Revenue_Target) || 0,
        revenueActual: parseInt(row.Revenue_Actual) || 0,
        users: parseInt(row.Users) || 0,
        mrr: parseInt(row.MRR) || 0,
        keyMetric: row.Key_Metric || '',
        innovation: row.Innovation || '',
        competitionUpdate: row.Competition_Update || '',
        automation: row.n8n_Automation || '',
        comments: row.Comments || '',
        status: (parseInt(row.Day) <= 17) ? 'completed' : 'pending', // Jours passés = completed
        profitTarget: parseInt(row.Revenue_Target) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      roadmapData.push(task);
    })
    .on('end', async () => {
      try {
        // Nettoyer la collection existante
        console.log('🧹 Cleaning existing tasks...');
        const existingTasks = await getDocs(collection(db, 'tasks300'));
        const deletePromises = existingTasks.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        
        // Importer les nouvelles données
        console.log(`📊 Importing ${roadmapData.length} tasks...`);
        const importPromises = roadmapData.map(task => 
          addDoc(collection(db, 'tasks300'), task)
        );
        
        await Promise.all(importPromises);
        
        console.log('✅ Import completed successfully!');
        console.log(`📈 Total tasks: ${roadmapData.length}`);
        console.log(`✅ Completed tasks: ${roadmapData.filter(t => t.status === 'completed').length}`);
        console.log(`⏳ Pending tasks: ${roadmapData.filter(t => t.status === 'pending').length}`);
        console.log(`💰 Current MRR target: €${roadmapData.find(t => t.day === 17)?.mrr || 0}`);
        
        process.exit(0);
      } catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
      }
    });
}

importRoadmap();