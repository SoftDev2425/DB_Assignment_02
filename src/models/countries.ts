import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  regionName: {
    type: String,
    trim: true,
  },
});

countrySchema.index({ name: 1 }, { unique: true }); // unique index on name

export const Countries = mongoose.model("countries", countrySchema);
