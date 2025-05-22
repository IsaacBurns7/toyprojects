const express = require('express');
const router = express.Router();
const { getCourses
} = require('../controllers/courses');

router.get('/:dept', getCourses);

module.exports = router;