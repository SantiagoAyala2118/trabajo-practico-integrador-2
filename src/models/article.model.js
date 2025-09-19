import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  title: {
    String,
    minlength: 3,
    maclength: 200,
  },
  content: {
    String,
    minlength: 50,
  },
  excerpt: {
    String,
    maxlength: 500,
    required: false,
  },
  status: {
    String,
    enum: ["published", "archived"],
    default: "published",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "Tag",
  },
});

export const ArticleModel = model("Article", articleSchema);
