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
        const response = await fetch("https://apis.innobrains.pk/api/visitor");
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
        const response = await fetch(`https://apis.innobrains.pk/api/visitor/${id}`, {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Contact Submissions</h1>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="w-[80%] ml-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Contact Submissions</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading submissions: {error}</p>
          <p>Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  // Display empty state
  if (submissions.length === 0) {
    return (
      <div className="w-[80%] ml-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Contact Submissions</h1>
        <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-8 rounded text-center">
          <p className="text-xl">No submissions found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%] ml-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Contact Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border-b px-4 py-2 text-left">Full Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Phone Number</th>
              <th className="border-b px-4 py-2 text-left">Message</th>
              <th className="border-b px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="border px-4 py-2">{`${submission.FirstName} ${submission.LastName}`}</td>
                <td className="border px-4 py-2">{submission.email}</td>
                <td className="border px-4 py-2">{submission.number}</td>
                <td className="border px-4 py-2">
                  <div className="max-h-24 overflow-y-auto">
                    {submission.message}
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button 
                    onClick={() => handleDelete(submission._id)}
                    className="text-red-500 hover:text-red-700 p-2 inline-flex items-center justify-center rounded-full hover:bg-red-100 transition duration-200"
                    aria-label="Delete submission"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-lg" />
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