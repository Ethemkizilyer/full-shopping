import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users', {
            headers: { Authorization: token }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleAdmin = async (userId, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/auth/users/${userId}/admin`, { isAdmin: !currentStatus }, {
        headers: { Authorization: token }
      });
      setUsers(users.map(user => user._id === userId ? { ...user, isAdmin: !currentStatus } : user));
    } catch (err) {
      console.error('Error updating user admin status:', err);
      setError('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Kullanıcıyı silmek için emin misiniz?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
            headers: { Authorization: token }
        });
        setUsers(users.filter(user => user._id !== userId)); 
      } catch (err) {
        toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition:Bounce
            });
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center items-center'>
      <h className='my-2 text-3xl font-bold'>Admin Management</h>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead >
          <tr className=''>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Admin</th>
            <th scope="col" className="px-6 py-3  flex justify-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user._id}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.isAdmin ? 'Yes' : 'No'}</td>
              <td className='flex justify-center px-6 py-4 text-right'>
              <button className='btn bg-red-600 p-1 rounded-lg text-white mr-1' onClick={() => handleDelete(user._id)}>Delete</button>
                <button className='btn bg-blue-600 p-1 rounded-lg text-white mr-1' onClick={() => handleToggleAdmin(user._id, user.isAdmin)}>
                  {user.isAdmin ? 'Revoke Admin' : 'Grant Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;
