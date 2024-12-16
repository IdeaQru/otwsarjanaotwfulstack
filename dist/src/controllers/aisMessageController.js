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
const processAisMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (data.type) {
            case 1:
            case 2:
            case 3:
                yield handleTypeWithCatch(handleType1_2and3_1.handleType1_2_and3, data);
                break;
            case 4:
                yield handleTypeWithCatch(handleType4_1.handleType4, data);
                break;
            case 5:
                yield handleTypeWithCatch(handleType5_1.handleType5, data);
                break;
            case 6:
                yield handleTypeWithCatch(handleType6_1.handleType6, data);
                break;
            case 7:
                yield handleTypeWithCatch(handleType7_1.handleType7, data);
                break;
            case 8:
                yield handleTypeWithCatch(handleType8_1.handleType8, data);
                break;
            case 9:
                yield handleTypeWithCatch(handleType9_1.handleType9, data);
                break;
            case 10:
                yield handleTypeWithCatch(handleType10_1.handleType10, data);
                break;
            case 11:
                yield handleTypeWithCatch(handleType11_1.handleType11, data);
                break;
            case 12:
                yield handleTypeWithCatch(handleType12_1.handleType12, data);
                break;
            case 13:
                yield handleTypeWithCatch(handleType13_1.handleType13, data);
                break;
            case 14:
                yield handleTypeWithCatch(handleType14_1.handleType14, data);
                break;
            case 15:
                yield handleTypeWithCatch(handleType15_1.handleType15, data);
                break;
            case 16:
                yield handleTypeWithCatch(handleType16_1.handleType16, data);
                break;
            case 17:
                yield handleTypeWithCatch(handleType17_1.handleType17, data);
                break;
            case 18:
                yield handleTypeWithCatch(handleType18_1.handleType18, data);
                break;
            case 19:
                yield handleTypeWithCatch(handleType19_1.handleType19, data);
                break;
            case 20:
                yield handleTypeWithCatch(handleType20_1.handleType20, data);
                break;
            case 21:
                yield handleTypeWithCatch(handleType21_1.handleType21, data);
                break;
            case 22:
                yield handleTypeWithCatch(handleType22_1.handleType22, data);
                break;
            case 23:
                yield handleTypeWithCatch(handleType23_1.handleType23, data);
                break;
            case 24:
                if (data.partNum === 0) {
                    yield handleTypeWithCatch(handleType24a_1.handleType24a, data);
                }
                else if (data.partNum === 1) {
                    yield handleTypeWithCatch(handleType24b_1.handleType24b, data);
                }
                break;
            case 25:
                yield handleTypeWithCatch(handleType25_1.handleType25, data);
                break;
            case 26:
                yield handleTypeWithCatch(handleType26_1.handleType26, data);
                break;
            case 27:
                yield handleTypeWithCatch(handleType27_1.handleType27, data);
                break;
            default:
                console.log(`Jenis data AIS tidak dikenali: ${data.type}`);
        }
    }
    catch (err) {
        console.error('General error in processAisMessage:', err);
    }
});
exports.processAisMessage = processAisMessage;
// Wrapper function to handle errors within each handler
const handleTypeWithCatch = (handler, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield handler(data);
    }
    catch (err) {
        console.error(`Error in handler ${handler.name} for data type ${data.type}:`, err);
    }
});
