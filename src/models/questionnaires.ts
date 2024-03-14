import mongoose, { Schema } from "mongoose";

const questionnairesSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  data: {
    type: String,
    trim: true,
  },
  organisationId: {
    type: Schema.Types.ObjectId,
    ref: "organisations",
  },
});

export const Questionnaires = mongoose.model("questionnaires", questionnairesSchema);
