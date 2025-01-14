
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
export const getUsers = async (req: Request, res: Response) => {
  try {
    // Mencari semua user dan menghapus field password dari hasil query
    const users = await User.find().select('-password');

    // Mengembalikan daftar user
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
};
export const getSupervisors = async (req: Request, res: Response) => {
  try {
    // Mencari semua user yang memiliki role 'supervisor'
    const supervisors = await User.find({ role: 'admin' }).select('-password');

    // Mengembalikan daftar supervisor
    return res.status(200).json(supervisors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching supervisors' });
  }
};
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Validate role
    const validRoles = ['admin', 'super-admin', 'user'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Error updating user role', error });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne(); // Ganti remove dengan deleteOne
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error deleting user', error });
  }
};
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.id; // Ambil ID dari middleware

    console.log('User ID from token:', userId); // Debugging

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifikasi password saat ini
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Error changing password', error });
  }
};



