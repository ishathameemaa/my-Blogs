"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bannet",
    authorImg: "/author_img.png",
  });

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bannet",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error occurred while submitting the form");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      const preview = URL.createObjectURL(file);
      setImage(Object.assign(file, { preview }));
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="pt-5 px-5 sm:pt-12 sm:px-8 md:px-16 lg:px-24 xl:px-32"
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Upload Thumbnail</p>
            <label htmlFor="image" className="cursor-pointer mt-4">
              <Image
                className="object-cover rounded-lg"
                src={image ? image.preview : assets.upload_area}
                width={180}
                height={100}
                alt="Upload Area"
              />
            </label>
            <input
              onChange={onImageChange}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-semibold">Blog Title</p>
            <input
              name="title"
              onChange={onChangeHandler}
              value={data.title}
              className="mt-2 p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Type here"
              required
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-semibold">Blog Description</p>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              className="mt-2 p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write content here"
              required
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-semibold">Blog Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="mt-2 p-3 border border-black rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 w-full sm:w-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
              disabled={
                !data.title || !data.description || !image || isSubmitting
              }
            >
              {isSubmitting ? "Submitting..." : "Add"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
