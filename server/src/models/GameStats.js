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

// Add index for quick sorting and searching
gameStatsSchema.index({highScore: -1})

export default mongoose.models.GameStats ||
  mongoose.model("GameStats", gameStatsSchema);