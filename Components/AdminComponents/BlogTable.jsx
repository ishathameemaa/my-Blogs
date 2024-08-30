import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const BlogTable = ({ authorImg, title, author, deleteBlog, mongoId }) => {
  return (
    <tr className='bg-white border-b'>
      <th
        scope='col'
        className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
      >
        <Image
          width={40}
          height={40}
          src={authorImg ? authorImg : assets.profile_icon}
          alt='Author Image'
        />
        <p>{author ? author : 'No author'}</p>
      </th>
      <td className='px-6 py-4'>{title ? title : 'No title'}</td>
      <td className='px-6 py-4 cursor-pointer' onClick={() => deleteBlog(mongoId)}>
        X
      </td>
    </tr>
  );
};

export default BlogTable;



