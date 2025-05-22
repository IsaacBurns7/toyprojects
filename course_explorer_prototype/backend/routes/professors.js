const express = require('express');
const { getProfessors
} = require("../controllers/professors");

const router = express.Router();

router.get('/:dept/:number', getProfessors);