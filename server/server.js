import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all projects
app.get('/api/projects', async (req, res) => {
  await db.read();
  res.json(db.data.projects);
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  await db.read();
  const project = db.data.projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

// Add new project
app.post('/api/projects', async (req, res) => {
  await db.read();
  const newProject = {
    id: Date.now(),
    ...req.body
  };
  db.data.projects.push(newProject);
  await db.write();
  res.json(newProject);
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
  await db.read();
  const project = db.data.projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Not found' });
  Object.assign(project, req.body);
  await db.write();
  res.json(project);
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  await db.read();
  db.data.projects = db.data.projects.filter(p => p.id !== parseInt(req.params.id));
  await db.write();
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
