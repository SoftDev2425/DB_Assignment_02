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
  organisationID: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
  emissionStatusTypeID: {
    type: Schema.Types.ObjectId,
    ref: "emissionStatusTypes",
  },
});

export const GHG_Emissions = mongoose.model("GHG_emissions", GHG_EmissionsSchema);
