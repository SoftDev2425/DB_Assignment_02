import mongoose, { Schema } from "mongoose";

const targetTypeSchema = new Schema({
  type: {
    type: String,
    trim: true,
  },
});

export const TargetTypes = mongoose.model("targetTypes", targetTypeSchema);
