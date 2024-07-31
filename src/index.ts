import express from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; // Import socket.io
import aisRoutes from './routes/aisRoutes'; // Pastikan ini diimpor dari file yang benar
import shapeRoutes from './routes/shapeRoutes'; // Pastikan ini diimpor dari file yang benar
import aisDataRouter from './controllers/aisDataController';
import connectDB from './config/database'; // Pastikan jalur ini benar

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk memparsing JSON dari body request

// Sajikan file statis dari direktori 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', aisRoutes); // Menyediakan endpoint khusus untuk data AIS
app.use('/api', shapeRoutes); // Menyediakan endpoint khusus untuk shape
app.use('/api', aisDataRouter);

// Connect to database
connectDB();

// Inisialisasi server HTTP dan socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Ganti dengan origin yang sesuai
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

// Default route for undefined routes
app.use((req, res) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});



export { io }; // Ekspor instance io untuk digunakan di tempat lain
export default app;
