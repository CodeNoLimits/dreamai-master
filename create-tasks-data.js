// Créer un fichier JSON avec les données du roadmap
const fs = require('fs');
const csv = require('csv-parser');

const roadmapData = [];

fs.createReadStream('/Users/codenolimits-dreamai-nanach/dreamai-master/00-VISION/300-days-roadmap.csv')
  .pipe(csv())
  .on('data', (row) => {
    const task = {
      id: `task-${row.Day}`,
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
      status: (parseInt(row.Day) <= 17) ? 'completed' : 'pending',
      profitTarget: parseInt(row.Revenue_Target) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    roadmapData.push(task);
  })
  .on('end', () => {
    // Écrire le fichier JSON
    fs.writeFileSync(
      '/Users/codenolimits-dreamai-nanach/dream-dashboard/data/tasks300.json',
      JSON.stringify(roadmapData, null, 2)
    );
    
    console.log('✅ Tasks data created successfully!');
    console.log(`📊 Total tasks: ${roadmapData.length}`);
    console.log(`✅ Completed tasks: ${roadmapData.filter(t => t.status === 'completed').length}`);
    console.log(`⏳ Pending tasks: ${roadmapData.filter(t => t.status === 'pending').length}`);
    console.log(`💰 Current MRR target: €${roadmapData.find(t => t.day === 17)?.mrr || 0}`);
    
    process.exit(0);
  });