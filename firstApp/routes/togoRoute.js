const express = require('express');
const {
  getAllTasksService,
  createTaskService,
  getOneTaskService,
  updateTaskService,
  deleteTaskService,
} = require('../services/todoService');
const todoRouter = express.Router();

todoRouter.get('/tasks', getAllTasksService);


todoRouter.post('/tasks/create', createTaskService);


todoRouter.get('/tasks/:taskId', getOneTaskService);


todoRouter.put('/tasks/update/:taskId', updateTaskService);


todoRouter.delete('/tasks/delete/:taskId', deleteTaskService);
module.exports = todoRouter;
