'use client';

import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: {
          id: params.id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Blog not found
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 py-5 px-5 md:px-12 lg:px-28 animate-fadeIn shadow-md">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              height={40}
              alt="Logo"
              className="w-[130px] sm:w-auto hover:opacity-90 transition-opacity duration-300"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-xl bg-black text-white hover:bg-white hover:text-black transition-colors duration-300">
            Get Started
            <Image
              src={assets.arrow}
              alt="Arrow Icon"
              width={16}
              height={16}
              className="ml-2"
            />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-3xl sm:text-5xl font-extrabold max-w-[700px] mx-auto text-gray-900">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border-4 border-white rounded-full shadow-2xl"
            src={data.authorImg}
            width={60}
            height={60}
            alt="Author"
          />
          <p className="mt-2 text-lg text-gray-700">{data.author}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-80px] mb-16 animate-fadeIn">
        <Image
          className="border-4 border-white rounded-lg shadow-2xl"
          src={data.image}
          width={1150}
          height={620}
          alt={data.title}
        />
        <div className="block-content" dangerouslySetInnerHTML={{__html:data.description}}></div>

        {/* Social Media Share Section */}
        <div className="my-24">
          <p className="text-xl font-semibold text-gray-900 mb-4">
            Share this article on social media
          </p>
          <div className="flex space-x-4">
            <Image
              src={assets.facebook_icon}
              width={50}
              height={50}
              alt="Facebook"
              className="hover:scale-110 transition-transform duration-200"
            />
            <Image
              src={assets.twitter_icon}
              width={50}
              height={50}
              alt="Twitter"
              className="hover:scale-110 transition-transform duration-200"
            />
            <Image
              src={assets.googleplus_icon}
              width={50}
              height={50}
              alt="Google Plus"
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Page;





