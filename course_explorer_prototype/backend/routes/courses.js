const express = require('express');
const { getCourses
} = require('../controllers/courses');

const router = express.Router();

router.get('/:dept', getCourses);

module.exports = router;