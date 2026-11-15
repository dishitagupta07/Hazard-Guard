require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sensorRoutes = require('./routes/sensorRoutes');
const connectDB = require('./config/db');
const deviceRoutes = require('./routes/deviceRoutes');
const labRoutes = require('./routes/labRoutes');
const startDeviceMonitor = require('./jobs/deviceMonitor');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
global.io = io;


app.set('io', io);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/sensors', sensorRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/dashboard', dashboardRoutes);
// Test route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'HAZARD GUARD Backend is running!'
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'Server is healthy',
        timestamp: new Date()
    });
});

// Start server only after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

startDeviceMonitor();

server.listen(PORT, () => {
    console.log(`HAZARD GUARD server running on port ${PORT}`);
});

    } catch (error) {
        console.error('Unable to start server:', error.message);
        process.exit(1);
    }
};

startServer();