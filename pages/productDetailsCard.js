// pages/productDetailsCard.js

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
import { setCartItems } from '../store/slices/cartSlice';






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
  const [suggestions, setSuggestions] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [veriantId, setveriantId] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const productsYY = useSelector((state) => state.products.items);

  console.log(productsYY)
  const productxx1 = (productsYY) => {

  }
  const status = useSelector((state) => state.products.status);
  const productXX = useSelector((state) => selectAllProducts(state));
  // const productData = useSelector((state) => selectProductById(state, id));
  // console.log("prd details1", productData)






  const [disable, setDisable] = useState(false);
  console.log("veriantId", veriantId)
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        const productData = response.data;
        console.log(productData);
        setProduct(productData);
        if (productData.variants.length > 0) {
          const defaultVariant = productData.variants[0];
          setColor(defaultVariant.color);
          setveriantId(defaultVariant._id)
          // setSize(defaultVariant.sizeStock[0].size)
          sizeAvailablityset(defaultVariant)

          // if (defaultVariant.sizeStock.length > 0) {
          //   setSize(defaultVariant.sizeStock[0].size);
          // }
        }

        setLoading(false);

        // Fetch product suggestions (you might want to filter or limit the results)
        const suggestionsResponse = await axios.get('http://localhost:4000/api/products/suggestions');
        setSuggestions(suggestionsResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

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
    console.log("useeffect")

  }, [])

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const handleAddToBag = async () => {
    console.log("add to bag button", veriantId)
    console.log("add to bag color", color)
    if (!isLoggedIn && !disable) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      try {
        const response = await axios.post('http://localhost:4000/api/cart/add', {
          userId,
          productId: id,
          size,
          veriantColor: color
        })
        console.log("Product added to cart", response.data.items)
        dispatch(setCartItems(response.data.items));
        console.log("Product added to cart", response)
      } catch (err) {
        console.log("error to add product", err)
      }
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    const selectedVariant = product.variants.find(variant => variant.color === e.target.value);
    if (selectedVariant && selectedVariant.sizeStock.length > 0) {
      setSize(selectedVariant.sizeStock[0].size); // Set default size to the first available size
    }
  };

  const selectedVariant = product.variants.find(variant => variant.color === color);


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
              src={product.variants.find((variant) => variant.color === color).imageUrls[currentImageIndex]}
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
          <div className="lg:w-1/2 lg:pl-4 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <div className="flex space-x-4">
                <FontAwesomeIcon icon={faShareAlt} className="text-gray-600 cursor-pointer" />
                <FontAwesomeIcon icon={faHeart} className="text-gray-600 cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-800 mt-2 text-xl">${product.price}</p>
            <div className="mt-4">
              <p className="font-semibold">Color</p>
              <div className="flex space-x-4 mt-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    className={`w-8 h-8 rounded-full cursor-pointer shadow-md ${color === variant.color ? 'border-2 border-black' : ''}`}
                    style={{ backgroundColor: variant.color.toLowerCase() }}
                    onClick={() => {
                      setColor(variant.color); setveriantId(variant._id);
                      //  setSize(variant.sizeStock[0].size)
                      sizeAvailablityset(variant)
                    }}
                  ></button>
                ))}
              </div>
            </div>
            {product.variants[0].sizeStock[0].size != "" ? (
              <div className="mt-4 ">
                <p className="font-semibold ">Size</p>
                <div className="flex space-x-4 mt-2 ">
                  {product.variants.find((variant) => variant.color === color).sizeStock.map((sizeOption) => (


                    <button
                      key={sizeOption._id}
                      className={`w-10 h-10 border rounded-md flex items-center justify-center  cursor-pointer ${size === sizeOption.size ? 'border-black bg-black text-white' : 'border-gray-300 '} ${
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

            <div className="mt-4">
              <p className="font-semibold">Details</p>
              <p className="mt-2">{product.description}</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Return Policy</p>
              <p className="mt-2">You can return the product within 30 days of purchase.</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Details</p>
              <p className="mt-2">{product.description}</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Return Policy</p>
              <p className="mt-2">You can return the product within 30 days of purchase.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {suggestions.map((suggestedProduct) => (
            // <ProductSuggestion key={suggestedProduct._id} product={suggestedProduct} />
            <ProductScrollBanner />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;



