import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: 2,
      maxlength: 30,
      match: /^\S+$/,
    },
    description: {
      type: String,
      required: false,
      maxlength: 200,
    },
  },
  {
    versionKey: false,
  }
);

//PARA LA ELIMINACIÓN EN CASCADA
tagSchema.post("findByIdAndDelete", async (doc) => {
  if (!doc) return;

  const ArticleModel = model("Article");

  await ArticleModel.updateMany(
    { tags: doc._id },
    { $pull: { tags: doc._id } }
  );
});

//PARA LOS POPULATES INVERSOS
tagSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "tags",
  justOne: false,
});

tagSchema.set("toObject", { virtuals: true });
tagSchema.set("toJSON", { virtuals: true });

export const TagModel = model("Tag", tagSchema);
