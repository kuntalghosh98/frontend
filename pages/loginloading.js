import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    // Get the token from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save the token to local storage
      localStorage.setItem('token', token);

      // Remove token from URL
      window.history.replaceState({}, document.title, '/');

      // Fetch user data and store it in Redux
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Store user data in Redux (dispatch an action)
          // Example: dispatch(setUserData(response.data));
          
          // Redirect to the home page
          router.push('/');
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle token expiration or invalid token
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
          }
        }
      };

      fetchUserData();
    } else {
      // Redirect to the login page if no token is found
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
