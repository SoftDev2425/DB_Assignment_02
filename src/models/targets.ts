import mongoose, { Schema } from "mongoose";

const targetSchema = new Schema({
  reportingYear: {
    type: Number,
  },
  baselineYear: {
    type: Number,
  },
  targetYear: {
    type: Number,
  },
  reductionTargetPercentage: {
    type: Number,
  },
  baselineEmissionsCO2: {
    type: Number,
  },
  comment: {
    type: String,
  },
  organisationID: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
  sectorID: {
    type: Schema.Types.ObjectId,
    ref: "sectors",
  },
  targetTypeID: {
    type: Schema.Types.ObjectId,
    ref: "targetTypes",
  },
});

export const Targets = mongoose.model("targets", targetSchema);
