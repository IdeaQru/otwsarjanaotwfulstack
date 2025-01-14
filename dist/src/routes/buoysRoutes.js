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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aisMessage_1 = require("../models/aisMessage");
const router = (0, express_1.Router)();
router.get('/aton', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const now = new Date();
        // Ambil data AIS type 21 terbaru berdasarkan expirationTime
        const aistype21Data = yield aisMessage_1.DynamicModel.aggregate([
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
    }
    catch (err) {
        console.error('Error fetching AIS type 21 data:', err);
        res.status(500).json({
            success: false,
            message: 'Error fetching AIS type 21 data',
        });
    }
}));
exports.default = router;
