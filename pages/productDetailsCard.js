// pages/productDetailsCard.js


import { Playfair_Display, Poppins } from "@next/font/google";
import Image from "next/image";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, selectProductById } from '../store/slices/productSlice';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faHeart, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';
// import ProductSuggestion from '@/components/Product/ProductSuggestion'; // Import the product suggestion component
import ProductScrollBanner from '@/components/ProductScrollBanner/ProductScrollBanner';
import ProductScrollList from '@/components/ProductScrollBanner/ProductScrollList';
import { setCartItems } from '../store/slices/cartSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { url,urlImg } from '@/constant';
import SuccessPopup from "../components/SuccessPopup";
import image1 from "../Utility/icons/returnIcon.png";
import image2 from "../Utility/icons/codIcon.png";
import image3 from "../Utility/icons/exchangeIcon.png";
import greenTik from "../Utility/icons/check2.png"


import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import image4 from "../Utility/icons/lwbv.png";
import image5 from "../Utility/icons/925.png";
import image6 from "../Utility/icons/gold.png";
import image7 from "../Utility/icons/skin.png";
import ShareButton from "./ShareButton";
const playfair = Playfair_Display({ subsets: ["latin"], weight: "400" });



const ProductDetailsCard = () => {
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [veriantId, setveriantId] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const allProducts = useSelector((state) => state.products.items);
  const recentlyViewed = useSelector((state) => state.recentlyViewed);
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.productId._id === id);
  const [showPopup, setShowPopup] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [isOpengalary, setIsOpengalary] = useState(false);
  setAddToCart
  console.log("wishlist",id)
  console.log("wishlist",wishlist)
console.log("isWishlisted",isWishlisted)


useEffect(() => {
  if(allProducts.length<1){
    dispatch(fetchProducts()); 
  }

}, [dispatch])
let suggestedProductsList=[];
  const recentlyViewedProducts = allProducts.filter(
    (product) => recentlyViewed.includes(product._id) && product._id !== id
  );
  console.log("Recently Viewed Products:", recentlyViewedProducts);

  console.log("recent viewed product",recentlyViewed);
  console.log(allProducts)
  

  const [isOpen, setIsOpen] = useState(false);



  const [disable, setDisable] = useState(false);
  console.log("veriantId", veriantId)
  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     try {
  //       const response = await axios.get(`${url}api/products/${id}`);
  //       const productData = response.data;
  //       console.log("productData---------------------------------",productData);
  //       setProduct(productData);
  //       if (productData.variants.length > 0) {
  //         const defaultVariant = productData.variants[0];
  //         setColor(defaultVariant.color);
  //         setveriantId(defaultVariant._id)
  //         sizeAvailablityset(defaultVariant)
  //       }
  //       setLoading(false);



        
  //     } catch (error) {
  //       console.error('Error fetching product details:', error);
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchProductDetails();
  //   }
  // }, [id]);

  const sizeAvailablityset = (Variant) => {
    console.log("size availablity set", Variant)
    if (Variant.sizeStock.length > 0) {
      console.log("inside If")
      for (let i = 0; i < Variant.sizeStock.length; i++) {
        console.log("inside for")
        if (Variant.sizeStock[i].stock > 0) {
          setSize(Variant.sizeStock[i].size)
          break;
        }
        else if (i == Variant.sizeStock.length - 1) {
          setDisable(true)
          console.log("disable", disable);
        }
      }
    }
  }
  useEffect(() => {
    if (id && allProducts.length > 0) {
      console.log("-----------------------------2-------------------------------");
      const foundProduct = allProducts.find(product => product._id === id);
      console.log(foundProduct);
      console.log("-----------------------------3-------------------------------");
  
      if (foundProduct) {
        setProduct(foundProduct);
        console.log("-----------------------------4-------------------------------");
        const defaultVariant = foundProduct.variants[0];
        setColor(defaultVariant.color);
        setveriantId(defaultVariant._id);
        sizeAvailablityset(defaultVariant);
        
      }
    }
    setLoading(false)
  }, [id, allProducts]);
  

  if (loading || !product) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </div>
      );
    }
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${url}api/cart/${userId}`);
      console.log("cart items", response.data.items)

      dispatch(setCartItems(response.data.items));
    } catch (e) {
      console.log("cart is empty")
    }

  };

  const handleAddToBag = async () => {
    console.log("add to bag button", veriantId)
    console.log("add to bag color", color)
    if (isLoggedIn && !disable) {
      

      try {
        const response = await axios.post(`${url}api/cart/add`, {
          userId,
          productId: id,
          size,
          veriantColor: color
        })
        console.log("Product added to cart", response.data.items)
        dispatch(setCartItems(response.data.items));
        fetchCart();
        console.log("Product added to cart", response)
        setAddToCart(true);
      } catch (err) {
        console.log("error to add product", err)
      }
    }else if(!isLoggedIn){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  };
  const handleAddToWishlist = async () =>{
    if (isLoggedIn && !disable) {
      

      try {
        const response = await axios.post(`${url}api/wishlist/add`, {
          userId,
          productId: id,
        })
        console.log("Product added to wishlist", response.data.items)
        setShowPopup(true);
        console.log("Product added to wishlist", response)
      } catch (err) {
        console.log("error to add product", err)
      }
    }else if(!isLoggedIn){
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  }
const handleHeartIconClick=()=>{
  handleAddToWishlist();
}



  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // nextImage();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // prevImage();
    }
  };
  if(product){
    console.log("product category suggestedProducts",suggestedProductsList);
    const categoryBase = product.category.split(" ").slice(0, 2).join(" ");
    const suggestedProducts = allProducts
    .filter(
      (productRedux) =>
        productRedux.category.startsWith(categoryBase) && productRedux._id !== product._id // Match category & exclude current product
    )
    .sort(() => Math.random() - 0.5) // Shuffle the array randomly
    .slice(0, 10); // Get max 10 products
  
    suggestedProductsList=suggestedProducts;
    console.log("product category suggestedProducts",suggestedProductsList);
    
  }
  const nextImage = () => {

    setCurrentImageIndex((currentImageIndex) =>

      currentImageIndex === product.variants.find((variant) => variant.color === color).imageUrls.length - 1
        ? 0
        : currentImageIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex) =>
      currentImageIndex === 0
        ? product.variants.find((variant) => variant.color === color).imageUrls.length - 1
        : currentImageIndex - 1
    );
  };
  let ImageGallery=product.variants.find((variant) => variant.color === color)?.imageUrls;
  console.log("--------------------------------------------------------");
  console.log(ImageGallery);
  console.log("--------------------------------------------------------");

  return (
    <div className="w-full  mx-auto  flex flex-col ">
      <div className="w-full">
        <div className="w-full bg-white rounded-md shadow-md  flex flex-col md:flex-row pt-16 ">
          {/* image start */}
          {/* <div className="w-full overflow-x-auto no-scrollbar py-4">
              <div className="flex space-x-4">
              {product.variants.find((variant) => variant.color === color).imageUrls.map((url,index) => (


    
                 <div
                 className="w-60 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
                 
               >
                 <img src={url} alt={product.name} className="w-full h-60 object-cover" />
                 <div className="p-4">

                 </div>
               </div>
                ))}
              </div>
            </div> */}
          <div
            className="relative md:w-1/2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
            src={`${urlImg}${product.variants.find((variant) => variant.color === color)?.imageUrls[currentImageIndex]}`}
            onClick={() => setIsOpengalary(true)}
              alt={product.name}
              className="w-full h-[70vh] object-cover mb-4 pr-4 pl-4 pb-2"
            />
            <button
              onClick={() => prevImage()}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <div className="absolute  left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.variants.find((variant) => variant.color === color).imageUrls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-black' : 'bg-gray-400'}`}
                ></div>
              ))}
            </div>
          </div>
          {/* image end */}
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
                    onClick={handleHeartIconClick}
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
              onClick={handleAddToBag}
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
                <p className="bold whitespace-nowrap text-sm md:text-sm">Chsh On Delivery</p>
              </div>
            </div>





          </div>
        </div>
        {/* /-------------------------------------------------------------------------------/ */}


     
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
         {/* /-------------------------------------------------------------------------------/ */}

      </div>




      {(recentlyViewedProducts.length > 0) && (
        <div className=" p-4">
          <h2 className="text-xl font-semibold mt-4">Recently Viewed</h2>
          <div className="">
            <ProductScrollBanner products={recentlyViewedProducts} />

          </div>
        </div>
      )}
   
      {(suggestedProductsList.length > 0) &&  (
        <div className=" p-4">
          <h2 className="text-xl font-semibold mt-4">You may like</h2>
          <div className="">
            <ProductScrollBanner products={suggestedProductsList} />
          </div>
        </div>
      ) }
      {showPopup && (
        <SuccessPopup message="Added to Wishlist!" onClose={() => setShowPopup(false)} />
      )}
      {addToCart && (
        <SuccessPopup message="Added to Cart!" onClose={() => setAddToCart(false)} />
      )}
       {isOpengalary && (
        <Lightbox
          open={isOpengalary}
          close={() => setIsOpengalary(false)}
          
          slides={ImageGallery.map((src) => ({ src: `${urlImg}${src}` }))}
          plugins={[Thumbnails,Zoom]}
          zoom={{
            maxZoomPixelRatio: 3, // Zoom up to 3x
            scrollToZoom: true, // Enable scroll-based zoom
          }}
          styles={{
            container: {
              background: "rgba(0, 0, 0, 0.9)", // 50% transparent black background
            },
          }}
        />
      )}

    </div>
  );
};

export default ProductDetailsCard;



