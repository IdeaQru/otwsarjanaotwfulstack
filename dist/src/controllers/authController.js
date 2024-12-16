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
exports.getSupervisors = exports.logout = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'your_jwt_secret';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received data:", req.body); // Tambahkan ini untuk melihat data yang diterima
    const { username, email, password, role } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({ username, email, password: hashedPassword, role });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: newUser.role }, secret, { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).json({
            token,
            userName: user.username, // Pastikan Anda mengirimkan `username` dalam respons
            role: user.role,
            id: user._id
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'Logout successful' });
});
exports.logout = logout;
const getSupervisors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mencari semua user yang memiliki role 'supervisor'
        const supervisors = yield userModel_1.default.find({ role: 'supervisor' }).select('-password');
        // Mengembalikan daftar supervisor
        return res.status(200).json(supervisors);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching supervisors' });
    }
});
exports.getSupervisors = getSupervisors;
