import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingBag, faBars, faTimes, faUser,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Filled heart

import NavLink from './Navlink'; // Import your custom NavLink component here
import SearchBar from './SearchBar'; // Import SearchBar component
import LoginRegister from '@/pages/LoginRegister';
import { selectCartCount } from '../../store/slices/cartSlice';
import Router from 'next/router';
import { RouterContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';
import logo2 from "../../Utility/icons/logo2.png";
import greenTik from "../../Utility/icons/check2.png";
const NavBar = () => {
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [navBackground, setNavBackground] = useState('bg-transparent');
  const [isOpen, setIsOpen] = useState(false);
  const [brandPosition, setBrandPosition] = useState('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
  const [brandSize, setBrandSize] = useState('text-white text-70vw h-8');
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search window
  const [textColor, settextColor] = useState('text-whhite')
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn)
  const isDefaultRoute = router.pathname === '/';
  const cartCount = useSelector(selectCartCount);
  const toggleDropdown = () => {
    setIsWomenDropdownOpen((prev) => !prev);
  };
  console.log(cartCount);
  // const [isLoggedIn,setIsLoggedIn]=useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const toggleSearch = () => {
    console.log("toggle menu")
    setIsSearchOpen(!isSearchOpen); // Toggle search window visibility
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  const handleBagClick = () => {
    router.push('/cart');
  };
  const handleWishListClick = () =>{
    router.push('/wishList');
  };
  const handleLoginClick = () => {
    console.log("login");
    router.push('/LoginRegister');
  };
  const largeScreenLogin = () => {
    if (isLoggedIn) { router.push('./Account') }
    else { router.push('./LoginRegister') }
  }
  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!isOpen) {
          setNavBackground('bg-white');
          setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
          setBrandSize('text-black text-xl');
          settextColor('text-black')
        }
      } else {
        if (!isOpen) {
          setNavBackground('bg-transparent');
          setBrandPosition('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
          setBrandSize('text-white text-70vw');
          settextColor('text-white')
        }
      }
    };

    if (isOpen || !isDefaultRoute) {
      setNavBackground('bg-white');
      setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
      setBrandSize('text-black text-xl');
      settextColor('text-black')
    } else {
      handleScroll(); // Ensure the correct background on initial load
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    // console.log(cartCount);
    if (isLoggedIn) {
      console.log("inside useeffect");
    }
  }, [isLoggedIn, 1]);

const handleClick=()=>{
  Router.push("/");
}

  return (
    <nav className={`${isDefaultRoute ? navBackground : "bg-white"} p-4   fixed w-full top-0 left-0 z-50 transition-colors duration-300`} style={{ height: '4rem' }}>
      <div className="container mx-auto flex justify-between items-center">
        {isDefaultRoute ? (
          <div className={`absolute text-black font-bold transition-all duration-1000 flex ${brandPosition}`}>
            <span className={`transition-all duration-300 ${brandSize}`}>Classic Aura</span>
          </div>
        ) : (
          <div className="text-xl font-bold cursor-pointer " onClick={handleClick}  >Classic Aura</div>
        )}

        <div className="text-transparent text-xl font-bold" onClick={handleClick}      >Classic Aura</div>

        <div className={`${isDefaultRoute ? textColor : "text-black"} hidden md:flex space-x-4 z-50`}>
          <NavLink href="/Products?category=women+jewellery+rings" className="hover:opacity-80">Rings</NavLink>
          <NavLink href="/Products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</NavLink>
          <NavLink href="/Products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</NavLink>
          <NavLink href="/Products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</NavLink>
          <NavLink href="/Products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</NavLink>
        </div>

        <div className="flex space-x-4 md:hidden">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
              onClick={toggleSearch} // Toggle search window on click
            />
          </div>
          <div className="relative">
        <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick}/>
        </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
              onClick={handleBagClick}
            />
            {cartCount > 0 && ( // Only show the count if it's greater than 0
              <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          
          <div className="relative">
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            />
          </div>
        </div>


        <div className="hidden md:flex space-x-4">
        <div className="relative">
        <FontAwesomeIcon
            icon={faSearch}
            className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
            onClick={toggleSearch} // Toggle search window on click
          />
        </div>
        <div className="relative">
        <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick}/>
        </div>
        
        <div className="relative">
        <FontAwesomeIcon icon={faShoppingBag} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
        {cartCount > 0 && ( // Only show the count if it's greater than 0
              <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
        </div>
        <div className="relative">
        <FontAwesomeIcon icon={faUser} onClick={largeScreenLogin} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} ></FontAwesomeIcon>
        </div>
         
         
         
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeMenu}></div>}
      {isSearchOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeSearch}></div>}
      {isSearchOpen && <SearchBar onClose={toggleSearch} />}
      {/* {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <LoginRegister onClose={closeLogin} />
        </div>
      )} */}

      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-40`}
        style={{ width: '80%', maxWidth: '500px' }}
      >
        <div className="p-4 flex flex-col space-y-4 h-[85vh] z-10">
        <NavLink href="/Products?category=women+jewellery+rings" className="hover:opacity-80">Rings</NavLink>
          <NavLink href="/Products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</NavLink>
          <NavLink href="/Products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</NavLink>
          <NavLink href="/Products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</NavLink>
          <NavLink href="/Products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</NavLink>


        </div>
        <div className="flex justify-center items-center">
          {isLoggedIn ? (
            <button
              className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
              onClick={() => router.push('/Account')}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {user.name ? user.name : user.email}
            </button>
          ) : (
            <button
              className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
              onClick={handleLoginClick}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Login / Register
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
