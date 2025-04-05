import React from 'react';

const UserSubmissions = () => {
  const submissions = [
    {
      firstName: 'Ali',
      lastName: 'Khan',
      email: 'ali@example.com',
      phone: '123-456-7890',
      message: 'Hello, I need help with my account.',
    },
    {
      firstName: 'Sara',
      lastName: 'Ahmed',
      email: 'sara@example.com',
      phone: '987-654-3210',
      message: 'Can you assist me with my order?',
    },
    // Add more submissions as needed
  ];

  return (
    <div className="w-[80%] ml-auto  p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Contact Submissions</h1>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border-b px-4 py-2 text-left">Full Name</th>
            <th className="border-b px-4 py-2 text-left">Email</th>
            <th className="border-b px-4 py-2 text-left">Phone Number</th>
            <th className="border-b px-4 py-2 text-left">Message</th>
            <th className="border-b px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition duration-200">
              <td className="border px-4 py-2">{`${submission.firstName} ${submission.lastName}`}</td>
              <td className="border px-4 py-2">{submission.email}</td>
              <td className="border px-4 py-2">{submission.phone}</td>
              <td className="border px-4 py-2">{submission.message}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">View</button> */}
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">Delete</button>
                  {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">Respond</button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSubmissions;
