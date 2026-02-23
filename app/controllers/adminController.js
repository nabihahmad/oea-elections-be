const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.getAdmin = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: "Missing username query parameter" });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const adminResponse = admin.toObject();
        delete adminResponse.password;
        res.json(adminResponse);
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.listAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, '-password');
        res.json(admins);
    } catch (error) {
        console.error("Error listing admins:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { username, full_name, roles, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password in request body" });
        }

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const newAdmin = new Admin({ username, full_name, roles, password: bcrypt.hashSync(password, 10) });
        await newAdmin.save();

        const newAdminResponse = newAdmin.toObject();
        delete newAdminResponse.password;
        res.status(201).json(newAdminResponse);
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { username, full_name, roles, password } = req.body;
        if (!adminId) {
            return res.status(400).json({ error: "Missing adminId parameter" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        if (username) admin.username = username;
        if (full_name) admin.full_name = full_name;
        if (roles) admin.roles = roles;
        if (password) admin.password = bcrypt.hashSync(password, 10);

        await admin.save();
        
        const adminResponse = admin.toObject();
        delete adminResponse.password;
        res.json(adminResponse);
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        if (!adminId) {
            return res.status(400).json({ error: "Missing adminId parameter" });
        }

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        await Admin.deleteOne({ _id: adminId });
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};