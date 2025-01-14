"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToQueue = addToQueue;
exports.startBatchProcessor = startBatchProcessor;
const aisDecoder_1 = require("./aisDecoder");
const queue = [];
const MAX_BATCH_SIZE = 50;
function addToQueue(message) {
    queue.push(message);
}
function startBatchProcessor(interval) {
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        console.log(`Queue size before processing: ${queue.length}`);
        if (queue.length > 0) {
            const batch = queue.splice(0, MAX_BATCH_SIZE);
            console.log(`Processing batch of size: ${batch.length}`);
            try {
                yield Promise.all(batch.map((nmea) => (0, aisDecoder_1.decodeAisMessage)(nmea.trim())));
                console.log(`Batch processed successfully.`);
            }
            catch (err) {
                console.error("Error processing batch:", err);
            }
        }
        console.log(`Queue size after processing: ${queue.length}`);
    }), interval);
}
