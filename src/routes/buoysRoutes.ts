import { Router } from 'express';
import { DynamicModel } from '../models/aisMessage';

const router = Router();

router.get('/aton', async (req, res) => {
  try {
    const now = new Date();

    // Ambil data AIS type 21 terbaru berdasarkan expirationTime
    const aistype21Data = await DynamicModel.aggregate([
      { $match: { 'data.aistype': 21, expirationTime: { $gt: now } } }, // Filter hanya untuk AIS type 21 dan data valid
      { $sort: { expirationTime: -1 } }, // Urutkan berdasarkan expirationTime (terbaru dulu)
      {
        $group: {
          _id: "$mmsi", // Grupkan berdasarkan MMSI
          latest: { $first: "$$ROOT" }, // Ambil data terbaru berdasarkan sort
        },
      },
      { $replaceRoot: { newRoot: "$latest" } }, // Ganti struktur root dengan data terbaru
      {
        $addFields: {
          receivedTime: { $ifNull: ["$createdAt", "$updatedAt"] }, // Tambahkan waktu data diterima
        },
      },
    ]);

    res.json({
      success: true,
      data: aistype21Data,
    });
  } catch (err) {
    console.error('Error fetching AIS type 21 data:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching AIS type 21 data',
    });
  }
});

export default router;
