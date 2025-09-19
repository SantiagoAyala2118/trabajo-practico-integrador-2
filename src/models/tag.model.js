import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  name: {
    String,
    unique: true,
    minlength: 2,
    maxlength: 30,
    match: /^\S+$/,
  },
  description: {
    String,
    required: false,
    maxlength: 200,
  },
});

export const TagModel = model("Tag", tagSchema);
