import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "SpotifyClone",
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
