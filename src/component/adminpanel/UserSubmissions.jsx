import React, { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://apis.innobrains.pk/api/contact");
        if (!response.ok) {
          throw new Error("Failed to fetch user submissions");
        }
        const data = await response.json();
        setSubmissions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching visitors:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        const response = await fetch(`https://apis.innobrains.pk/api/contact/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error("Failed to delete submission");
        }
        
        // Remove the deleted item from the state
        setSubmissions(submissions.filter(submission => submission._id !== id));
      } catch (error) {
        console.error("Error deleting submission:", error);
        alert("Failed to delete submission. Please try again.");
      }
    }
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="w-[80%] ml-auto p-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">User Contact Submissions</h1>
        <div className="flex justify-center items-center h-64 bg-[#F0F7FF] rounded-lg shadow-sm">
          <div className="text-xl text-[#3B82F6] flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading submissions...
          </div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="w-[80%] ml-auto p-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">User Contact Submissions</h1>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm">
          <p className="font-medium">Error loading submissions</p>
          <p className="mt-1">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  // Display empty state
  if (submissions.length === 0) {
    return (
      <div className="w-[80%] ml-auto p-6">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">User Contact Submissions</h1>
        <div className="bg-[#F0F7FF] border border-[#DBEAFE] text-[#1E40AF] px-6 py-10 rounded-lg shadow-sm text-center">
          <svg className="mx-auto h-12 w-12 text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mt-4 text-xl font-medium">No submissions found</p>
          <p className="mt-2 text-[#3B82F6]">Contact form submissions will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%] ml-auto p-6">
      <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">User Contact Submissions</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white overflow-hidden">
          <thead className="bg-[#103153] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((submission, index) => (
              <tr 
                key={submission._id} 
                className={`hover:bg-[#F0F7FF] transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{`${submission.FirstName} ${submission.LastName}`}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">{submission.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">{submission.number}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 max-h-24 overflow-y-auto pr-2">
                    {submission.message}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => handleDelete(submission._id)}
                    className="text-white bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label="Delete submission"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSubmissions;