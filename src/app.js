// Dependencies
const express = require('express');

const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const eventLogRoutes = require('./routes/eventLogRoutes');

// App y middlewares
const app = express();

// app.use(cors());

// app.options('*', cors());

app.use(express.json({ limit: '10kb' }));

// Routes

app.get('/api/v1/ping', (req, res) => {
    res.status(200).json({
        status: 'API working corrctly!!!',
    });
});

app.use('/api/v1/logs', eventLogRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
