import fs from 'fs';
import path from 'path';

interface Task300 {
  id: string;
  day: number;
  phase: string;
  keyTasks: string;
  status: 'pending' | 'in_progress' | 'done';
  profitTarget: number;
  dueDate: string;
}

const tasksFilePath = path.join(__dirname, '../data/tasks300.json');

const simulateProgress = (currentDay: number) => {
  try {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf-8');
    let tasks: Task300[] = JSON.parse(tasksData);

    tasks = tasks.map(task => {
      if (task.day <= currentDay) {
        return { ...task, status: 'done' };
      } else if (task.day === currentDay + 1) {
        return { ...task, status: 'in_progress' };
      } else {
        return { ...task, status: 'pending' };
      }
    });

    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log(`Progression simulée jusqu'au jour ${currentDay}.`);
  } catch (error) {
    console.error('Erreur lors de la simulation de la progression:', error);
  }
};

// Exemple d'utilisation: simuler la progression jusqu'au jour 150
simulateProgress(150);


