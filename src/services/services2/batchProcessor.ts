import { decodeAisMessage } from "./aisDecoder";

const queue: string[] = [];
const MAX_BATCH_SIZE = 50;

export function addToQueue(message: string): void {
  queue.push(message);
}

export function startBatchProcessor(interval: number): void {
    setInterval(async () => {
      console.log(`Queue size before processing: ${queue.length}`);
  
      if (queue.length > 0) {
        const batch = queue.splice(0, MAX_BATCH_SIZE);
        console.log(`Processing batch of size: ${batch.length}`);
  
        try {
          await Promise.all(batch.map((nmea) => decodeAisMessage(nmea.trim())));
          console.log(`Batch processed successfully.`);
        } catch (err) {
          console.error("Error processing batch:", err);
        }
      }
  
      console.log(`Queue size after processing: ${queue.length}`);
    }, interval);
  }
  
