import { Schema } from "mongoose";
import user from "./User.js";

const freelancerSchema = new Schema({
  skills: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
});

const freelancer = user.discriminator("Freelancer", freelancerSchema);

export default freelancer;
