import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

export const registerUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    const emailLower = email.toLowerCase();

    let user = await User.findOne({ email: emailLower });

    if (user) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email: emailLower,
        password: hashPassword,
    });

    generateToken(user._id, res);

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(201).json({
        user: userWithoutPassword,
        message: "User registered successfully",
    });
});

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password",
        });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
        return res.status(400).json({
            message: "Invalid Email or Password",
        });
    }

    generateToken(user._id, res);

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
        user: userWithoutPassword,
        message: "User logged in successfully",
    });
});

export const myprofile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.json(user);
})

export const logoutUser = TryCatch(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // effectively deletes the cookie
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({
        message: "User logged out successfully",
    });
});

export const saveToPlaylist = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user.playlist.includes(req.params.id)){
        const index = user.playlist.indexOf(req.params.id);

        user.playlist.splice(index, 1);

        await user.save();

        return res.json({
            message: "Removed from playlist"
        })
    }

    user.playlist.push(req.params.id);
    
    await user.save();
    
    return res.json({
        message: "Added to playlist"
    });
})
