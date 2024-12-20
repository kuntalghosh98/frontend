// pages/index.js
// pages/index.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { setUser,isDataAvailable } from '../store/slices/userSlice';
import { fetchProducts } from '../store/slices/productSlice';
import axios from 'axios';
import axiosInstance from '../lib/axios';
import ProductCard from '../components/Product/ProductCard';
import Layout from '../components/Layout/Layout';
import MediaBanner from '../components/MediaBanner'; // Import MediaBanner component
import NavBar from '@/components/Header/NavBar';
import HorizontalScrollCard from '@/components/Cards/HorizontalScrollCard';
import Carousel from '@/components/Carousel/Carousel';
import Banner from '@/components/Banners/Banner';
import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
import CategoryCardScroll from '@/components/Cards/CategoryCardScroll';
import { setCartItems } from '../store/slices/cartSlice';
import { url } from '@/constant';
// import jwt_decode from 'jwt-decode';

const HomePage = ({ banner, cards,highlightedProduct1,highlightedProduct2,newArrivalList,categoryBanner1 }) => {

 
   
  // highlightedProducts1();
  console.log("highlighted newArrivalList",newArrivalList)
  console.log("---------------------",categoryBanner1);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const { items, status, error } = useSelector((state) => state.products);

  // Example of fetching user data on page load
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      console.log("home page token", token)
      const response = await axios.get(`${url}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(response.data));
      setUserId(response.data._id);
      console.log('User data:', response.data._id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${url}/api/cart/${userId}`);
      console.log("cart items", response.data.items)

      dispatch(setCartItems(response.data.items));
    } catch (e) {
      console.log("cart is empty")
    }

  };

  // Call fetchUserData when the component mounts or page loads
  useEffect(() => {
    dispatch(isDataAvailable(true))
    fetchUserData();
  }, []);


  useEffect(() => {
    if (userId) {
      console.log("user id present");
      fetchCart();
    }
  }, [userId]);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      
    }
  }, [dispatch, status]);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // setUserId(decodedToken.id);
        // setUserName(decodedToken.name);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle error, such as clearing invalid token from localStorage
        localStorage.removeItem('token');
      }
    }
  }, []);
  console.log("index:", userId)

  console.log("home page:")
  return (

    <div className="w-full mx-auto bg-red-100">
      <NavBar />

      <MediaBanner banner={banner} />
      <div><h6 style={{ "display": "flex", "justifyContent": "center", "width": "full", "padding": "10px", "fontSize": "60px" }}>HEIGHLIGHTS</h6></div>
      <div className="w-full py-4">
        {/* <Carousel items={cards} /> */}
        <HorizontalScrollCard cards={categoryBanner1[1].cards} />
      </div>
      <Banner cardData={highlightedProduct1}  />
      <div><h6 style={{ "display": "flex", "justifyContent": "center", "width": "full", "padding": "10px", "fontSize": "60px" }}>CATAGORY</h6></div>
      <HorizontalScrollCard cards={categoryBanner1[0].cards} />
      <div>
        <Banner cardData={highlightedProduct2}  />

        <div><h6 style={{ "display": "flex", "justifyContent": "center", "width": "full", "padding": "10px", "fontSize": "60px" }}>New Arrival</h6></div>
        <ProductScrollBanner products={newArrivalList} />

        {/* <CategoryCardScroll products={productData1}/> */}

      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-600">No products available</p>
          )}
        </div> */}
    </div>

  );
};

export const getServerSideProps = async () => {
  try {

    const highlightedProducts= await axios.get(`${url}/api/highlighted-products`);
   const highlightedProduct1=highlightedProducts.data[0];
   const highlightedProduct2=highlightedProducts.data[1];
   const newArrivals=await axios.get(`${url}/api/newarrivals`)
   const newArrivalList=newArrivals.data
   
    const banner = `${url}/uploads/banner_ 1720212570132.jpg`;
 const categoryBanner=await axios.get(`${url}/api/banners/`)
 const categoryBanner1=categoryBanner.data;
 console.log(categoryBanner.data)
    const cards = [
      { imageUrl: `${url}/uploads/banner_ 1720212570132.jpg`, route: '/path_to_route_1' },
      { imageUrl: `${url}/uploads/banner_ 1720212570132.jpg`, route: '/path_to_route_1' },
      { imageUrl: `${url}/uploads/banner_ 1720212570132.jpg`, route: '/path_to_route_1' },
      { imageUrl: `${url}/uploads/banner_ 1720212570132.jpg`, route: '/path_to_route_1' },

      // Add more cards as needed
    ];
    
   


    return {
      props: {
       
        banner,
        cards,
        highlightedProduct1,
        highlightedProduct2,
        newArrivalList,
        categoryBanner1
      
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        banner: [],

      },
    };
  }
};

export default HomePage;
