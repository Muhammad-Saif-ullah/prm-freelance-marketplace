import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = mongoose.connect(process.env.DATABASE_URL, {});

export default conn;
