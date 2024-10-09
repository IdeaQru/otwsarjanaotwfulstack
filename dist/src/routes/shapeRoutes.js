"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shapeController_1 = require("../controllers/shapeController");
const apiMiddleware_1 = require("../middleware/apiMiddleware");
const router = express_1.default.Router();
router.post('/shapes', shapeController_1.saveShape);
router.get('/shapes', shapeController_1.getShapes);
router.delete('/shapes/:id', shapeController_1.deleteShape);
router.get('/shapes/polygon', shapeController_1.getPolygonShapes);
router.get('/shapes/circle', shapeController_1.getCircleShapes);
router.get('/shapes/mmsi-coordinates', apiMiddleware_1.verifyApiKey, shapeController_1.getMmsiAndCoordinates); // Route baru untuk mmsi dan coordinates
exports.default = router;
