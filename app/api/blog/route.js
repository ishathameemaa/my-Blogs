import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';

// Connect to the database
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

// API endpoint to get all blogs or a specific blog by ID
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

// API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const imagePath = path.join('./public', `${timestamp}_${image.name}`);
    await writeFile(imagePath, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imgUrl,
      authorImg: formData.get('authorImg'),
    };
    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error('Error adding blog:', error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

// API endpoint to delete a blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('_id');
    if (!id) {
      return NextResponse.json({ msg: "No ID provided" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    const imagePath = path.join('./public', blog.image);
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        }
      });
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}






