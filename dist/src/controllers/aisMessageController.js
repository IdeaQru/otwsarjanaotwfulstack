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
exports.processAisMessage = void 0;
const handleType1_2and3_1 = require("../services/aisHandlers/handleType1-2and3");
const handleType4_1 = require("../services/aisHandlers/handleType4");
const handleType5_1 = require("../services/aisHandlers/handleType5");
const handleType6_1 = require("../services/aisHandlers/handleType6");
const handleType7_1 = require("../services/aisHandlers/handleType7");
const handleType8_1 = require("../services/aisHandlers/handleType8");
const handleType9_1 = require("../services/aisHandlers/handleType9");
const handleType10_1 = require("../services/aisHandlers/handleType10");
const handleType11_1 = require("../services/aisHandlers/handleType11");
const handleType12_1 = require("../services/aisHandlers/handleType12");
const handleType13_1 = require("../services/aisHandlers/handleType13");
const handleType14_1 = require("../services/aisHandlers/handleType14");
const handleType15_1 = require("../services/aisHandlers/handleType15");
const handleType16_1 = require("../services/aisHandlers/handleType16");
const handleType17_1 = require("../services/aisHandlers/handleType17");
const handleType18_1 = require("../services/aisHandlers/handleType18");
const handleType19_1 = require("../services/aisHandlers/handleType19");
const handleType20_1 = require("../services/aisHandlers/handleType20");
const handleType21_1 = require("../services/aisHandlers/handleType21");
const handleType22_1 = require("../services/aisHandlers/handleType22");
const handleType23_1 = require("../services/aisHandlers/handleType23");
const handleType24a_1 = require("../services/aisHandlers/handleType24a");
const handleType24b_1 = require("../services/aisHandlers/handleType24b");
const handleType25_1 = require("../services/aisHandlers/handleType25");
const handleType26_1 = require("../services/aisHandlers/handleType26");
const handleType27_1 = require("../services/aisHandlers/handleType27");
const delay_1 = require("../utils/delay");
const index_1 = require("../index"); // Import instance io
const processAisMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Processing AIS Data:', data);
        switch (data.type) {
            case 1:
            case 2:
            case 3:
                yield (0, handleType1_2and3_1.handleType1_2_and3)(data);
                break;
            case 4:
                yield (0, handleType4_1.handleType4)(data);
                break;
            case 5:
                yield (0, handleType5_1.handleType5)(data);
                break;
            case 6:
                yield (0, handleType6_1.handleType6)(data);
                break;
            case 7:
                yield (0, handleType7_1.handleType7)(data);
                break;
            case 8:
                yield (0, handleType8_1.handleType8)(data);
                break;
            case 9:
                yield (0, handleType9_1.handleType9)(data);
                break;
            case 10:
                yield (0, handleType10_1.handleType10)(data);
                break;
            case 11:
                yield (0, handleType11_1.handleType11)(data);
                break;
            case 12:
                yield (0, handleType12_1.handleType12)(data);
                break;
            case 13:
                yield (0, handleType13_1.handleType13)(data);
                break;
            case 14:
                yield (0, handleType14_1.handleType14)(data);
                break;
            case 15:
                yield (0, handleType15_1.handleType15)(data);
                break;
            case 16:
                yield (0, handleType16_1.handleType16)(data);
                break;
            case 17:
                yield (0, handleType17_1.handleType17)(data);
                break;
            case 18:
                yield (0, handleType18_1.handleType18)(data);
                break;
            case 19:
                yield (0, handleType19_1.handleType19)(data);
                break;
            case 20:
                yield (0, handleType20_1.handleType20)(data);
                break;
            case 21:
                yield (0, handleType21_1.handleType21)(data);
                break;
            case 22:
                yield (0, handleType22_1.handleType22)(data);
                break;
            case 23:
                yield (0, handleType23_1.handleType23)(data);
                break;
            case 24:
                if (data.partNum === 0) {
                    yield (0, handleType24a_1.handleType24a)(data);
                }
                else if (data.partNum === 1) {
                    yield (0, handleType24b_1.handleType24b)(data);
                }
                break;
            case 25:
                yield (0, handleType25_1.handleType25)(data);
                break;
            case 26:
                yield (0, handleType26_1.handleType26)(data);
                break;
            case 27:
                yield (0, handleType27_1.handleType27)(data);
                break;
            default:
                console.log(`Jenis data AIS tidak dikenali: ${data.type}`);
        }
        // Emit event to clients via socket.io
        index_1.io.emit('aisData', Object.assign(Object.assign({}, data), { timestamp: new Date().toISOString() }));
    }
    catch (err) {
        console.error('Error processing AIS data:', err);
    }
    yield (0, delay_1.delay)(3000);
});
exports.processAisMessage = processAisMessage;
