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
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const apiMiddleware_1 = require("./middleware/apiMiddleware");
const node_cron_1 = __importDefault(require("node-cron"));
// Inisialisasi Express
const app = (0, express_1.default)();
// Konfigurasi CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'my-custom-header']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Routes
app.use('/api', aisRoutes_1.default);
app.use('/api', shapeRoutes_1.default);
app.use('/api', authRoutes_1.default);
// Connect to database
(0, database_1.default)().catch((err) => console.error('Failed to connect to DB', err));
// Jalankan update API key pertama kali saat server start
(0, apiMiddleware_1.updateApiKey)();
// Jadwal pembaruan API key setiap 1 hari
node_cron_1.default.schedule('0 0 * * *', () => {
    (0, apiMiddleware_1.updateApiKey)();
});
// Inisialisasi server HTTP dan socket.io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
});
exports.io = io;
// Error Handling middleware
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});
exports.default = app;
