import React from 'react';
import { toast } from 'react-toastify';

const SubsTableItems = ({ email, mongoId, deleteEmail }) => {

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this email subscription?')) {
      try {
        await deleteEmail(mongoId);
        toast.success('Email subscription deleted successfully!');
      } catch (error) {
        console.error('Deletion error:', error); // Optional: Log error details for debugging
        toast.error('Failed to delete email subscription. Please try again later.');
      }
    }
  };

  return (
    <tr className='bg-white border-b text-left'>
      <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email || 'No Email'}
      </td>
      <td className='px-6 py-4 cursor-pointer'>
        <button 
          onClick={handleDelete} 
          className='text-red-600 hover:text-red-800 focus:outline-none'
          aria-label={`Delete subscription for ${email}`} // Accessibility improvement
        >
          x
        </button>
      </td>
    </tr>
  );
};

export default SubsTableItems;



