import { match } from "assert";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    String,
    unique: true,
    match: /.+\@.+\..+/,
  },
  password: {
    String,
    required: true,
  },
  role: {
    String,
    enum: ["user", "admin"],
    default: "user",
  },
  profile: {
    firstName: {
      String,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      String,
      minlength: 2,
      maxlength: 50,
    },
    biography: {
      String,
      maxlength: 500,
      required: false,
    },
    avatarUrl: {
      String,
      required: false,
      match: /^(https?|ftp):\/\/[^\s"]+$/i,
    },
    birthDate: {
      Date,
      required: false,
    },
  },
});

export const UserModel = model("User", userSchema);
