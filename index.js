const express = require('express');
const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

const port = 3000;

const tasks = [];
const tempTask = {
  name: 'abc',
  id: 0,
  isComplete: true,
};
tasks.push(tempTask);
let index = 0;

app.listen(port, () => {
  console.log('Listening on port 3000...');
});

// GET methods

app.get('/tasks', (req, res) => {
  console.log('Get all tasks');
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  console.log('Get task by id');
  const { id } = req.params;
  const requiredTaskIndex = tasks.findIndex((task) => task.id === Number(id));
  if (requiredTaskIndex === -1) {
    res.status(404).send('Task Not Found').end();
  }
  res.status(200).send(tasks[requiredTaskIndex]);
});

// POST methods

app.post('/tasks', (req, res) => {
  console.log('Post a task');
  index += 1;
  const newTask = {
    ...req.body,
    id: index,
    isComplete: false,
  };
  tasks.push(newTask);
  res.status(201).json(tasks);
});

// PUT methods

app.put('/tasks', (req, res) => {
  console.log('Updating entire task');
  const { id, name, isComplete } = req.body;
  const requiredTaskIndex = tasks.findIndex((task) => task.id === Number(id));
  if (requiredTaskIndex === -1) {
    res.status(404).send('Task not found');
  }
  tasks[requiredTaskIndex]['name'] = name;
  tasks[requiredTaskIndex]['isComplete'] = isComplete;

  res.status(200).json(tasks[requiredTaskIndex]).end();
});

// DELETE methods

app.delete('/tasks/:id', (req, res) => {
  console.log('Deleting single task');
  const { id } = req.params;
  const requiredTaskIndex = tasks.findIndex((task) => task.id === Number(id));
  console.log(requiredTaskIndex);
  if (requiredTaskIndex === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks.splice(requiredTaskIndex, 1);
    res.status(200).json(tasks).end();
  }
});
  
// PATCH methods
  
app.patch('/tasks/:id', (req, res) => {
  console.log('Patching a task');
  const {id} = req.params;
  const requiredTaskIndex = tasks.findIndex(task => task.id === Number(id));
  if(requiredTaskIndex === -1 ){
    res.status(200);
  }
});
