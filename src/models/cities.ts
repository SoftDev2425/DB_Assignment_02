import mongoose, { Schema } from "mongoose";

const citySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  c40Status: {
    type: Boolean,
  },
  countryId: {
    type: Schema.Types.ObjectId,
    ref: "countries",
  },
});

export const Cities = mongoose.model("cities", citySchema);
