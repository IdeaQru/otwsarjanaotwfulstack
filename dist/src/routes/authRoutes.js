"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', authController_1.register, authMiddleware_1.adminMiddleware); // Hanya admin yang bisa mendaftarkan user baru
router.post('/login', authController_1.login); // Login biasanya tidak dilindungi oleh middleware
router.post('/logout', authMiddleware_1.authMiddleware, authController_1.logout); // Logout dilindungi dengan authMiddleware
router.get('/getuser', authController_1.getUsers);
router.put('/updateUser/:id', authController_1.updateUserRole);
router.delete('/deleteUser/:id', authController_1.deleteUser);
router.get('/supervisors', authController_1.getSupervisors);
router.post('/changePassword', authMiddleware_1.authMiddleware, authController_1.changePassword);
exports.default = router;
