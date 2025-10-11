import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'client', 'admin'], required: true },
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const user = mongoose.model<User>('User', userSchema);

export type { User };
export default user;