import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default:
        "https://blog.kanalysis.com/wp-content/uploads/2023/01/placeholder-116.png",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

export default Post;
