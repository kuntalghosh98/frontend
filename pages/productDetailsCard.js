// Optimized ProductDetailsCard.js

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Playfair_Display } from '@next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { fetchProductById } from '@/api/productApi'; // assume this exists
import { setWishlist,addToWishlist } from "../store/slices/wishlistSlice";

import { fetchProducts } from '../store/slices/productSlice';
import { setCartItems } from '../store/slices/cartSlice';
import { url, urlImg } from '@/constant';
import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
import SuccessPopup from '@/components/SuccessPopup';
import ShareButton from './ShareButton';
import Spinner from "@/components/Spinner";

import image1 from '../Utility/icons/returnIcon.png';
import image2 from '../Utility/icons/codIcon.png';
import image3 from '../Utility/icons/exchangeIcon.png';
import image4 from '../Utility/icons/lwbv.png';
import image5 from '../Utility/icons/925.png';
import image6 from '../Utility/icons/gold.png';
import image7 from '../Utility/icons/skin.png';
import greenTik from '../Utility/icons/check2.png';

import { addToCartApi, fetchCartApi, } from '@/api/cartApi';
import { addToWishlistApi } from '@/api/productApi';
import {fetchWishlistItems} from '@/api/wishlistApi';
const playfair = Playfair_Display({ subsets: ['latin'], weight: '400' });

const ProductDetailsCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const allProducts = useSelector((state) => state.products.items);
  const recentlyViewed = useSelector((state) => state.recentlyViewed);
  const wishlist = useSelector((state) => state.wishlist.items);
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [variantId, setVariantId] = useState('');
  const [disable, setDisable] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [addToCartPopup, setAddToCartPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  console.log("wishlist in productDetailsCard", wishlist);
  const isWishlisted = wishlist.some((item) => item.productId?._id === id);

  useEffect(() => {
    if (allProducts.length < 1) dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (id && allProducts.length > 0) {
      const foundProduct = allProducts.find((prod) => prod._id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        const defaultVariant = foundProduct.variants[0];
        setColor(defaultVariant.color);
        setVariantId(defaultVariant._id);
        setAvailableSize(defaultVariant);
      }
      setLoading(false);
    }
  }, [id, allProducts]);

  const setAvailableSize = (variant) => {
    const available = variant.sizeStock.find((s) => s.stock > 0);
    if (available) setSize(available.size);
    else setDisable(true);
  };

  // const handleAddToCart = async () => {
  //   if (!isLoggedIn) return triggerLoginPrompt();
  //   try {
  //     setSpinner(true);
  //     const response = await addToCartApi({ userId, productId: id, size, veriantColor: color });
  //    const res=await fetchCartApi(userId);
  //     console.log("Product added to cart", res);
  //     dispatch(setCartItems(res.items));
  //     setAddToCartPopup(true);
  //   } catch (err) {
  //     console.error('Error adding to cart:', err);
  //   }finally{
  //     setSpinner(false);
  //   }
  // };
  

  const handleAddToCart = async () => {
    const cartItemData = {
      productId: id,
      size,
      veriantColor: color,
      quantity: 1,
    };
  
    if (!isLoggedIn) {
      // 👇 Local storage: save light object
      const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const updatedStorageCart = mergeGuestCart(existingCart, cartItemData);
      localStorage.setItem('guestCart', JSON.stringify(updatedStorageCart));
  
      // 👇 Redux: load full product for display
      const product = await fetchProductById(id);
      const detailedCartItem = {
        ...cartItemData,
        productId: product, // full product object
      };
  
      const reduxCart = JSON.parse(localStorage.getItem('guestCartRedux') || '[]');
      const updatedReduxCart = mergeGuestCart(reduxCart, detailedCartItem);
      dispatch(setCartItems(updatedReduxCart));
      localStorage.setItem('guestCartRedux', JSON.stringify(updatedReduxCart));
  
      setAddToCartPopup(true);
      return;
    }
  
    // ✅ Logged-in flow (no change)
    try {
      // setSpinner(true);
      setAddToCartPopup(true);
      await addToCartApi({ userId, ...cartItemData });
      const res = await fetchCartApi(userId);
      dispatch(setCartItems(res.items));
      
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setSpinner(false);
    }
  };
  
  function mergeGuestCart(cart, newItem) {
    const existing = cart.find((item) => {
      const itemId = typeof item.productId === 'string' ? item.productId : item.productId._id;
      const newItemId = typeof newItem.productId === 'string' ? newItem.productId : newItem.productId._id;
  
      return (
        itemId === newItemId &&
        item.size === newItem.size &&
        item.veriantColor === newItem.veriantColor
      );
    });
  
    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      cart.push(newItem);
    }
    return cart;
  }
  

  // const handleAddToWishlist = async () => {
  //   if (!isLoggedIn) return triggerLoginPrompt();
  //   try {
  //     await addToWishlistApi({ userId, productId: id });
  //     setShowPopup(true);
  //   } catch (err) {
  //     console.error('Error adding to wishlist:', err);
  //   }
  // };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      const guestWishlistIds = JSON.parse(localStorage.getItem('guestWishlist') || '[]');
      const guestWishlistData = JSON.parse(localStorage.getItem('guestWishlistRedux') || '[]');
  
      if (!guestWishlistIds.includes(id)) {
        guestWishlistIds.push(id);
  
        const product = allProducts.find(p => p._id === id); // from redux or passed as prop
        if (product) {
          const wrappedProduct = { productId: product };
  
          const updatedRedux = [...guestWishlistData, wrappedProduct];
          localStorage.setItem('guestWishlist', JSON.stringify(guestWishlistIds));
          localStorage.setItem('guestWishlistRedux', JSON.stringify(updatedRedux));
  
          dispatch(setWishlist(updatedRedux));
          setShowPopup(true);
        }
      } else {
        setShowPopup(true);
      }
  
      return;
    }
  
    // Logged-in user
    try {
      await addToWishlistApi({ userId, productId: id });
      // const updated = await fetchWishlistItems(userId);
      setShowPopup(true);
      dispatch(setWishlist(updated.items));
      setShowPopup(true);
    } catch (err) {
      console.error('Error adding to wishlist:', err);
    }
  };
  

  const triggerLoginPrompt = () => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 4000);
  };

  const currentVariant = product?.variants.find((v) => v.color === color);
  const images = currentVariant?.imageUrls || [];
  const suggestedProductsList = allProducts
    .filter(
      (prod) => prod.category.includes(product?.category.split(' ')[0]) && prod._id !== product?._id
    )
    .slice(0, 10);
  const recentlyViewedProducts = allProducts.filter(
    (prod) => recentlyViewed.includes(prod._id) && prod._id !== id
  );

  if (loading || !product) return <div className="text-center py-20">Loading...</div>;
  // if (spinner) return <Spinner />;
  return (
    <div className="w-full mx-auto flex flex-col pt-16">
      {spinner && (
  <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
    <Spinner />
  </div>
)}

      {/* Product Image and Info Section */}
      {/* Keep previously optimized subcomponents or re-integrate here */}
      <div className="w-full bg-white rounded-md shadow-md  flex flex-col md:flex-row ">
      <div className="relative md:w-1/2">
        <img
          src={`${images[currentImageIndex]}`}
          alt={product.name}
          onClick={() => setIsGalleryOpen(true)}
          className="w-full h-[70vh] object-cover"
        />
        <button onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="md:w-1/2 lg:w-1/2 lg:pl-8  p-4">
                  <div className="flex justify-between items-center">
      
                    <h1 className={`text-4xl font-semibold ${playfair.className}`}>
                      {product.name}
                    </h1>
                    
                  </div>
                  <p className="text-gray-800 mt-2 text-xl">
                    {product?.discount && product.discount > 0 ? (
                      <span className="flex items-center space-x-2">
                        {/* Original Price with Strikethrough */}
                        <span className="line-through text-gray-500">₹{product.price}</span>
      
                        {/* Discounted Price */}
                        <span className="text-black font-semibold">
                          ₹{(product.price - (product.price * product.discount) / 100).toFixed(2)}
                        </span>
      
                        {/* Discount Percentage */}
                        <span className="text-green-600 font-semibold">
                          {product.discount}% off
                        </span>
                      </span>
                    ) : (
                      // Normal Price if no discount is available
                      `₹${product.price}`
                    )}
                  </p>
      
      
      
                  {product.variants.some((variant) => variant.color.trim() !== "") && (
                  <div className="mt-4">
                    <p className="font-semibold">Color</p>
                    <div className="flex space-x-4 mt-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant._id}
                          className={`w-8 h-8 rounded-full cursor-pointer shadow-md ${color === variant.color ? 'border-2 border-black' : ''}`}
                          style={{ backgroundColor: variant.color.toLowerCase() }}
                          onClick={() => {
                            setColor(variant.color);
                            setveriantId(variant._id);
                            //  setSize(variant.sizeStock[0].size)
                            sizeAvailablityset(variant)
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}
                  <div className="mt-4 flex flex-row justify-between">
                    <div className=" flex flex-row"> <Image className="h-6 w-6 " src={greenTik} alt="Image 1" width={128} height={128} />
                      <span className="pl-1">In stock - ready to ship</span></div>
      
      
                    <div className="flex space-x-4">
                      <ShareButton product />
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`cursor-pointer transition-colors duration-300 ${isWishlisted ? "text-red-500" : "text-black  rounded-full"
                          } hover:text-gray-500  p-1`}
                          onClick={handleAddToWishlist}
                      />
                    </div>
      
                  </div>
      
                  {product.variants[0].sizeStock[0].size != "" ? (
                    <div className="mt-4 mb-4 ">
                      <p className="font-semibold ">Size</p>
                      <div className="flex space-x-4 mt-2 ">
                        {product.variants.find((variant) => variant.color === color).sizeStock.map((sizeOption) => (
      
      
                          <button
                            key={sizeOption._id}
                            className={`w-10 h-10 border rounded-md flex items-center justify-center  cursor-pointer ${size === sizeOption.size ? 'bg-yellow-950 bg-yellow-950 text-white' : 'border-gray-300 '} ${
                              sizeOption.stock ? '' : 'bg-gray-400 text-gray-600 '
                            }`}
      
                            onClick={() => { if (sizeOption.stock > 0) setSize(sizeOption.size) }}
                          >
                            {sizeOption.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {showMessage && (
                    <div className="mt-2 p-3 bg-red-500 text-white text-center rounded-md  ">
                      Please log in to add items to the cart.
                    </div>
                  )}
                  <button
                    onClick={handleAddToCart}
                    // disabled={!isLoggedIn}
                    className={`mt-4 w-full py-2 rounded-md  bg-black text-white`
                    }
      
                  >
                    {!disable ? "Add to cart":"Out of stock"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    // disabled={!isLoggedIn}
                    className={`mt-4 w-full font-semibold py-2 rounded-md border  bg-whitr text-black`
                    }
      
                  >
                     Add to Wishlist
                  </button>
      
                  <div className="w-full mt-4 mb-8 flex flex-row items-center">
                    <div className="flex">
                      <div className="font-semibold">Details:</div>
                      <div className="ml-2">{product.category}</div>
                    </div>
                    <button
                      className="ml-auto text-blue-500 cursor-pointer"
                      onClick={() => setIsOpen(true)}
                    >
                      View Details
                    </button>
                  </div>
      
      
      
                
      
      
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-[rgba(255,239,223,1)] p-2 ">
                    <div className="flex flex-col justify-center items-center p-2 ">
                      <Image className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" src={image4} alt="Image 1" width={128} height={128} />
                      <p className="text-[10px] sm:text-xs md:text-m text-center">Lifetime Warranty Buyback Value</p>
                    </div>
      
                    {1 == 2 ? (
                      <div className="flex flex-col justify-center items-center p-2 ">
                        <Image className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" src={image5} alt="Image 1" width={128} height={128} />
                        <p className="text-[10px] sm:text-xs md:text-sm text-center">925 Sterling Silver</p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center p-2 ">
                        <Image className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" src={image7} alt="Image 1" width={128} height={128} />
                        <p className="text-[10px] sm:text-xs md:text-sm text-center">Skin Safe Jewellery</p>
                      </div>
                    )}
      
                    <div className="flex flex-col justify-center items-center p-2 ">
                      <Image className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" src={image6} alt="Image 1" width={128} height={128} />
                      <p className="text-[10px] sm:text-xs md:text-sm text-center">18k Gold Vermeil Plated</p>
                    </div>
                  </div>
      
      
      
                  <div className="mt-8 mb-8">
                    <span className="font-semibold">Typically arrives in </span>
                    <span className="font-semibold bg-yellow-950  rounded-md  p-1 text-white">3-4 Days</span>
                    
                  </div>
      
      
      
      
      
                  <div className="grid  grid-cols-3  ">
                    <div className=" flex flex-col justify-center items-center  border border-gray-300 ">
                      <Image className="h-10 w-10" src={image1} alt="Image 1" width={128} height={128} />
                      <p className="whitespace-nowrap text-sm md:text-sm">2 Days Return</p>
                    </div>
                    <div className=" flex flex-col justify-center items-center p-4 border border-gray-300">
                      <Image className="h-10 w-10" src={image2} alt="Image 1" width={128} height={128} />
                      <p className="whitespace-nowrap text-sm md:text-sm">10 Days Exchange</p>
                    </div>
                    <div className=" flex flex-col justify-center items-center p-4 border border-gray-300">
                      <Image className="h-10 w-10" src={image3} alt="Image 1" width={128} height={128} />
                      <p className="bold whitespace-nowrap text-sm md:text-sm">Cash On Delivery</p>
                    </div>
                  </div>
      
      
      
      
      
      </div>
      </div>
      {/* Add product info, variants, wishlist button, etc. here based on previous structure */}

      {/* Reuse icon grid, suggested products, lightbox and popups */}

      {isGalleryOpen && (
        <Lightbox
          open={isGalleryOpen}
          close={() => setIsGalleryOpen(false)}
          slides={images.map((src) => ({ src: `${src}` }))}
          plugins={[Thumbnails, Zoom]}
        />
              
      )}

      {showPopup && <SuccessPopup message="Added to Wishlist!" onClose={() => setShowPopup(false)} />}
      {addToCartPopup && <SuccessPopup message="Added to Cart!" onClose={() => setAddToCartPopup(false)} />}
      {showLoginPrompt && (
        <div className="mt-2 p-3 bg-red-500 text-white text-center rounded-md">
          Please log in to perform this action.
        </div>
      )}
       {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
          onClick={() => setIsOpen(false)} // Click outside to close
        >
          {/* Modal Content */}
          <div
            className={`bg-white w-full h-[70vh] rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            } fixed bottom-0`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-6 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            {/* Pop-up Content */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">Product Details</h2>
              <p>{product.description || "No additional details available."}</p>
            </div>
          </div>
        </div>
      )}

      {recentlyViewedProducts.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl font-semibold">Recently Viewed</h2>
          <ProductScrollBanner products={recentlyViewedProducts} />
        </div>
      )}

      {suggestedProductsList.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl font-semibold">You may like</h2>
          <ProductScrollBanner products={suggestedProductsList} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCard;
