const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, 'tasks.json');

function readTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
  }

  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
})

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now(),
    title
  };

  tasks.push(newTask);
  writeTasks(newTask);

  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.title = title;
  writeTasks(tasks);

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  let tasks = readTasks();
  const exists = tasks.some(t => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks = tasks.filter(t => t.id !== id);
  writeTasks(tasks);

  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});