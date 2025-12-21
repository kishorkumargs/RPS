import mongoose from "mongoose";

const gameStatsSchema = new mongoose.Schema({
    userId: String,
    totalGames: Number,
    highScore: Number
})
export default mongoose.model("GameStats", gameStatsSchema);