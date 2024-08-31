import { Request, Response } from 'express';
import Shape from '../models/shapeZone';

export const saveShape = async (req: Request, res: Response) => {
    try {
        const newShape = new Shape(req.body);
        await newShape.save();
        res.status(201).send(newShape);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getShapes = async (req: Request, res: Response) => {
    try {
        const shapes = await Shape.find({});
        res.status(200).send(shapes);
    } catch (error) {
        res.status(500).send(error);
    }
};
export const getPolygonShapes = async (req: Request, res: Response) => {
    try {
        const polygons = await Shape.find({ type: 'polygon' });
        res.status(200).send(polygons);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getCircleShapes = async (req: Request, res: Response) => {
    try {
        const circles = await Shape.find({ type: 'circle' });
        res.status(200).send(circles);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteShape = async (req:Request, res:Response) => {
    try {
        const shapeId = req.params.id; // Mengambil ID dari parameter URL
        const deletedShape = await Shape.findByIdAndDelete(shapeId);
        if (!deletedShape) {
            return res.status(404).send({ message: "Shape not found" });
        }
        res.send({ message: "Shape deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting shape", error: error });
    }
};

export const getMmsiAndCoordinates = async (req: Request, res: Response) => {
    try {
      const shapes = await Shape.find({}, 'properties.mmsi coordinates');
      res.json(shapes);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving data', error: err });
    }
  };