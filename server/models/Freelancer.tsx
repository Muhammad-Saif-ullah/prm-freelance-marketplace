import { Schema } from "mongoose";
import type { User } from "./User";
import user from "./User";

interface Freelancer extends User {
  skills: string[];
  hourlyRate: number;
}

const freelancerSchema = new Schema<Freelancer>({
  skills: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
});

const freelancer = user.discriminator<Freelancer>('Freelancer', freelancerSchema);

export default freelancer;
