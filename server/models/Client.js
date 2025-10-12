import { Schema } from "mongoose";
import user from "./User.js";

const clientSchema = new Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
});

const client = user.discriminator("Client", clientSchema);

export default client;
