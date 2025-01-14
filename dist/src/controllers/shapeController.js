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
exports.editShape = exports.getMmsiAndCoordinates = exports.deleteShape = exports.getCircleShapes = exports.getPolygonShapes = exports.getShapes = exports.saveShape = void 0;
const shapeZone_1 = __importDefault(require("../models/shapeZone"));
const saveShape = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newShape = new shapeZone_1.default(req.body);
        yield newShape.save();
        res.status(201).send(newShape);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.saveShape = saveShape;
const getShapes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shapes = yield shapeZone_1.default.find({});
        res.status(200).send(shapes);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getShapes = getShapes;
const getPolygonShapes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polygons = yield shapeZone_1.default.find({ type: 'polygon' });
        res.status(200).send(polygons);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getPolygonShapes = getPolygonShapes;
const getCircleShapes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const circles = yield shapeZone_1.default.find({ type: 'circle' });
        res.status(200).send(circles);
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.getCircleShapes = getCircleShapes;
const deleteShape = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shapeId = req.params.id; // Mengambil ID dari parameter URL
        const deletedShape = yield shapeZone_1.default.findByIdAndDelete(shapeId);
        if (!deletedShape) {
            return res.status(404).send({ message: "Shape not found" });
        }
        res.send({ message: "Shape deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Error deleting shape", error: error });
    }
});
exports.deleteShape = deleteShape;
const getMmsiAndCoordinates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shapes = yield shapeZone_1.default.find({}, 'properties.mmsi coordinates');
        res.json(shapes);
    }
    catch (err) {
        res.status(500).json({ message: 'Error retrieving data', error: err });
    }
});
exports.getMmsiAndCoordinates = getMmsiAndCoordinates;
const editShape = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shapeId = req.params.id; // Mengambil ID dari parameter URL
        const updatedData = req.body; // Mengambil data baru dari body request
        // Mencari dan memperbarui shape berdasarkan ID
        const updatedShape = yield shapeZone_1.default.findByIdAndUpdate(shapeId, updatedData, { new: true, runValidators: true } // Mengembalikan data yang diperbarui dan memvalidasi data
        );
        if (!updatedShape) {
            return res.status(404).send({ message: "Shape not found" });
        }
        res.status(200).send(updatedShape);
    }
    catch (error) {
        res.status(400).send({ message: "Error updating shape", error });
    }
});
exports.editShape = editShape;
