import mongoose from "mongoose";
import { env } from "../env";

export const connectDB = async () => {
	try {
		await mongoose.connect(env.MONGODB_URL);
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
		process.exit(1);
	}
};
