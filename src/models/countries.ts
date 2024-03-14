import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  regionName: {
    type: String,
    trim: true,
  },
});

export const Countries = mongoose.model("countries", countrySchema);
