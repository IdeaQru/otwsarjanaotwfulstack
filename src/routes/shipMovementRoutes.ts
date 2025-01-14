import { Router } from "express";
import { ShipMovementController } from "../controllers/shipMovementController";

const router = Router();

// Endpoint untuk menambahkan pergerakan kapal
router.post("/ship-movements", ShipMovementController.addShipMovement);

// Endpoint untuk mendapatkan semua pergerakan kapal
router.get("/ship-movements", ShipMovementController.getShipMovements);
router.put("/ship-movements/:shipId/:zoneId", ShipMovementController.updateShipMovement);
router.get("/ship-movements/latest", ShipMovementController.getLatestMovement);
export default router;
