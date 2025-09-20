import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      minlength: 5,
      maxlength: 500,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    versionKey: false,
  }
);

export const CommentModel = model("Comment", commentSchema);
