const express = require('express');
const { getTasks } = require('../controllers/tasksController');

const router = express.Router();

router.get('/', getTasks);

module.exports = router;