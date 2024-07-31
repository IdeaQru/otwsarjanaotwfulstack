import express from 'express';
import { saveShape, getShapes, deleteShape,  getPolygonShapes,
    getCircleShapes,} from '../controllers/shapeController';

const router = express.Router();

router.post('/shapes', saveShape);
router.get('/shapes', getShapes);
router.delete('/shapes/:id', deleteShape);
router.get('/shapes/polygon', getPolygonShapes);
router.get('/shapes/circle', getCircleShapes);
export default router;
