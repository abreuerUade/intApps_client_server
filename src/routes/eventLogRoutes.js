const router = require('express').Router();
const eventLogController = require('../controllers/eventLogController');

router.get('/', eventLogController.getEventLogs);

module.exports = router;
