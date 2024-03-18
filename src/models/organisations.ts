import mongoose, { Schema } from "mongoose";

const organisationSchema = new Schema({
  accountNo: {
    type: Number,
  },
  name: {
    type: String,
    trim: true,
  },
  cityID: {
    type: Schema.Types.ObjectId,
    ref: "cities",
  },
  countryID: {
    type: Schema.Types.ObjectId,
    ref: "countries",
  },
});

organisationSchema.index({ name: 1 }, { unique: true }); // unique index on name

export const Organisations = mongoose.model("organisations", organisationSchema);
