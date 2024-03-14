import mongoose, { Schema } from "mongoose";

const sectorSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

export const Sectors = mongoose.model("sectors", sectorSchema);
