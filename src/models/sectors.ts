import mongoose, { Schema } from "mongoose";

const sectorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
});

sectorSchema.index({ name: 1 }, { unique: true }); // unique index on name

export const Sectors = mongoose.model("sectors", sectorSchema);
