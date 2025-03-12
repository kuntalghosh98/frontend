// pages/_app.js
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.css';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


import '../components/fontawesome';
import NavBar from '@/components/Header/NavBar';
import Footer from '@/components/Footer';
import NavBar1 from '@/components/Header/NavBar1';
import LoadingScreen from '@/components/LoadingScreen';



function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      {/* Page Wrapper to Keep Footer at the Bottom */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <NavBar />
{/* <NavBar1/> */}
        {/* Main Content - Pushes footer down when content is short */}
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
     
    </Provider>
  );
}


export default MyApp;

