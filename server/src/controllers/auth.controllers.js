import User from "../models/User.js";
import sendMail from "../utils/mail.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup logic
export const signup = async (req, res) => {
    try {
        // Get name, email, password from req
        const {name, email, password} = req.body;
        
        // Check if its existing user
        const existingUser = await User.findOne({email});
        // console.log("passed");
        
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        // console.log("passed");

        // If new user, hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("passed");

        // Create the user
        const user = await User.create({
            name,
            email,
            passwordHash: hashedPassword
        })
        // console.log("passed");
    
        res.status(201).json({
            message: "User created successfully"
        })
        // Catch errors if any arise
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Signup failed"});
    }
}

// Login logic
export const login = async (req, res) => {
    try {
        // Get the email, password from req
        const {email, password} = req.body;
        // console.log(email, password);
        
        // Check if user exists
        const user = await User.findOne({email});

        if(!user || !user.passwordHash){
            // console.log("User not found", user);
            return res.status(400).json({message: "Invalid credentials"});
        }
        // console.log("passed");

        // Don't know if I want to add await, test and find out
        // 1 time tested, works perfect
        const isMatch = bcrypt.compare(password, user.passwordHash);

        // If the password doesn't match, send a error message
        if(!isMatch){
            console.log(password, "Doesn't match");
            return res.status(400).json({message: "Invalid credentials"});
        }
        // console.log("passed");

        // If user exists, provide a JWT token
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        // console.log("passed");
        // Generate random refresh token
        const refreshToken = crypto.randomBytes(32).toString("hex");
        user.refreshToken = refreshToken;

        // Update last login date
        user.lastLogin = new Date();
        await user.save();

        // Send the token in the response
        res.json({
            token, 
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })

        // Catch errors if any arise
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Login failed"});
    }
}

// Forget password logic
export const forgetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.json({message: "If email exists, a reset link has been sent"})
        }
        // Generate a random reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        // Hash the generated reset token
        const hashedToken = crypto.createHash("sha256")
                            .update(resetToken).digest("hex");
        
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Mock for now, later will integrate nodemailer
        console.log(`
        Password Reset Link:
        http://localhost:3000/api/auth/reset-password/${resetToken}
        `);

        const resetURL = `${process.env.FRONTEND_URL}/api/auth/reset-password/${resetToken}`;
        const message = `
            <h2 style="fontweight: bold;">Password Reset</h2>
            <p>You requested a password reset for Rock Paper Scissors.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetURL} style="text-decoration: none;">Reset Password</a>
            <p style="color:red;">This link expires in 15 minutes.<p>
        `;
        // console.log("pass");
        
        try {
            await sendMail({
                to: "kishorkumargs85@gmail.com",
                subject: "RPS Password Reset",
                html: message
            });
            // console.log("pass");
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();

            return res.status(500).json({ message: "Email could not be sent" });
        }

        res.json({message: "Password reset link has been sent for you email"})
    } catch (e) {
        res.status(500).json({message: "Password reset failed"});
    }
}

// Reset password logic
export const resetPassword = async (req, res) => {
    try {
        // Retreive the token from the params, new password from the body
        const {token} = req.params;
        const {newPassword} = req.body;

        // Hash the token received for checking the hashed token stored in database
        const hashedToken = crypto.createHash("sha256")
                            .update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {$gt: Date.now()}
        })

        if(!user) {
            return res.status(400).json({message: "Invalid or expired token"});
        }

        // Hash the new password
        user.passwordHash = await bcrypt.hash(newPassword, 10);

        // Clear reset
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        res.json({message: "Password reset successful"})
    } catch (e) {
        res.status(500).json({message: "Password reset failed"})
    }
}

// Refresh token generation logic
export const refreshToken = async (req, res) => {
    // Retrieve the refresh token
    const { refreshToken } = req.body;

    const user = await User.find({refreshToken});

    if(!user){
        return res.status(401).json({message: "No refresh token"});
    }

    const newAccessToken = jwt.sign(
        {id: user._id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
    res.json({accessToken: newAccessToken});
}

// Logout logic
export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if(!refreshToken){
        return res.sendStatus(204);
    }

    const user = await User.findOne({refreshToken});

    if(user){
        user.refreshToken = null;
        await user.save();
    }
    res.json({message: "Logged out successfully"});
}