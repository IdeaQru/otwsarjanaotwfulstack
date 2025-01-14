"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shipMovementController_1 = require("../controllers/shipMovementController");
const router = (0, express_1.Router)();
// Endpoint untuk menambahkan pergerakan kapal
router.post("/ship-movements", shipMovementController_1.ShipMovementController.addShipMovement);
// Endpoint untuk mendapatkan semua pergerakan kapal
router.get("/ship-movements", shipMovementController_1.ShipMovementController.getShipMovements);
router.put("/ship-movements/:shipId/:zoneId", shipMovementController_1.ShipMovementController.updateShipMovement);
router.get("/ship-movements/latest", shipMovementController_1.ShipMovementController.getLatestMovement);
exports.default = router;
