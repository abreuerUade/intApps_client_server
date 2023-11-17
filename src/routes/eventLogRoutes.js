const router = require('express').Router();
const EventLog = require('../models/eventLogModel');
const eventLogController = require('../controllers/eventLogController');

router.get('/', eventLogController.getEventLogs);

module.exports = router;