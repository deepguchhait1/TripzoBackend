import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    image: { type: String, required: true },
    author: { type: String, default: "Tripzo Team" },
    authorAvatar: { type: String, default: "" },
    authorBio: { type: String, default: "" },
    category: { type: String, required: true },
    readTime: { type: String, default: "5 min read" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
