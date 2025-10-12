import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["freelancer", "client", "admin"],
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: "role" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const user = mongoose.model("User", userSchema);

export default user;
