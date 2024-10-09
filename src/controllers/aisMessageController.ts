import { handleType1_2_and3 } from '../services/aisHandlers/handleType1-2and3';
import { handleType4 } from '../services/aisHandlers/handleType4';
import { handleType5 } from '../services/aisHandlers/handleType5';
import { handleType6 } from '../services/aisHandlers/handleType6';
import { handleType7 } from '../services/aisHandlers/handleType7';
import { handleType8 } from '../services/aisHandlers/handleType8';
import { handleType9 } from '../services/aisHandlers/handleType9';
import { handleType10 } from '../services/aisHandlers/handleType10';
import { handleType11 } from '../services/aisHandlers/handleType11';
import { handleType12 } from '../services/aisHandlers/handleType12';
import { handleType13 } from '../services/aisHandlers/handleType13';
import { handleType14 } from '../services/aisHandlers/handleType14';
import { handleType15 } from '../services/aisHandlers/handleType15';
import { handleType16 } from '../services/aisHandlers/handleType16';
import { handleType17 } from '../services/aisHandlers/handleType17';
import { handleType18 } from '../services/aisHandlers/handleType18';
import { handleType19 } from '../services/aisHandlers/handleType19';
import { handleType20 } from '../services/aisHandlers/handleType20';
import { handleType21 } from '../services/aisHandlers/handleType21';
import { handleType22 } from '../services/aisHandlers/handleType22';
import { handleType23 } from '../services/aisHandlers/handleType23';
import { handleType24a } from '../services/aisHandlers/handleType24a';
import { handleType24b } from '../services/aisHandlers/handleType24b';
import { handleType25 } from '../services/aisHandlers/handleType25';
import { handleType26 } from '../services/aisHandlers/handleType26';
import { handleType27 } from '../services/aisHandlers/handleType27';
import { delay } from '../utils/delay';
import { io } from '../index'; // Import instance io

export const processAisMessage = async (data: any) => {
  try {
    console.log('Processing AIS Data:', data);

    switch (data.type) {
      case 1:
      case 2:
      case 3:
        await handleType1_2_and3(data);
        break;
      case 4:
        await handleType4(data);
        break;
      case 5:
        await handleType5(data);
        break;
      case 6:
        await handleType6(data);
        break;
      case 7:
        await handleType7(data);
        break;
      case 8:
        await handleType8(data);
        break;
      case 9:
        await handleType9(data);
        break;
      case 10:
        await handleType10(data);
        break;
      case 11:
        await handleType11(data);
        break;
      case 12:
        await handleType12(data);
        break;
      case 13:
        await handleType13(data);
        break;
      case 14:
        await handleType14(data);
        break;
      case 15:
        await handleType15(data);
        break;
      case 16:
        await handleType16(data);
        break;
      case 17:
        await handleType17(data);
        break;
      case 18:
        await handleType18(data);
        break;
      case 19:
        await handleType19(data);
        break;
      case 20:
        await handleType20(data);
        break;
      case 21:
        await handleType21(data);
        break;
      case 22:
        await handleType22(data);
        break;
      case 23:
        await handleType23(data);
        break;
      case 24:
        if (data.partNum === 0) {
          await handleType24a(data);
        } else if (data.partNum === 1) {
          await handleType24b(data);
        }
        break;
      case 25:
        await handleType25(data);
        break;
      case 26:
        await handleType26(data);
        break;
      case 27:
        await handleType27(data);
        break;
      default:
        console.log(`Jenis data AIS tidak dikenali: ${data.type}`);
    }

    // Emit event to clients via socket.io
    io.emit('aisData', {
      ...data,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    console.error('Error processing AIS data:', err);
  }

  await delay(3000);
};
