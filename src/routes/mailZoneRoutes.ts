// src/routes/mailZoneRoutes.ts
import express from 'express';
import { addSbnZone, getMailZones } from '../controllers/mailZoneController';

const router = express.Router();

// Endpoint untuk menambah SBNP Zone
router.post('/add-sbnp-zone', addSbnZone);

// Define the GET route for fetching all mail zones
router.get('/mailzones', getMailZones);
export default router;
