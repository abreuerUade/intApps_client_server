const axios = require('axios');

const getOverview = async (req, res) => {
    try {
        const username = 'uade-broker';
        const password = 'RabbitMqUade';

        // Encode the credentials to Base64
        const base64Credentials = Buffer.from(
            `${username}:${password}`
        ).toString('base64');
        const response = await axios.get(
            'https://b-689aaac5-589a-4b7c-a6b8-362f87ba0eb0.mq.us-east-1.amazonaws.com/api/overview',
            {
                headers: {
                    // Set Basic Authentication headers
                    Authorization: `Basic ${base64Credentials}`,
                    'Content-Type': 'application/json', // Set your content type if needed
                },
            }
        );

        const overview = {
            total_queues: response.data.object_totals.queues,
            total_exchanges: response.data.object_totals.exchanges,
            total_ack_messages: response.data.message_stats.ack,
            total_connections: response.data.object_totals.connections,
        };

        res.status(200).json(overview);
    } catch (error) {
        console.error('Error getting overview:', error);
        res.status(500).json({ error: 'Failed to get overview' });
    }
};

const getQueueInfo = async (req, res) => {
    try {
        const username = 'uade-broker';
        const password = 'RabbitMqUade';
        const name = req.params.name;

        // Encode the credentials to Base64
        const base64Credentials = Buffer.from(
            `${username}:${password}`
        ).toString('base64');
        const response = await axios.get(
            'https://b-689aaac5-589a-4b7c-a6b8-362f87ba0eb0.mq.us-east-1.amazonaws.com/api/queues',
            {
                headers: {
                    // Set Basic Authentication headers
                    Authorization: `Basic ${base64Credentials}`,
                    'Content-Type': 'application/json', // Set your content type if needed
                },
            }
        );

        const queue = response.data.filter(q => q.name === name)[0];
        const queueInfo = {
            name: queue.name,
            consumers: queue.consumers,
            state: queue.state,
            ack_messages: queue.message_stats.ack | 0,
            memory: queue.memory | 0,
            mode: queue.mode,
        };

        res.status(200).json(queueInfo);
    } catch (error) {
        console.error('Error getting queue info:', error);
        res.status(500).json({ error: 'Failed to get queue info' });
    }
};

exports.getOverview = getOverview;
exports.getQueueInfo = getQueueInfo;
