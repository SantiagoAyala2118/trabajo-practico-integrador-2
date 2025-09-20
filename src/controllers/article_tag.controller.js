import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";

export const addTagToArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const newArticleTag = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $addToSet: { tags: tagId },
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Tag added to article succesfuly",
      Article: newArticleTag,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};

export const removeTagFromArticle = async (req, res) => {
  const { articleId, tagId } = req.params;
  try {
    const deleteArticleTag = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $pull: { tags: tagId },
      },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      message: "Tag succesfuly removed from de article",
      ArticleTag: deleteArticleTag,
    });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      message: "Server error",
    });
  }
};
