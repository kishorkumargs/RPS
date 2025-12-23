import mongoose from "mongoose";

const gameStatsSchema = new mongoose.Schema({
    userId: String,
    totalGames: Number,
    highScore: Number,
    wins: Number,
    loses: Number,
    ties: Number,
    updatedAt: Date
})
export default mongoose.model("GameStats", gameStatsSchema);