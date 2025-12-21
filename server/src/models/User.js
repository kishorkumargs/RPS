import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    passwordHash: String,
    authProvider: "local" || "firebase_migrated",
    mustResetPassword: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    lastLogin: Date
})

export default mongoose.model("User", userSchema);