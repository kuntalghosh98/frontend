import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { clearUser, logout } from '../store/slices/userSlice'; // Adjust the path as needed

const Profile = () => {
  const user = useSelector((state) => state.user.user); // Adjust based on your state structure
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <p className="text-gray-700">Name: {user?.name}</p>
          <p className="text-gray-700">Email: {user?.email}</p>
        </div>
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
