import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import songRoutes from './routes/songRoutes.js';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
})

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use("/api/user", userRoutes);
app.use("/api/song", songRoutes);

app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
});