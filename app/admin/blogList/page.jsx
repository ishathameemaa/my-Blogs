'use client';
import BlogTable from "@/Components/AdminComponents/BlogTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          _id: mongoId,
        },
      });
      toast.success(response.data.msg);
      fetchBlogs(); // Refresh the list of blogs
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-auto mt-4 border border-gray-400 scroll-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-bg-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTable 
                key={index} 
                mongoId={item._id} 
                title={item.title} 
                author={item.author} 
                authorImg={item.authorImg} 
                 // Pass the date to BlogTable
                deleteBlog={deleteBlog} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;






