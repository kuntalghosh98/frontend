// import React, { useState, useEffect, use } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser, isDataAvailable } from '../store/slices/userSlice';
// import { setCartItems } from '../store/slices/cartSlice';
// import { setAddresses } from '@/store/slices/addressSlice';
// import { fetchProducts } from '../store/slices/productSlice';
// import { fetchNewArrivals } from '@/store/slices/newArrivalsSlice';
// import { fetchHighlightedProducts } from '@/store/slices/highlightedProductsSlice';
// import { fetchProductScrollList } from '@/store/slices/productScrollListSlice';
// import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
// import { getUserProfile, getCart, getAddress } from '@/api/userApi'; // Abstracted API calls
// import MediaBanner from '../components/MediaBanner';
// import HorizontalScrollCard from '@/components/Cards/HorizontalScrollCard';
// import Banner from '@/components/Banners/Banner';
// import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
// import ReelsBanner from '@/components/Reels/ReelsBanner';

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const newArrivals = useSelector((state) => state.newArrivals.newArrivals);
//   const highlightedProducts = useSelector((state) => state.highlightedProducts.highlightedProducts);
//   const productScrollList = useSelector((state) => state.productScrollList.productScrollList);
//   const categoryBanner = useSelector((state) => state.bannerCards.items.data);
// console.log("productScrollList", productScrollList);
//   const initializeData = async () => {
//     try {
//       const token = localStorage.getItem('token');

//       if ( !token) {
//         console.warn('No token found. Proceeding as a guest user.');
//       } else {
//         // Check if the token is expired
       
  
//         // Fetch user-specific data
//         const userProfile = await getUserProfile(token);
//         console.log("Token:", userProfile);
//           if(userProfile){
//           dispatch(setUser(userProfile));
//           dispatch(isDataAvailable(true));
//           const [cartData, addressData] = await Promise.all([
//             getCart(userProfile._id),
//             getAddress(userProfile._id),
//           ]);
//           dispatch(setCartItems(cartData.items));
//           dispatch(setAddresses(addressData));
//         }
//       }
  
//       // Fetch general data (accessible to all users)
//       await Promise.all([
//         dispatch(fetchNewArrivals()),
//         dispatch(fetchHighlightedProducts()),
//         dispatch(fetchProductScrollList()),
//         dispatch(fetchBannerCards()),
//       ]);
//     } catch (err) {
//       console.error('Error initializing data:', err);
//       setError(err.message || 'An error occurred while loading data.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
 
//   useEffect(() => {
//     initializeData();
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <p className="text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <p className="text-xl text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto bg-[#f9f7f3]">
//       <MediaBanner text="The classic Aura" />
//       <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">CATEGORY</h6>
//       <div className="w-full py-4">
//         <HorizontalScrollCard cards={categoryBanner[0]?.cards || []} />
//       </div>
//       <Banner cardData={highlightedProducts.data[0]} />
//       <div>
//         <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">New Arrival</h6>
//       </div>
//       <ProductScrollBanner products={newArrivals} />
//       <ReelsBanner />
//       <div>
//         <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">
//           {productScrollList.data[0]?.name}
//         </h6>
//         <ProductScrollBanner products={productScrollList.data[0]?.productIds || []} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;



import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
import { fetchHighlightedProducts } from '@/store/slices/highlightedProductsSlice';
import { fetchNewArrivals } from '@/store/slices/newArrivalsSlice';
import { fetchProductScrollList } from '@/store/slices/productScrollListSlice';
import { fetchProducts } from '@/store/slices/productSlice';
import { setUser, isDataAvailable } from '@/store/slices/userSlice';
import { setCartItems } from '@/store/slices/cartSlice';
import { setAddresses } from '@/store/slices/addressSlice';

import { getUserProfile, getCart, getAddress } from '@/api/userApi';

import MediaBanner from '@/components/MediaBanner';
import HorizontalScrollCard from '@/components/Cards/HorizontalScrollCard';
import Banner from '@/components/Banners/Banner';
import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
import CategorySkeleton from "@/components/Skeletons/CategorySkeleton";
import ProductScrollSkeleton from "@/components/Skeletons/ProductScrollSkeleton";
import BannerSkeleton from "@/components/Skeletons/BannerSkeleton";

import { useInView } from 'react-intersection-observer';

// const ReelsBanner = lazy(() => import('@/components/Reels/ReelsBanner'));

import dynamic from "next/dynamic";
const ReelsBanner = dynamic(() => import('@/components/Reels/ReelsBanner'), { ssr: false });


const HomePage = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: true });
  const categoryBanner = useSelector((state) => state.bannerCards.items.data);
  const highlightedProducts = useSelector((state) => state.highlightedProducts.highlightedProducts);
  const newArrivals = useSelector((state) => state.newArrivals.newArrivals);
  const productScrollList = useSelector((state) => state.productScrollList.productScrollList);

  const initializeUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const userProfile = await getUserProfile(token);
      if (userProfile) {
        dispatch(setUser(userProfile));
        dispatch(isDataAvailable(true));
        const [cartData, addressData] = await Promise.all([
          getCart(userProfile._id),
          getAddress(userProfile._id),
        ]);
        dispatch(setCartItems(cartData.items));
        dispatch(setAddresses(addressData));
      }
    } catch (error) {
      console.error('User initialization failed:', error);
    } finally {
      // setStep(0); // Start loading home data after user is ready (or skipped)
    }
  };

  const loadInitialData = async () => {
    try {
      

     
      //   await dispatch(fetchBannerCards());
      //   setLoadingStep(1);
      //   await dispatch(fetchHighlightedProducts());
      //   setLoadingStep(2);
      //   await dispatch(fetchNewArrivals());
      //   setLoadingStep(3);
      //   await dispatch(fetchProductScrollList());
       
      // dispatch(fetchProducts());
        
        dispatch(fetchBannerCards()).unwrap();
        dispatch(fetchHighlightedProducts()).unwrap();
        dispatch(fetchNewArrivals()).unwrap();
        dispatch(fetchProductScrollList()).unwrap();
        dispatch(fetchProducts()).unwrap();
        


    } catch (err) {
      console.error('Error loading homepage:', err);
      setError('Something went wrong loading homepage data.');
    }
  };

  useEffect(() => {
    const alreadyLoaded = localStorage.getItem('homeDataLoaded');
    if (!alreadyLoaded) {
      initializeUser();
      localStorage.setItem('homeDataLoaded', 'true');
    }
  }, []);

 
  const alreadyLoaded = useSelector((state) => state.bannerCards.items?.data?.length > 0);

useEffect(() => {
  console.log("Already loaded:", alreadyLoaded);
  if (!alreadyLoaded) {
    loadInitialData();
  } 
}, []);

 

  return (
    <div className="w-full mx-auto bg-[#f9f7f3]">
      <MediaBanner text="The classic Aura" />

      {categoryBanner ? (
        <>
          <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">CATEGORY</h6>
          <div className="w-full py-4">
            <HorizontalScrollCard cards={categoryBanner[0]?.cards || []} />
          </div>
        </>
      ) : (
        <CategorySkeleton />
      )}

      {highlightedProducts?.data ? (
        <Banner cardData={highlightedProducts.data[0]} />
      ) : (
        <BannerSkeleton />
      )}

      {newArrivals?.length > 0 ? (
        <>
          <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">New Arrival</h6>
          <ProductScrollBanner products={newArrivals} />
        </>
      ) : (
        <ProductScrollSkeleton />
      )}

      {/* <Suspense fallback={<div className="text-center my-4">Loading Reels...</div>}>
        <ReelsBanner />
      </Suspense> */}
      <div ref={ref}>
        {inView && <ReelsBanner />}
      </div>
      {productScrollList?.data?.length > 0 ? (
        <>
          <h6 className="flex justify-center w-full p-2 text-4xl font-semibold">
            {productScrollList.data[0]?.name}
          </h6>
          <ProductScrollBanner products={productScrollList.data[0]?.productIds || []} />
        </>
      ) : (
        <ProductScrollSkeleton />
      )}
    </div>
  );
};

export default HomePage;
