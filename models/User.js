import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
    default: "No bio yet",
  },
  profilePic: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
  registrationCode: {
    type: String,
    required: false,
  },
  registrationCodeExpiration: {
    type: Date,
    required: false,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordTokenExpiration: {
    type: Date,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = mongoose.model("User", userSchema);