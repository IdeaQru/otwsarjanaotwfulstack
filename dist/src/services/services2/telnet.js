"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToTelnet = connectToTelnet;
const net_1 = __importDefault(require("net"));
const batchProcessor_1 = require("./batchProcessor");
function connectToTelnet(host, port) {
    const client = net_1.default.createConnection(port, host, () => {
        console.log(`Connected to ${host}:${port}`);
    });
    client.on("data", (data) => {
        const messages = data.toString().split("\n").filter((msg) => msg.trim());
        messages.forEach((message) => (0, batchProcessor_1.addToQueue)(message.trim()));
    });
    client.setTimeout(30000); // 30 detik timeout
    client.on("timeout", () => {
        console.error("Telnet connection timeout. Reconnecting...");
        client.end(); // Tutup koneksi
        connectToTelnet(host, port); // Reconnect
    });
    client.on("end", () => {
        console.log("Disconnected from server.");
    });
    client.on("error", (err) => {
        console.error("Telnet connection error:", err);
        client.end();
    });
}
