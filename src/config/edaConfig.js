const Client = require('@stomp/stompjs').Client;
const WebSocket = require('ws');
const { createLog } = require('./createLog');

Object.assign(global, { WebSocket });

const client = new Client({
    brokerURL: 'ws://intappscore.azurewebsites.net/usuarios',
    onConnect: frame => {
        console.log('Connected: ' + frame);
        client.subscribe('/topic/usuarios', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/robots', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/marketplace', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/admin-personal', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/core-bancario', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/analitica', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
        client.subscribe('/topic/core-contable', message => {
            console.log(`Received: ${message.body}`);
            createLog(message.body);
        });
    },
    onDisconnect: () => {
        console.log('Disconnected from websocket');
    },
    onStompError: frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    },
});

module.exports = { client };
