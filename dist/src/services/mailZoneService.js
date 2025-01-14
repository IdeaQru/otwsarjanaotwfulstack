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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailZoneService = void 0;
// src/services/mailZoneService.ts
const mailZone_1 = __importDefault(require("../models/mailZone"));
class MailZoneService {
    // Function to check for duplicate and create a new SBNP Zone
    createSbnZone(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sbnpName, sbnpType, selectedApiKey, mmsi, baseStationMmsi, longitude, latitude } = data;
            // Check if the zone already exists based on sbnpName, baseStationMmsi, or selectedApiKey
            const existingZone = yield mailZone_1.default.findOne({
                $or: [
                    { sbnpName },
                    { mmsi },
                    { selectedApiKey },
                ]
            });
            if (existingZone) {
                throw new Error('SBNP Zone with the same name, MMSI, or API Key already exists.');
            }
            // Create a new SBNP Zone
            const newZone = new mailZone_1.default({
                sbnpName,
                sbnpType,
                selectedApiKey,
                mmsi,
                baseStationMmsi,
                longitude,
                latitude,
            });
            // Save the new zone to the database
            yield newZone.save();
            return newZone; // Return the created zone object
        });
    }
    getAllMailZones() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Example database call to fetch all mail zones
                const mailZones = yield mailZone_1.default.find(); // For MongoDB, or your DB equivalent
                return mailZones;
            }
            catch (error) {
                throw new Error('Error fetching mail zones');
            }
        });
    }
    getMailZoneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mailZone_1.default.findById(id);
        });
    }
    deleteMailZone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mailZone_1.default.findByIdAndDelete(id);
        });
    }
}
exports.MailZoneService = MailZoneService;
