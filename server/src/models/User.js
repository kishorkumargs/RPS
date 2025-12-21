import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    passwordHash: String,
    authProvider: {
        type: String,
        default: "local"
    }, 
    mustResetPassword: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date
})

export default mongoose.model("User", userSchema);