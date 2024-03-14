import mongoose, { Schema } from "mongoose";

const emissionStatusTypesSchema = new Schema({
  type: {
    type: String,
    trim: true,
  },
});

export const EmissionStatusTypes = mongoose.model("emissionStatusTypes", emissionStatusTypesSchema);
