import Gamestats from "../models/GameStats.js";

export const finishGame = async (req, res) => {
    try {
        // Retrieve info
        const userId = req.user.id;
        const {score, wins, loses, ties} = req.body;
        
        // Retrieve stats
        let stats = await Gamestats.findOne({userId});
        
        if(!stats){
            // First game ever, so create new gameStats
            stats = await Gamestats.create({
                userId,
                totalGames: 1,
                highScore: score,
                wins,
                loses,
                ties
            })
        } else {
            // User exists
            stats.totalGames += 1;
            stats.wins += wins;
            stats.loses += loses;
            stats.ties += ties;
        
            if(score > stats.highScore){
                stats.highScore = score;
            }
            await stats.save();
        }
        // Send stats updated response
        res.json({
            message: "Game Stats updated",
            stats
        })
    
    } catch (e) {
        res.status(500).json({message: "Failed to update game stats"});
    }
};