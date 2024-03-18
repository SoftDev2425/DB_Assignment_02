import mongoose, { Schema } from "mongoose";

const populationSchema = new Schema({
  count: {
    type: Number,
  },
  year: {
    type: Number,
  },
  cityID: {
    type: Schema.Types.ObjectId,
    ref: "cities",
  },
});

export const Populations = mongoose.model("populations", populationSchema);
