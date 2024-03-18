import mongoose, { Schema } from "mongoose";

const citySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  C40Status: {
    type: Boolean,
  },
  countryID: {
    type: Schema.Types.ObjectId,
    ref: "countries",
  },
});

citySchema.index({ name: 1 }, { unique: true }); // unique index on name

export const Cities = mongoose.model("cities", citySchema);
