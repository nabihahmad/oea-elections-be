const Vote = require('../models/Vote');
const Engineer = require('../models/Engineer');

exports.getVotesByOeaNumber = async (req, res) => {
    try {
        const { oea_number } = req.query;
        if (!oea_number) {
            return res.status(400).json({ error: "Missing oea_number query parameter" });
        }

        const engineer = await Engineer.findOne({ oea_number });
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        const votes = await Vote.findOne({ engineer: engineer._id });
        res.json({ engineer, votes });
    } catch (error) {
        console.error("Error fetching votes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getVotesByEngineerId = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        // const engineer = await Engineer.findById(engineerId);
        // if (!engineer) {
            // return res.status(404).json({ error: "Engineer not found" });
        // }

        // const votes = await Vote.find({ engineer: engineer._id });
        const votes = await Vote.findOne({ engineer: engineerId }).populate('engineer');
        // res.json({ engineer, votes });
        res.json(votes);
    } catch (error) {
        console.error("Error fetching votes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.castVote = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter in request body" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        const newVote = new Vote({ engineer: engineer._id, voted_at: new Date(), recorded_by: req.user.id });
        await newVote.save();
        res.status(201).json(newVote);
    } catch (error) {
        console.error("Error casting vote:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteVote = async (req, res) => {
    try {
        const { engineerId } = req.params;
        if (!engineerId) {
            return res.status(400).json({ error: "Missing engineerId parameter" });
        }

        const engineer = await Engineer.findById(engineerId);
        if (!engineer) {
            return res.status(404).json({ error: "Engineer not found" });
        }

        await Vote.deleteMany({ engineer: engineer._id });
        res.json({ message: "Votes deleted successfully" });
    } catch (error) {
        console.error("Error deleting votes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};