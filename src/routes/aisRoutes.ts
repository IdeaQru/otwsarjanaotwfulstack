import { Router } from 'express';
import net from 'net';
import AisDecoder from 'ais-stream-decoder';
import { processAisMessage } from '../controllers/aisMessageController';

const router = Router();
const HOST = '103.24.49.246';
const AIS_PORT = 34567;

const parser = new AisDecoder();
let latestDecodedData: any = null;
let buffer = '';

const client = new net.Socket();
client.connect(AIS_PORT, HOST, () => {
  console.log(`Connected to ${HOST}:${AIS_PORT}`);
});

parser.on('data', async (data) => {
  console.log('Decoded AIS Data:', data); // Log the received data

  try {
    const dataFix = JSON.parse(data); // Safely parse the JSON string
    if ('type' in dataFix) {
      console.log('Data type exists:', dataFix.type);
      latestDecodedData = dataFix;
      await processAisMessage(dataFix);
    } else {
      console.error('Data received does not have a type property:', dataFix);
    }
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});

parser.on('error', (err) => {
  console.error('AIS Decoder Error:', err);
});

client.on('data', (data) => {
  console.log('Raw data received from server:', data.toString());
  buffer += data.toString();
  let lines = buffer.split('\n');
  buffer = lines.pop()!; // Keep the last incomplete line in the buffer
  lines.forEach((line) => {
    console.log('Processing line:', line);
    if (isValidNmea(line.trim())) {
      try {
        parser.write(line.trim());
      } catch (err) {
        console.error('Failed to decode line:', line, 'Error:', err);
      }
    } else {
      console.error('Invalid NMEA data:', line);
    }
  });
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.error(`Error: ${err.message}`);
});

router.get('/ais-data', (req, res) => {
  if (latestDecodedData) {
    res.json(latestDecodedData);
  } else {
    res.status(404).send('No AIS data available');
  }
});

function isValidNmea(data: string): boolean {
  return data.startsWith('$') || data.startsWith('!');
}

export default router;
