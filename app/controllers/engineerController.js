const Engineer = require('../models/Engineer');

exports.getEngineerByOeaNumber = async (req, res) => {
    try {
        const { oea_number } = req.query;
        if (!oea_number) {
            return res.status(400).json({ error: "Missing oea_number query parameter" });
        }

        const engineer = await Engineer.findOne({ oea_number });
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        res.json(engineer);
    } catch (error) {
        console.error("Error fetching engineer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getEngineerById = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        res.json(engineer);
    } catch (error) {
        console.error("Error fetching engineer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.checkInEngineer = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        engineer.checked_in_at = new Date();
        engineer.checked_in_by = req.user.id;
        await engineer.save();
        res.json(engineer);
    } catch (error) {
        console.error("Error checking in engineer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.checkOutEngineer = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        engineer.checked_in_at = null;
        engineer.checked_in_by = null;
        await engineer.save();
        res.json(engineer);
    } catch (error) {
        console.error("Error checking out engineer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateMobileNumber = async (req, res) => {
    try {
        const { engineerId } = req.params;
        const { mobile } = req.body;
        if (!engineerId || !mobile) {
            return res.status(400).json({ error: "Missing engineerId parameter or mobile in request body" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        engineer.mobile = mobile;
        engineer.mobile_updated_at = new Date();
        engineer.mobile_updated_by = req.user.id;
        await engineer.save();
        res.json(engineer);
    } catch (error) {
        console.error("Error updating mobile number:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteMobileNumber = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        engineer.mobile = null;
        engineer.mobile_updated_at = null;
        engineer.mobile_updated_by = null;
        await engineer.save();
        res.json(engineer);
    } catch (error) {
        console.error("Error deleting mobile number:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};