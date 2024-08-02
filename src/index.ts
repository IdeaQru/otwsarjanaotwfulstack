import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import aisRoutes from './routes/aisRoutes';
import shapeRoutes from './routes/shapeRoutes';
import connectDB from './config/database';
import CombinedAisData from './models/combinedAisData';
import Shape from './models/shapeZone';  // Pastikan Anda mengimpor model Shape
import { delay } from './utils/delay';
import aisDataRouter from './controllers/aisDataController';

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sajikan file statis dari direktori 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', aisRoutes);
app.use('/api', shapeRoutes);
app.use('/api', aisDataRouter);

// Connect to database
connectDB();

// Inisialisasi server HTTP dan socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
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

// Set up MongoDB change streams for AIS data
const aisChangeStream = CombinedAisData.watch();

aisChangeStream.on('change', (change) => {
  if (change.operationType === 'insert') {
    const fullDocument = change.fullDocument;
    io.emit('aisDataUpdate', fullDocument);
  }
});

// Set up MongoDB change streams for Shapes data
const shapeChangeStream = Shape.watch();

shapeChangeStream.on('change', (change) => {
  if (change.operationType === 'insert') {
    const fullDocument = change.fullDocument;
    io.emit('shapeDataUpdate', fullDocument);
  }
});

delay(2000);

// Default route untuk route yang tidak terdefinisi
app.use((req, res) => {
  res.status(404).send("Maaf, route tersebut tidak ada.");
});



export { io };
export default app;
