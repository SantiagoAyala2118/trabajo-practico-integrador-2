import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      minlength: 50,
    },
    excerpt: {
      type: String,
      maxlength: 500,
      required: false,
    },
    status: {
      type: String,
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
  },
  {
    versionKey: false,
  }
);

articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
  justOne: false,
});

articleSchema.set("toJSON", { virtuals: true });

export const ArticleModel = model("Article", articleSchema);
