import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 6, max: 12, required: true }
});

export default mongoose.model("User", userSchema);