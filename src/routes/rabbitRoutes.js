const router = require('express').Router();
const rabbitController = require('../controllers/rabbitController');

router.get('/overview', rabbitController.getOverview);
router.get('/queues/:name', rabbitController.getQueueInfo);

module.exports = router;
