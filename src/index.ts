import express, { Request, Response, NextFunction } from 'express';
import { ChangeStream, ChangeStreamDocument } from 'mongodb';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import aisRoutes from './routes/aisRoutes';
import shapeRoutes from './routes/shapeRoutes';
import connectDB from './config/database';
import CombinedAisData from './models/combinedAisData';
import Shape from './models/shapeZone';
import { delay } from './utils/delay';
import authRoutes from './routes/authRoutes';
import { updateApiKey } from './middleware/apiMiddleware';
import cron from 'node-cron';

// Inisialisasi Express
const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'my-custom-header']
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', aisRoutes);
app.use('/api', shapeRoutes);
app.use('/api', authRoutes);

// Connect to database
connectDB().catch((err) => console.error('Failed to connect to DB', err));

// Jalankan update API key pertama kali saat server start
updateApiKey();

// Jadwal pembaruan API key setiap 1 hari
cron.schedule('0 0 * * *', () => {
  updateApiKey();
});

// Inisialisasi server HTTP dan socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

// Event handler untuk koneksi socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const aisChangeStream: ChangeStream = CombinedAisData.watch();
aisChangeStream.on('change', (change: ChangeStreamDocument<any>) => {
  // Pastikan operasi memiliki fullDocument sebelum mengaksesnya
  if (change.operationType === 'insert' || change.operationType === 'update') {
    io.emit('aisDataUpdate', change.fullDocument);
  } else {
    console.log(`Change detected with operationType: ${change.operationType}`);
  }
});

const shapeChangeStream: ChangeStream = Shape.watch();
shapeChangeStream.on('change', (change: ChangeStreamDocument<any>) => {
  // Pastikan operasi memiliki fullDocument sebelum mengaksesnya
  if (change.operationType === 'insert' || change.operationType === 'update') {
    io.emit('shapeDataUpdate', change.fullDocument);
  } else {
    console.log(`Change detected with operationType: ${change.operationType}`);
  }
});


// Error Handling middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Route not found');
});

export { io };
export default app;
