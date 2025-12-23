import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            {expiresIn: "1h"}
        )
        // console.log("passed");

        // Update last login date
        user.lastLogin = new Date();
        await user.save();

        // Send the token in the response
        res.json({
            token, 
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