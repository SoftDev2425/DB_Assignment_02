import mongoose, { Schema } from "mongoose";

const questionnairesSchema = new Schema({
  name: {
    type: String,
  },
  data: {
    type: String,
  },
  organisationId: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
});

export const Questionnaires = mongoose.model("questionnaires", questionnairesSchema);
