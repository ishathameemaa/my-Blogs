import mongoose from "mongoose";

// Define the Blog schema
const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now()
  }
});

// Export the Blog model, or create it if it doesn't exist
const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModel;


