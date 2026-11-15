
const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected to HAZARD GUARD Socket.IO!');
    console.log('Socket ID:', socket.id);
});

socket.on('newSensorReading', (reading) => {
    console.log('\nNEW SENSOR READING RECEIVED!');
    console.log(JSON.stringify(reading, null, 2));
});

socket.on('deviceStatusUpdate', (status) => {
    console.log('\nDEVICE STATUS UPDATE!');

    console.log(JSON.stringify(status, null, 2));
});

socket.on('connect_error', (error) => {
    console.log('Connection error:', error.message);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
