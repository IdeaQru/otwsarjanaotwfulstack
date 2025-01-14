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
exports.getMailZones = exports.deleteSbnZone = exports.addSbnZone = void 0;
const mailZoneService_1 = require("../services/mailZoneService"); // Import the service
const apiKeyService_1 = require("../services/apiKeyService");
const nodemailer_1 = __importDefault(require("nodemailer")); // Import nodemailer
const mailZoneService = new mailZoneService_1.MailZoneService(); // Create an instance of the service
const apiKeyService = new apiKeyService_1.ApiKeyService(); // Create an instance of the ApiKey service
// Configure Nodemailer transport (example with Gmail SMTP)
const transporter = nodemailer_1.default.createTransport({
    host: 'mail.aisnesia.com', // Using Gmail service (can change to another provider)
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Replace with your email address
        pass: process.env.EMAIL_PASS, // Replace with your email password or app password
    }
});
// Function to handle the POST request for adding SBNP Zone
const addSbnZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sbnpName, sbnpType, selectedApiKey, mmsi, baseStationMmsi, longitude, latitude, userId } = req.body;
    try {
        // Step 1: Validate selectedApiKey
        const apiKeys = yield apiKeyService.getApiKeysbyID(userId); // Fetch API keys by user ID
        console.log(apiKeys);
        console.log(userId);
        // Step 2: Check if the selectedApiKey exists in the user's API keys
        const isValidApiKey = apiKeys.some(key => key.key === selectedApiKey); // Compare keys
        if (!isValidApiKey) {
            return res.status(400).json({ message: 'Invalid API Key.' });
        }
        // Step 3: Proceed to add the SBNP zone if the API key is valid
        const newZone = yield mailZoneService.createSbnZone({
            sbnpName,
            sbnpType,
            selectedApiKey,
            mmsi,
            baseStationMmsi,
            longitude,
            latitude
        });
        // Send success response
        res.status(201).json({ message: 'SBNP Zone added successfully!', data: newZone });
        // Step 4: Send email notification
        const mailOptions = {
            from: 'info@aisnesia.com', // Replace with your email address
            to: 'info@aisnesia.com', // Replace with the recipient's email address
            subject: 'New SBNP Zone Added', // Subject of the email
            text: `A new SBNP zone has been added.\n\nDetails:\nName: ${sbnpName}\nType: ${sbnpType}\nMMSI: ${mmsi}\nBase Station MMSI: ${baseStationMmsi}\nLongitude: ${longitude}\nLatitude: ${latitude}\nAPI Key: ${selectedApiKey}`, // The body of the email
        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (error) {
        console.error('Error adding SBNP Zone:', error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.addSbnZone = addSbnZone;
const deleteSbnZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { zoneId } = req.params;
    try {
        // Step 1: Fetch the zone details before deletion
        const zone = yield mailZoneService.getMailZoneById(zoneId);
        if (!zone) {
            return res.status(404).json({ message: 'SBNP Zone not found.' });
        }
        // Step 2: Delete the zone
        yield mailZoneService.deleteMailZone(zoneId);
        // Step 3: Send email notification
        const mailOptions = {
            from: 'info@aisnesia.com', // Replace with your email address
            to: 'info@aisnesia.com', // Replace with the recipient's email address
            subject: 'SBNP Zone Deleted', // Subject of the email
            text: `An SBNP zone has been deleted.

Details:
Name: ${zone.sbnpName}
Type: ${zone.sbnpType}
MMSI: ${zone.mmsi}
Base Station MMSI: ${zone.baseStationMmsi}
Longitude: ${zone.longitude}
Latitude: ${zone.latitude}
API Key: ${zone.selectedApiKey}`, // The body of the email
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        // Step 4: Send success response
        res.status(200).json({ message: 'SBNP Zone deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting SBNP Zone:', error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.deleteSbnZone = deleteSbnZone;
const getMailZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailZones = yield mailZoneService.getAllMailZones();
        if (!mailZones || mailZones.length === 0) {
            return res.status(404).json({ message: 'No mail zones found.' });
        }
        res.status(200).json(mailZones);
    }
    catch (error) {
        console.error('Error fetching mail zones:', error.message);
        res.status(400).json({ message: error.message });
    }
});
exports.getMailZones = getMailZones;
