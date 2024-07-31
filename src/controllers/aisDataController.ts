import express from 'express';
import CombinedAisData from '../models/combinedAisData';

const router = express.Router();

router.get('/ships', async (req, res) => {
  try {
    const ships = await CombinedAisData.find({});
    res.json(ships);
  } catch (error) {
    console.error('Error fetching ships data:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
