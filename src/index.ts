import express from 'express';
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
import mailZoneRoutes from './routes/mailZoneRoutes';
import apiKeyRoutes from './routes/apiKeyRoutes';
import fs from 'fs';
import https from 'https';
import shipMovementRoutes from './routes/shipMovementRoutes';
import buoysRoutes from './routes/buoysRoutes';

// Inisialisasi Express
const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: '*', // Masukkan IP frontend kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Jika menggunakan cookie atau token
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', shipMovementRoutes);
app.use('/api', aisRoutes);
app.use('/api', shapeRoutes);
app.use('/api', authRoutes);
app.use('/api', mailZoneRoutes);
app.use('/api', apiKeyRoutes);
app.use('/api', buoysRoutes);

// Connect to database
connectDB().catch((err) => console.error('Failed to connect to DB', err));

// Jalankan update API key pertama kali saat server start
updateApiKey();

// Jadwal pembaruan API key setiap 1 hari
cron.schedule('0 0 * * *', () => {
  updateApiKey();
});

// Konfigurasi sertifikat SSL
const sslOptions = {
  key: fs.readFileSync('C:/Users/user/key.pem'), // Path absolut ke private key
  cert: fs.readFileSync('C:/Users/user/cert.pem'), // Path absolut ke sertifikat
};

// Inisialisasi server HTTPS
const httpsServer = https.createServer(sslOptions, app);
const io = new SocketIOServer(httpsServer, {
  cors: {
    origin: ['http://localhost:4200', 'http://165.154.208.232:4200'], // Domain yang diizinkan
    methods: ['GET', 'POST'],
    credentials: true, // Jika ada cookie atau token yang digunakan
  },
});

// Redirect HTTP ke HTTPS
http.createServer((req, res) => {
  // Redirect semua permintaan HTTP ke HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log('HTTP Server is running and redirecting to HTTPS on port 80');
});

// Angular dist path untuk serving aplikasi
const angularDistPath = path.join(__dirname, '../angular-aisweb');
app.use(express.static(angularDistPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

// Event handler untuk koneksi socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set up MongoDB change streams with proper typing
const aisChangeStream = CombinedAisData.watch();
aisChangeStream.on('change', (change: any) => {
  if (['insert', 'update'].includes(change.operationType)) {
    io.emit('aisDataUpdate', change.fullDocument);
  }
});

const shapeChangeStream = Shape.watch();
shapeChangeStream.on('change', (change: any) => {
  if (['insert', 'update'].includes(change.operationType)) {
    io.emit('shapeDataUpdate', change.fullDocument);
  }
});

// Error Handling middleware
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Jalankan server HTTPS
const HTTPS_PORT = 443;
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on https://0.0.0.0:${HTTPS_PORT}`);
});

export { io };
export default app;
