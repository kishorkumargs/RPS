import mongoose from "mongoose";

const gameSessionsSchema = new mongoose.Schema({
    userId: String,
    mode: String,
    result: String,
    score: Number
})
export default mongoose.model("GameSessions", gameSessionsSchema);