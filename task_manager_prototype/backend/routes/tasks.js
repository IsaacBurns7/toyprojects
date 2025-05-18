const express = require('express');
const { 
    getTasks, 
    createTask,
    deleteTask
} = require('../controllers/tasksController');
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);

module.exports = router;