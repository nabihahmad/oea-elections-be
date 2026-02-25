const Engineer = require('../models/Engineer');
const Vote = require('../models/Vote');

exports.getMainCounts = async (req, res) => {
    try {
        const totalRegisteredEngineers = await Engineer.countDocuments();
        const totalEligibleEngineers = await Engineer.countDocuments({ settlement_year: { $eq: "2025" } });
        const checkedInEngineers = await Engineer.countDocuments({ checked_in_at: { $ne: null } });
        const totalVotes = await Vote.countDocuments();
        const totalAffiliatedVotes = 0;
        const totalMobileNumbers = await Engineer.countDocuments({ mobile: { $ne: null } });

        res.json({
            totalRegisteredEngineers,
            totalEligibleEngineers,
            checkedInEngineers,
            totalVotes,
            totalAffiliatedVotes,
            totalMobileNumbers,
        });
    } catch (error) {
        console.error("Error fetching summary statistics:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getVotesTimeSeries = async (req, res) => {
    try {
        const votesByDate = await Vote.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: { $add: ["$voted_at", 3 * 60 * 60 * 1000] } },
                        month: { $month: { $add: ["$voted_at", 3 * 60 * 60 * 1000] } },
                        day: { $dayOfMonth: { $add: ["$voted_at", 3 * 60 * 60 * 1000] } },
                        hour: { $hour: { $add: ["$voted_at", 3 * 60 * 60 * 1000] } },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 },
            },
        ]);

        const timeSeries = votesByDate.reduce((acc, entry) => {
            const datetime = new Date(entry._id.year, entry._id.month - 1, entry._id.day, entry._id.hour).toISOString().slice(0, 13).replace("T", " ").concat(":00");
            acc[datetime] = {
                totalVotes: entry.count,
                affiliatedVotes: Math.floor(Math.random() * 5),
            };
            return acc;
        }, {});

        res.json(timeSeries);
    } catch (error) {
        console.error("Error fetching votes time series:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};