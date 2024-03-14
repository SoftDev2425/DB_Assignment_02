import mongoose, { Schema } from "mongoose";

const countrySchema = new Schema({
  name: {
    type: String,
    maxlength: 200,
  },
  regionName: {
    type: String,
    maxlength: 200,
  },
});

export const Countries = mongoose.model("countries", countrySchema);
