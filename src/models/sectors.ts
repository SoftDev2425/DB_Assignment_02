import mongoose, { Schema } from "mongoose";

const sectorSchema = new Schema({
  name: {
    type: String,
  },
});

export const Sectors = mongoose.model("sectors", sectorSchema);
