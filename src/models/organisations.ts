import mongoose, { Schema } from "mongoose";

const organisationSchema = new Schema({
  accountNo: {
    type: Number,
  },
  name: {
    type: String,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: "cities",
  },
  countryId: {
    type: Schema.Types.ObjectId,
    ref: "countries",
  },
});

export const Organisations = mongoose.model("organisations", organisationSchema);
