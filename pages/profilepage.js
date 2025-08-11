import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../api/userApi'; // adjust import
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import Spinner from "@/components/Spinner";
export default function ProfilePage() {
   const userId = useSelector((state) => state?.user.user?._id) || "";
  const dispatch = useDispatch();
const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    mobile: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);
  // Fetch user data and prefill
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setSpinner(true);
        const data = await getUserProfile(token);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          dob: data.dob ? data.dob.split('T')[0] : '',
          gender: data.gender || '',
          mobile: data.mobile || '',
        });
        dispatch(setUser(data));
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile.');
      }finally{
        setSpinner(false);
      }
    };

    if (token) fetchProfile();
  }, [token, dispatch]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
  
    if (formData.mobile && !formData.mobile.match(/^\d{10}$/)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
  
    try {
      await updateUserProfile(userId, formData, token); // Pass user._id here
      setMessage('Profile updated successfully.');
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Update failed');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
         {spinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <Spinner /> 
        </div>
      )}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                inputMode="numeric"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ''); // remove non-digit characters
                  setFormData((prev) => ({ ...prev, mobile: val }));
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black/30"
                placeholder="Enter 10-digit mobile number"
              />
              {formData.mobile && formData.mobile.length !== 10 && (
                <p className="text-sm text-red-500 mt-1">Mobile number must be 10 digits</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded cursor-pointer ${
                      formData.gender === option ? "bg-black text-white" : "bg-white text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                      className="hidden"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-black/30"
              />
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-full hover:opacity-90 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
