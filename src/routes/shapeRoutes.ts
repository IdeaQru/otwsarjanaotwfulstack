import express from 'express';
import { saveShape, getShapes, deleteShape,  getPolygonShapes,
    getCircleShapes,
    getMmsiAndCoordinates,
    editShape,} from '../controllers/shapeController';
import { verifyApiKey } from '../middleware/apiMiddleware';

const router = express.Router();

router.post('/shapes', saveShape);
router.get('/shapes', getShapes);
router.delete('/shapes/:id', deleteShape);
router.get('/shapes/polygon', getPolygonShapes);
router.get('/shapes/circle', getCircleShapes);
router.get('/shapes/mmsi-coordinates', verifyApiKey, getMmsiAndCoordinates); // Route baru untuk mmsi dan coordinates
router.put('/shapes/:id', editShape);
export default router;
