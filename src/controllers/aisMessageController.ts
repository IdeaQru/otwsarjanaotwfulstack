import { handleType1and3 } from '../services/aisHandlers/handleType1and3';
import { handleType5 } from '../services/aisHandlers/handleType5';
import { handleType18 } from '../services/aisHandlers/handleType18';
import { handleType24a } from '../services/aisHandlers/handleType24a';
import { handleType24b } from '../services/aisHandlers/handleType24b';
import { delay } from '../utils/delay';
import { io } from '../index'; // Import instance io

export const processAisMessage = async (data: any) => {
  try {
    console.log('Processing AIS Data:', data);

    await delay(1000);

    switch (data.type) {
      case 1:
      case 3:
        await handleType1and3(data);
        break;
      case 5:
        await handleType5(data);
        break;
      case 18:
        await handleType18(data);
        break;
      case 24:
        if (data.partNum === 0) {
          await handleType24a(data);
        } else if (data.partNum === 1) {
          await handleType24b(data);
        }
        break;
      default:
        console.log(`Jenis data AIS tidak dikenali: ${data.type}`);
    }

    // Emit event to clients via socket.io
    io.emit('aisData', {
      ...data,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Error processing AIS data:', err);
  }
  await delay(3000);
};
