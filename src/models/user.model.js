import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      firstName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      lastName: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      biography: {
        type: String,
        maxlength: 500,
        required: false,
      },
      avatarUrl: {
        type: String,
        required: false,
        match: /^(https?|ftp):\/\/[^\s"]+$/i,
      },
      birthDate: {
        type: Date,
        required: false,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

//PARA HACER POPULATES INVERSOS
userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

userSchema.set("toJSON", { virtuals: true });

export const UserModel = model("User", userSchema);
