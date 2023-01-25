const { urlencoded, json } = require('express');
const express = require('express');
const app = express();
const port = 3000;

const tasks=[];
const tempTask={
  'name':'abc',
  'id':0,
  'isComplete':true
};
tasks.push(tempTask);
let index=0;
app.listen(port,()=>{
  console.log('Listening on port 3000...');
});

// GET methods

app.get('/tasks',(req,res)=>{
  console.log('Get all tasks');
  res.status(200);
  res.json(tasks);
});
app.get('/tasks/:id',(req,res)=>{
  console.log('Get by id');
  const requiredTaskIndex = tasks.findIndex(task => task.id === Number(req.params.id));
  if(requiredTaskIndex===-1)
  {
    res.status(404);
    res.send('Task not found');
  } 
  res.status(200);
  res.json(tasks[requiredTaskIndex]);
});


