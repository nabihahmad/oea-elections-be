const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../../config/env");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password in request body" });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const isMatch = bcrypt.compareSync(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid password" });
        } else {
            const token = jwt.sign({ id: admin._id, roles: admin.roles }, jwtSecret, { expiresIn: '24h' });
            res.json({ message: "Login successful", token, admin: { id: admin._id, roles: admin.roles, username: admin.username, full_name: admin.full_name } });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.me = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select("_id roles username full_name");
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json({
            admin: {
                id: admin._id,
                roles: admin.roles,
                username: admin.username,
                full_name: admin.full_name,
            },
        });
    } catch (error) {
        console.error("Error loading current user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};