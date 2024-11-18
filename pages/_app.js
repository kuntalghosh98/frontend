// pages/_app.js
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.css';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';


import '../components/fontawesome';
import NavBar from '@/components/Header/NavBar';



function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      
      <NavBar/>
      <Component {...pageProps} />
     
    
      </Provider>
  );
}

export default MyApp;

