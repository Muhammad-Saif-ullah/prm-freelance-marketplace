import { Schema } from "mongoose";
import type { User } from "./User";
import user from "./User";

interface Client extends User {
  companyName: string;
  contactPerson: string;
}

const clientSchema = new Schema<Client>({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
});

const client = user.discriminator<Client>('Client', clientSchema);

export default client;
