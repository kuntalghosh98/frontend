import React, {useState,useEffect} from 'react'
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@/components/Product/ProductCard';
import MediaBanner from '@/components/MediaBanner';
import { fetchProducts } from '../store/slices/productSlice';
import Filter from "../components/Filter";
import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
import { url } from '@/constant';


function Products () {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { category } = router.query;

  const products = useSelector((state) => state.products.items);
  
 
  const bannerCards = useSelector((state) => state.bannerCards.items);
  console.log("bannercard------",bannerCards);
  if(bannerCards.length<1){
console.log("---banner array is blank-----");
dispatch(fetchBannerCards());
// bannerCards = useSelector((state) => state.bannerCards.items)
  }
  const getInsideImage = (bannerCards, category) => {
    if (!bannerCards || bannerCards.length === 0) return null;
    const cardsArray = bannerCards[0].cards;
    const matchedCard = cardsArray.find(
      (item) => item.categoryName.toLowerCase() === category.toLowerCase()
    );
    return matchedCard ? matchedCard.insideimage : null;
  };
 let insideImage='';
  if(bannerCards && category){
     insideImage = getInsideImage(bannerCards, category);
     insideImage=`${url}uploads/${insideImage}`
    console.log("---9999-----",insideImage);
  }

 

  // Keep filteredProducts in sync
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const isRefreshed = sessionStorage.getItem("isRefreshed");

    if (!isRefreshed || products.length == 0) {
      dispatch(fetchProducts());
      sessionStorage.setItem("isRefreshed", "true");
    }
 
    const img = sessionStorage.getItem("selectedImage");
    if (category && img) setImageUrl(img);

  }, []);


   // Filter function
   const filterByCategory = (products, category = '') => {
    return products.filter(product => product.category.includes(category));
  };
const filterByCategoryProducts=filterByCategory(products, category)
  // **Sync filteredProducts when products/category change**
  useEffect(() => {
    if (products.length > 0) {
      const filtered = filterByCategory(products, category);
      setFilteredProducts(filtered);
    }
  }, [products, category]); 

  let catagoryName = category ? category.split(" ").splice(-1) : "";
  let catagoryName1 = catagoryName.toString().toUpperCase();
  return (
    <div style={{"margin-top":"80px"}}>
       <MediaBanner  imageUrl={insideImage}/>
       <div><h6 style={{ "display": "flex", "justifyContent": "center", "width": "full", "padding": "10px", "fontSize": "60px" }}>{catagoryName1}</h6></div>
       <aside className="w-1/4 p-4">
        <Filter products={filterByCategoryProducts} onFilter={setFilteredProducts}  />
      </aside>
     { filteredProducts.length>0 ?
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
 {filteredProducts.map((product) => (
   <ProductCard key={product._id} product={product} />
 ))}
</div>
:
<div className='h-full flex items-center justify-center align-item-center'>
  Sorry all out
</div>
     }
    

    </div>
  );
};

export default Products;
