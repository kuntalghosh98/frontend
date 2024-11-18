import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@/components/Product/ProductCard';

const Products =()=> {
const params=useSearchParams();
const x=params.get("catagory")
console.log("ll",x)
const products = useSelector((state) => state.products.items);
console.log("products page new",products)


// const filterProductsByCategories = (products, categories) => {
//     return products.filter(product => 
//         categories.some(category => product.category.includes(category))
//     );
// };

// // Example usage:
// const filteredProducts = filterProductsByCategories(products, ['tshirt']);
// console.log("filtered",filteredProducts);




const filterByCategory = (products, category) => {
    return products.filter(product => product.category.includes(category));
};


const menProducts = filterByCategory(products, "men");
console.log(menProducts);  // Returns all products with "men" in the category

const tshirtProducts = filterByCategory(products, x);
console.log(tshirtProducts); 
  return (
    <div style={{"margin-top":"80px"}}>
     { tshirtProducts.length>0 ?
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
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

export default Products;
