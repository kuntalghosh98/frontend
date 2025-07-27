




import React, { useState } from "react";

const Filter = ({ products, onFilter,tshirtProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [price, setPrice] = useState(10000); // Default max price
  const [tempFilters, setTempFilters] = useState({}); // Store temp filters before applying
console.log("inside filter component",products)
  // Extract unique filters
  const genders = [...new Set(products.map((p) => p.category.split(" ")[0]))];
  const types = [...new Set(products.map((p) => p.category.split(" ")[1]))];
  const categories = [...new Set(products.map((p) => p.category.split(" ")[2]))];
  const colors = [...new Set(
    products.flatMap((p) => 
      p.variants
        .map((v) => v.color)
        .filter((color) => color && color.trim() !== "")
    )
  )];
  
  const sizes = [...new Set(
    products.flatMap((p) =>
      p.variants.flatMap((v) =>
        v.sizeStock.map((s) => s.size).filter((size) => size && size.trim() !== "")
      )
    )
  )];
  
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  // Function to store selected filters without applying immediately
  const handleTempFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters only when "Apply" button is clicked
  const applyFilters = () => {
    let filteredProducts = [...products];

    if (tempFilters.gender) {
      filteredProducts = filteredProducts.filter((p) => p.category.startsWith(tempFilters.gender));
    }
    if (tempFilters.type) {
      filteredProducts = filteredProducts.filter((p) => p.category.includes(tempFilters.type));
    }
    if (tempFilters.category) {
      filteredProducts = filteredProducts.filter((p) => p.category.endsWith(tempFilters.category));
    }
    if (tempFilters.color) {
      filteredProducts = filteredProducts.filter((p) =>
        p.variants.some((v) => v.color === tempFilters.color)
      );
    }
    if (tempFilters.size) {
      filteredProducts = filteredProducts.filter((p) =>
        p.variants.some((v) => v.sizeStock.some((s) => s.size === tempFilters.size))
      );
    }
    filteredProducts = filteredProducts.filter((p) => p.price <= price);

    if (tempFilters.sortOrder === "lowToHigh") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (tempFilters.sortOrder === "highToLow") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    onFilter(filteredProducts);
    setIsOpen(false); // Close sidebar after applying filters
  };

  return (
    <div>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-black text-white px-6 py-2 rounded-md z-50"
      >
        Filter
      </button>

      {/* Sidebar Filter Menu */}
      <div className={`fixed top-0 left-0 w-80 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <div className="p-6">
          <button onClick={() => setIsOpen(false)} className="text-black text-lg font-bold mb-4">
            ✖ Close
          </button>

          <h2 className="text-lg font-bold">Filters</h2>

          {/* Gender */}
          {genders.length > 1 ? (<div className="mt-4">
            <h4 className="font-semibold">Gender</h4>
            <select onChange={(e) => handleTempFilterChange("gender", e.target.value)} className="border p-2 rounded w-full">
              <option value="">All</option>
              {genders.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          ) : ""

          }
        
          {/* Type */}
          <div className="mt-4">
            <h4 className="font-semibold">Type</h4>
            <select onChange={(e) => handleTempFilterChange("type", e.target.value)} className="border p-2 rounded w-full">
              <option value="">All</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mt-4">
            <h4 className="font-semibold">Category</h4>
            <select onChange={(e) => handleTempFilterChange("category", e.target.value)} className="border p-2 rounded w-full">
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="mt-4">
            <h4 className="font-semibold">Color</h4>
            <select onChange={(e) => handleTempFilterChange("color", e.target.value)} className="border p-2 rounded w-full">
              <option value="">All</option>
              {colors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div className="mt-4">
            <h4 className="font-semibold">Size</h4>
            <select onChange={(e) => handleTempFilterChange("size", e.target.value)} className="border p-2 rounded w-full">
              <option value="">All</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <h4 className="font-semibold">Max Price: ₹{price}</h4>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Sorting */}
          <div className="mt-4">
            <h4 className="font-semibold">Sort By</h4>
            <select onChange={(e) => handleTempFilterChange("sortOrder", e.target.value)} className="border p-2 rounded w-full">
              <option value="">Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="mt-6 w-full bg-black text-white py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
