const fs = require('fs');

function getAllTasksService(req, res) {
  const todoList = fs.readFileSync('./todoList.json', 'utf-8');
  res.json(JSON.parse(todoList));
}

function createTaskService(req, res) {
    
  const todoList = fs.readFileSync('./todoList.json', 'utf-8');
  
  const tasks = JSON.parse(todoList);
  
  const newTask = req.body;
  
  const bodyKeysSchema = [
    'title',
    'description',
    'completed',
    'priority',
    'dueDate',
  ];

const bodykeys = Object.keys(newTask);

  
const isValid = bodyKeysSchema.every((key) => bodykeys.includes(key));
  
if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body. Please provide all required fields.',
      requiredFields: bodyKeysSchema,
      providedFields: bodykeys,
    });
}


const maxOldId = Math.max(...tasks.map((task) => task.id), 0); 
newTask.id = maxOldId + 1;
  
tasks.push(newTask);

fs.writeFileSync('./todoList.json', JSON.stringify(tasks, null, 2), 'utf-8');
res.status(201).json({
    success: true,
    message: 'Task created successfully',
    task: newTask,
  });
}

function getOneTaskService(req, res) {
  const todoList = fs.readFileSync('./todoList.json', 'utf-8');
  const taskId = parseInt(req.params.taskId, 10); 

if (isNaN(taskId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID',
    });
}

const tasks = JSON.parse(todoList);
const task = tasks.find((t) => t.id === taskId); 

if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
}

res.json({
    success: true,
    task,
  });
}

function updateTaskService(req, res) {
  const todoList = fs.readFileSync('./todoList.json', 'utf-8');
  const tasks = JSON.parse(todoList);
  const taskId = parseInt(req.params.taskId, 10); 

  if (isNaN(taskId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID',
    });
  }

  const taskIndex = tasks.findIndex((t) => t.id === taskId); 

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  const updatedTask = { ...tasks[taskIndex], ...req.body }; 
  tasks[taskIndex] = updatedTask;
  fs.writeFileSync('./todoList.json', JSON.stringify(tasks, null, 2), 'utf-8');
  res.json({
    success: true,
    message: 'Task updated successfully',
    task: updatedTask,
  });
}

function deleteTaskService(req, res) {
  const todoList = fs.readFileSync('./todoList.json', 'utf-8');
  const tasks = JSON.parse(todoList);
  const taskId = parseInt(req.params.taskId, 10); 
  if (isNaN(taskId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID',
    });
  }

  const taskIndex = tasks.findIndex((t) => t.id === taskId); 

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
    });
  }

  tasks.splice(taskIndex, 1);

  fs.writeFileSync('./todoList.json', JSON.stringify(tasks, null, 2), 'utf-8');

  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
}

module.exports = {
  getAllTasksService,
  createTaskService,
  getOneTaskService,
  updateTaskService,
  deleteTaskService,
};
