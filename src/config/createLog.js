const EventLog = require('../models/eventLogModel');
const catchAsync = require('../utils/catchAsync');

const createLog = catchAsync(async message => {
    const body = JSON.parse(message);

    const content = JSON.parse(body.content);

    const newEventLog = {
        sender: body.from.slice(7),
        created_at: content.created_at,
        event_name: content.event_name,
        data: JSON.stringify(content.data),
    };

    const log = await EventLog.create(newEventLog);
    console.log(log);
});

module.exports = { createLog };
