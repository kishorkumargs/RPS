import User from "../models/User.js";

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-passwordHash");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);

    } catch (e) {
        return res.status(500).json({message: "Failed to fetch user"});
    }
}