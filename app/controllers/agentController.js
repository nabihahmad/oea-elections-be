const Admin = require('../models/Admin');
const Vote = require('../models/Vote');

exports.getBallotBox = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({ error: "Missing agent id in request body" });
        }
        
        const admin = await Admin.findById(id, 'ballot_box');
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        
        const ballotBoxData = admin.toObject();
        res.json(ballotBoxData);
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateBallotBox = async (req, res) => {
    try {
        const { id } = req.user;
        const { ballot_box } = req.body;
        if (!id || ballot_box === undefined) {
            return res.status(400).json({ error: "Missing agent id in request body or ballot_box" });
        }
        
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        
        admin.ballot_box = ballot_box;
        await admin.save();

        res.json({success: true, ballot_box: admin.ballot_box});
    } catch (error) {
        console.error("Error updating ballot box:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getVoteCount = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({ error: "Missing agent id in request body" });
        }
        
        const voteCount = await Vote.find({ recorded_by: id }).countDocuments();
        res.json({ vote_count: voteCount });
    } catch (error) {
        console.error("Error fetching vote count:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};