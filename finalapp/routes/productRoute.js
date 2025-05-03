const express = require(`express`);
const {getAllTasksService, createTaskService, getOneTaskService, updateTaskService, deleteTaskService } = require(`../services/productService`);
const productRouter = express.Router();



productRouter.get('/tasks', getAllTasksService);

productRouter.post(`/tasks/create`, createTaskService);

productRouter.get('/tasks/:taskId', getOneTaskService);

productRouter.put('/tasks/update/:taskId', updateTaskService);

productRouter.delete('/tasks/delete/:taskId', deleteTaskService);

module.exports = productRouter;