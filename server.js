const app = require('./src/app.js');
const mongoose = require('mongoose');
const connectDB = require('./src/database/mongoConn');
const { client } = require('./src/config/edaConfig.js');

connectDB();

const port = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(
            `Server running con port ${port} on ${process.env.NODE_ENV} mode.`
        );
    });
});

client.activate();
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
});
