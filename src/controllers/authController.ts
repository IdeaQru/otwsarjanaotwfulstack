
import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  console.log("Received data:", req.body); // Tambahkan ini untuk melihat data yang diterima
  
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, secret, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });

    res.status(200).json({
      token,
      userName: user.username, // Pastikan Anda mengirimkan `username` dalam respons
      role: user.role,
      id: user._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
 
export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout successful' });
}

export const getSupervisors = async (req: Request, res: Response) => {
  try {
    // Mencari semua user yang memiliki role 'supervisor'
    const supervisors = await User.find({ role: 'supervisor' }).select('-password');

    // Mengembalikan daftar supervisor
    return res.status(200).json(supervisors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching supervisors' });
  }
};