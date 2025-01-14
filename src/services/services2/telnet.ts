import net from "net";
import { addToQueue } from "./batchProcessor";

export function connectToTelnet(host: string, port: number): void {
    const client = net.createConnection(port, host, () => {
        console.log(`Connected to ${host}:${port}`);
    });

    client.on("data", (data) => {
        const messages = data.toString().split("\n").filter((msg) => msg.trim());
        messages.forEach((message) => addToQueue(message.trim()));
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
