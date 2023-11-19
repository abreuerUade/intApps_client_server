const app = require('./src/app.js');
const mongoose = require('mongoose');
const connectDB = require('./src/database/mongoConn');
const { client } = require('./src/config/edaConfig.js');
const https = require('https');
connectDB();

const port = process.env.PORT || 8080;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(
            `Server running con port ${port} on ${process.env.NODE_ENV} mode.`
        );
    });
});

client.activate();

setInterval(function () {
    https.get('https://intapps-client-server.onrender.com/api/v1/ping');
    console.log('Waky waky');
}, 600000);

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
});
