import React, {useState,useEffect} from 'react'
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@/components/Product/ProductCard';
import MediaBanner from '@/components/MediaBanner';
import { fetchProducts } from '../store/slices/productSlice';
import Filter from "../components/Filter";




function products () {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { category } = router.query;
console.log("ll",category)
const products = useSelector((state) => state.products.items);
console.log("products page new",products)
const [filteredProducts, setFilteredProducts] = useState(products);
console.log("filteredProducts",filteredProducts);
useEffect(() => {
  const isRefreshed = sessionStorage.getItem("isRefreshed");

  if (!isRefreshed || products.length==0 ) {
    dispatch(fetchProducts());
    sessionStorage.setItem("isRefreshed", "true");
  }
  const img = sessionStorage.getItem("selectedImage");
  console.log("---------------------------11111111-------------------------------",img);
  if(category){
    if (img) setImageUrl(img);
  }
  
}, []);

  
    // dispatch(fetchProducts());



console.log("imageUrl",imageUrl);
// const filterProductsByCategories = (products, categories) => {
//     return products.filter(product => 
//         categories.some(category => product.category.includes(category))
//     );
// };

// // Example usage:
// const filteredProducts = filterProductsByCategories(products, ['tshirt']);
// console.log("filtered",filteredProducts);




const filterByCategory = (products, category='') => {
    return products.filter(product => product.category.includes(category));
};


const menProducts = filterByCategory(products, "men");
console.log(menProducts);  // Returns all products with "men" in the category

const tshirtProducts = filterByCategory(products, category);

console.log("tshirtProducts",tshirtProducts); 
let catagoryName=category ? category.split(" ").splice(-1) : "";
let catagoryName1=catagoryName.toString().toUpperCase()
  return (
    <div style={{"margin-top":"80px"}}>
       <MediaBanner  imageUrl={imageUrl}/>
       <div><h6 style={{ "display": "flex", "justifyContent": "center", "width": "full", "padding": "10px", "fontSize": "60px" }}>{catagoryName1}</h6></div>
       <aside className="w-1/4 p-4">
        <Filter products={products} onFilter={setFilteredProducts} />
      </aside>
     { tshirtProducts.length>0 ?
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
 {tshirtProducts.map((product) => (
   <ProductCard key={product.id} product={product} />
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

export default products;
