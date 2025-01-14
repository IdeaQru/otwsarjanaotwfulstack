"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const aisRoutes_1 = __importDefault(require("./routes/aisRoutes"));
const shapeRoutes_1 = __importDefault(require("./routes/shapeRoutes"));
const database_1 = __importDefault(require("./config/database"));
const combinedAisData_1 = __importDefault(require("./models/combinedAisData"));
const shapeZone_1 = __importDefault(require("./models/shapeZone"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const apiMiddleware_1 = require("./middleware/apiMiddleware");
const node_cron_1 = __importDefault(require("node-cron"));
const mailZoneRoutes_1 = __importDefault(require("./routes/mailZoneRoutes"));
const apiKeyRoutes_1 = __importDefault(require("./routes/apiKeyRoutes"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const shipMovementRoutes_1 = __importDefault(require("./routes/shipMovementRoutes"));
const buoysRoutes_1 = __importDefault(require("./routes/buoysRoutes"));
// Inisialisasi Express
const app = (0, express_1.default)();
// Konfigurasi CORS
const corsOptions = {
    origin: '*', // Masukkan IP frontend kamu
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Jika menggunakan cookie atau token
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Routes
app.use('/api', shipMovementRoutes_1.default);
app.use('/api', aisRoutes_1.default);
app.use('/api', shapeRoutes_1.default);
app.use('/api', authRoutes_1.default);
app.use('/api', mailZoneRoutes_1.default);
app.use('/api', apiKeyRoutes_1.default);
app.use('/api', buoysRoutes_1.default);
// Connect to database
(0, database_1.default)().catch((err) => console.error('Failed to connect to DB', err));
// Jalankan update API key pertama kali saat server start
(0, apiMiddleware_1.updateApiKey)();
// Jadwal pembaruan API key setiap 1 hari
node_cron_1.default.schedule('0 0 * * *', () => {
    (0, apiMiddleware_1.updateApiKey)();
});
// Konfigurasi sertifikat SSL
const sslOptions = {
    key: fs_1.default.readFileSync('C:/Users/user/key.pem'), // Path absolut ke private key
    cert: fs_1.default.readFileSync('C:/Users/user/cert.pem'), // Path absolut ke sertifikat
};
// Inisialisasi server HTTPS
const httpsServer = https_1.default.createServer(sslOptions, app);
const io = new socket_io_1.Server(httpsServer, {
    cors: {
        origin: ['http://localhost:4200', 'http://165.154.208.232:4200'], // Domain yang diizinkan
        methods: ['GET', 'POST'],
        credentials: true, // Jika ada cookie atau token yang digunakan
    },
});
exports.io = io;
// Redirect HTTP ke HTTPS
http_1.default.createServer((req, res) => {
    // Redirect semua permintaan HTTP ke HTTPS
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
}).listen(80, () => {
    console.log('HTTP Server is running and redirecting to HTTPS on port 80');
});
// Angular dist path untuk serving aplikasi
const angularDistPath = path_1.default.join(__dirname, '../angular-aisweb');
app.use(express_1.default.static(angularDistPath));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(angularDistPath, 'index.html'));
});
// Event handler untuk koneksi socket.io
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Set up MongoDB change streams with proper typing
const aisChangeStream = combinedAisData_1.default.watch();
aisChangeStream.on('change', (change) => {
    if (['insert', 'update'].includes(change.operationType)) {
        io.emit('aisDataUpdate', change.fullDocument);
    }
});
const shapeChangeStream = shapeZone_1.default.watch();
shapeChangeStream.on('change', (change) => {
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
exports.default = app;
