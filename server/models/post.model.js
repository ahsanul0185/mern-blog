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
        "https://theroostingplace.blog/wp-content/uploads/2020/12/qi-bin-w4hbafegiac-unsplash.jpg",
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
