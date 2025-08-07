import React from 'react'
import { useRouter } from 'next/router';
function LoginModal({setShowLoginModal}) {
    const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
      <h2 className="text-xl font-semibold mb-4">Login Required</h2>
      <p className="mb-6 text-gray-600">Please login to proceed to shipping.</p>
      <button
        onClick={() => router.push(`/loginregister?redirect=${router.asPath}`)}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Login Now
      </button>
      <button
        onClick={() => setShowLoginModal(false)}
        className="block mt-4 text-sm text-gray-500 underline"
      >
        Cancel
      </button>
    </div>
  </div>
  )
}

export default LoginModal
