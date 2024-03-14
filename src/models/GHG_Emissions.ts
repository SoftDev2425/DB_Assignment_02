import mongoose, { Schema } from "mongoose";

const GHG_EmissionsSchema = new Schema({
  reportingYear: {
    type: Number,
  },
  measurementYear: {
    type: Number,
  },
  boundary: {
    type: String,
  },
  methodology: {
    type: String,
  },
  methodologyDetails: {
    type: String,
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },
  gassesIncluded: {
    type: String,
  },
  totalCityWideEmissionsCO2: {
    type: Number,
  },
  totalScope1_CO2: {
    type: Number,
  },
  totalScope2_CO2: {
    type: Number,
  },
  organisationId: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
  emissionStatusTypeId: {
    type: Schema.Types.ObjectId,
    ref: "emissionStatusTypes",
  },
});

export const GHG_Emissions = mongoose.model("ghgEmissions", GHG_EmissionsSchema);
