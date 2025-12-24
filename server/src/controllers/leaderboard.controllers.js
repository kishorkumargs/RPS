import Gamestats from "../models/Gamestats.js";

export const getLeaderboard = async (req, res) => {
    try {
        // Get the limit from the query parameter or default to top 10
        const limit = parseInt(req.query.limit) || 10;

        // Find the top n no of players with highScore, along with their name and email
        const leaderboard = await Gamestats.find()
                            .sort({highScore: -1})
                            .limit(limit)
                            .populate("userId", "name email");
        
        // Return the leaderboard as a response
        res.json(leaderboard);
    } catch (e) {
        res.status(500).json({message: "Failed to fetch leaderboard"});
    }
}