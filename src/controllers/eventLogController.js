const EventLog = require('../models/eventLogModel');
const factory = require('../controllers/handlerFactory');

const getEventLogs = factory.getAll(EventLog);

module.exports = { getEventLogs };
