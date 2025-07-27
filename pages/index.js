

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { jwtDecode } from "jwt-decode";
// import { setUser, isDataAvailable } from '../store/slices/userSlice';
// import { fetchProducts } from '../store/slices/productSlice';
// import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
// import axios from 'axios';
// import { setCartItems } from '../store/slices/cartSlice';
// import { setAddresses } from '@/store/slices/addressSlice';
// import { fetchNewArrivals } from '@/store/slices/newArrivalsSlice';
// import { fetchHighlightedProducts } from '@/store/slices/highlightedProductsSlice';
// import { fetchProductScrollList } from '@/store/slices/productScrollListSlice';
// import { url } from '@/constant';

// import MediaBanner from '../components/MediaBanner';
// import HorizontalScrollCard from '@/components/Cards/HorizontalScrollCard';
// import Banner from '@/components/Banners/Banner';
// import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
// import ReelsBanner from '@/components/Reels/ReelsBanner';


// const HomePage = () => {

//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

 

//   const fetchUserData = async () => {
//     console.log("------------------user data called----");

//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await axios.get(`${url}api/users/profile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         dispatch(setUser(response.data));
//         setUserId(response.data._id);
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//       }
//     }
//   };

//   const fetchCartAndAddress = async (userId) => {
//     console.log("------------------address data called----");

//     try {
//       const cartRes = await axios.get(`${url}api/cart/${userId}`);
//       dispatch(setCartItems(cartRes.data.items));

//       const addressRes = await axios.get(`${url}api/address/${userId}`);
//       dispatch(setAddresses(addressRes.data));
//     } catch (err) {
//       console.log('Cart or Address empty', err);
//     }
//   };

//   useEffect(() => {
//     dispatch(isDataAvailable(true));
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchCartAndAddress(userId);
//     }
//   }, [userId]);

 
//   const newArrivals = useSelector((state) => state.newArrivals.newArrivals);
//   const highlightedProducts = useSelector((state) => state.highlightedProducts.highlightedProducts);
//   const productScrollList = useSelector((state) => state.productScrollList.productScrollList);
//   const categoryBanner = useSelector((state) => state.bannerCards.items.data);
//   useEffect(() => {
//     const fetchAllDataX = async () => {
//       if (
//         newArrivals.length < 1 ||
//         highlightedProducts.length < 1 ||
//         productScrollList.length < 1 ||
//         categoryBanner.length < 1
//       ) {
//         console.log('------multiple if condition------------');
//         try {
//           await Promise.all([
//             dispatch(fetchNewArrivals()),
//             dispatch(fetchHighlightedProducts()),
//             dispatch(fetchProductScrollList()),
//             dispatch(fetchBannerCards()),
//           ]);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         // In case data is already present
//         setIsLoading(false);
//       }
//     };
  
//     fetchAllDataX();
//   }, [dispatch]);
  
    
  

//   console.log("categoryBanner", categoryBanner);
//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <p className="text-xl">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto bg-red-50">
//       <MediaBanner text="Welcome to Our Store" />
//       <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">CATEGORY</h6>

//       <div className="w-full py-4">
//         <HorizontalScrollCard cards={categoryBanner[0]?.cards || []} />
//       </div>

//       <Banner cardData={highlightedProducts.data[0]} />
//       <div><h6 className="flex justify-center w-full p-2 text-4xl font-semibold">New Arrival</h6></div>
//       <ProductScrollBanner products={newArrivals} />
//       <ReelsBanner />

//       <div>
//         <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">
//           {productScrollList[0]?.name}
//         </h6>
//         <ProductScrollBanner products={productScrollList[0]?.productIds || []} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
 








import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, isDataAvailable } from '../store/slices/userSlice';
import { setCartItems } from '../store/slices/cartSlice';
import { setAddresses } from '@/store/slices/addressSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchNewArrivals } from '@/store/slices/newArrivalsSlice';
import { fetchHighlightedProducts } from '@/store/slices/highlightedProductsSlice';
import { fetchProductScrollList } from '@/store/slices/productScrollListSlice';
import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
import { getUserProfile, getCart, getAddress } from '@/api/userApi'; // Abstracted API calls
import MediaBanner from '../components/MediaBanner';
import HorizontalScrollCard from '@/components/Cards/HorizontalScrollCard';
import Banner from '@/components/Banners/Banner';
import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
import ReelsBanner from '@/components/Reels/ReelsBanner';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const newArrivals = useSelector((state) => state.newArrivals.newArrivals);
  const highlightedProducts = useSelector((state) => state.highlightedProducts.highlightedProducts);
  const productScrollList = useSelector((state) => state.productScrollList.productScrollList);
  const categoryBanner = useSelector((state) => state.bannerCards.items.data);
console.log("productScrollList", productScrollList);
  const initializeData = async () => {
    try {
      const token = localStorage.getItem('token');

      if ( !token) {
        console.warn('No token found. Proceeding as a guest user.');
      } else {
        // Check if the token is expired
       
  
        // Fetch user-specific data
        const userProfile = await getUserProfile(token);
        console.log("Token:", userProfile);
          if(userProfile){
          dispatch(setUser(userProfile));
          dispatch(isDataAvailable(true));
          const [cartData, addressData] = await Promise.all([
            getCart(userProfile._id),
            getAddress(userProfile._id),
          ]);
          dispatch(setCartItems(cartData.items));
          dispatch(setAddresses(addressData));
        }
      }
  
      // Fetch general data (accessible to all users)
      await Promise.all([
        dispatch(fetchNewArrivals()),
        dispatch(fetchHighlightedProducts()),
        dispatch(fetchProductScrollList()),
        dispatch(fetchBannerCards()),
      ]);
    } catch (err) {
      console.error('Error initializing data:', err);
      setError(err.message || 'An error occurred while loading data.');
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    initializeData();
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-[#f9f7f3]">
      <MediaBanner text="The classic Aura" />
      <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">CATEGORY</h6>
      <div className="w-full py-4">
        <HorizontalScrollCard cards={categoryBanner[0]?.cards || []} />
      </div>
      <Banner cardData={highlightedProducts.data[0]} />
      <div>
        <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">New Arrival</h6>
      </div>
      <ProductScrollBanner products={newArrivals} />
      <ReelsBanner />
      <div>
        <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">
          {productScrollList.data[0]?.name}
        </h6>
        <ProductScrollBanner products={productScrollList.data[0]?.productIds || []} />
      </div>
    </div>
  );
};

export default HomePage;