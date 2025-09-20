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

//PARA LA ELIMINACIÓN EN CASCADA
articleSchema.post("findByIdAndDelete", async (doc) => {
  if (!doc) return;

  const CommentModel = model("Comment");

  await CommentModel.deleteMany({ article: doc._id });
});

//PARA LOS POPULATES INVERSOS
articleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
  justOne: false,
});

articleSchema.set("toJSON", { virtuals: true });

export const ArticleModel = model("Article", articleSchema);
