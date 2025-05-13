const fs = require(`fs`);
const {productSchema} = require('../models/productschema');

async function getAllTasksService(req, res) {
    const allproduct = await productSchema.findAll(); 

    if (!allproduct || allproduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'tasks not found',
      });
    }
  
    return res.json({
      success: true,
      data: allproduct,
    });
  }

async function createTaskService(req, res) {
    const newTask = req.body;
    const bodyKeysSchema = [
        `title`,
        `description`,
        `price`,
        `sizes`,
        `colors`,
        `category`,
    ];
    const bodyKeys = Object.keys(newTask);
    const isValid = bodyKeysSchema.every((key) => bodyKeys.includes(key));
    if (!isValid) {
        return res.status(400).json({succes: false,
            message: `Invalid request body`,
            requiredFields: bodyKeysSchema,
            provideFields: bodyKeys,
        });
    }
    const newproduct = await productSchema.create(newTask);

    if (!newproduct) {
      return res.status(500).json({
        success: false,
        message: 'failed to create task',
      });
    }
  
    return res.status(201).json({
      success: true,
      message: 'task created successfully',
      data: newproduct,
    });
  }

async function getOneTaskService(req, res) {
    const taskId = parseInt(req.params.taskId, 10);

    if (isNaN(taskId)) {
        return res.status(400).json({
          success: false,
          message: 'invalid task id',
        });
      }
      const product = await productSchema.findOne({where: {id: taskId}});

    if (!product) {
        return res.status(404).json({
            succes: false,
            message: `task not found`,
        });
    }
    return res.json({
      success: true,
      data: product,
    });
}

async function updateTaskService(req, res) {
    const taskId = parseInt(req.params.taskId, 10); 
  
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'invalid task id',
      });
    }
    const getproduct = await productSchema.findOne({ where: { id: taskId } });
    if (!getproduct) {
      return res.status(404).json({
        success: false,
        message: 'task not found',
      });
    }
  
    const updatedTask = req.body; 
    const bodyKeysSchema = [
      `title`,
        `description`,
        `price`,
        `sizes`,
        `colors`,
        `category`,
    ];
  
    const bodykeys = Object.keys(updatedTask);
    const isValid = bodyKeysSchema.some((key) => bodykeys.includes(key));
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'invalid request body.',
        requiredFields: bodyKeysSchema,
        providedFields: bodykeys,
      });
    }
  
    const updatedproduct = await productSchema.update(updatedTask, {
      where: { id: taskId },
  });
  if (!updatedproduct) {
    return res.status(500).json({
      success: false,
      message: 'failed to update task',
    });
  }

  return res.json({
    success: true,
    message: 'task updated successfully',
  });
}


async function deleteTaskService(req, res) {
    const taskId = parseInt(req.params.taskId, 10); 
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'invalid task id',
      });
    }
    const product = await productSchema.findOne({ where: {id: taskId}});
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'task not found',
      });
    }
    const deletedproduct = await product.destroy({where: {id: taskId }});
    
    if (!deletedproduct) {
      return res.status(500).json({
        success: false,
        message: 'failed to delete task',
      });
    }
  
    return res.json({
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
