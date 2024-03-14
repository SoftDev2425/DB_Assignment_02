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
    trim: true,
  },
  methodology: {
    type: String,
    trim: true,
  },
  methodologyDetails: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  gassesIncluded: {
    type: String,
    trim: true,
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
