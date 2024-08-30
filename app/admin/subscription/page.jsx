'use client';
import SubsTableItems from '@/Components/AdminComponents/SubsTableItems';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (mongoId) => {
    setLoading(true);
    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        // Optimistically update the state
        setEmails((prevEmails) => prevEmails.filter((email) => email._id !== mongoId));
      } else {
        toast.error('Error: ' + response.data.msg);
      }
    } catch (error) {
      toast.error('Failed to delete email');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Email Subscription</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubsTableItems
                key={item._id}
                mongoId={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;




