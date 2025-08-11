// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faShoppingBag, faBars, faTimes, faUser,faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Filled heart

// import NavLink from './Navlink'; // Import your custom NavLink component here
// import SearchBar from './SearchBar'; // Import SearchBar component
// import { selectCartCount } from '../../store/slices/cartSlice';
// import Router from 'next/router';
// import { RouterContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';
// import logo2 from "../../Utility/icons/logo2.png";
// import greenTik from "../../Utility/icons/check2.png";
// const NavBar = () => {
//   const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
//   const [navBackground, setNavBackground] = useState('bg-transparent');
//   const [isOpen, setIsOpen] = useState(false);
//   const [brandPosition, setBrandPosition] = useState('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
//   const [brandSize, setBrandSize] = useState('text-white text-70vw h-8');
//   const router = useRouter();
//   const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search window
//   const [textColor, settextColor] = useState('text-whhite')
//   const user = useSelector((state) => state.user.user);
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   console.log(isLoggedIn)
//   const isDefaultRoute = router.pathname === '/';
//   const cartCount = useSelector(selectCartCount);
//   const toggleDropdown = () => {
//     setIsWomenDropdownOpen((prev) => !prev);
//   };
//   console.log(cartCount);
//   // const [isLoggedIn,setIsLoggedIn]=useState(false)

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeMenu = () => {
//     setIsOpen(false);
//   };
//   const toggleSearch = () => {
//     console.log("toggle menu")
//     setIsSearchOpen(!isSearchOpen); // Toggle search window visibility
//   };
//   const closeSearch = () => {
//     setIsSearchOpen(false);
//   };
//   const handleBagClick = () => {
//     router.push('/cart');
//   };
//   const handleWishListClick = () =>{
//     router.push('/wishList');
//   };
//   const handleLoginClick = () => {
//     console.log("login");
//     router.push('/loginregister');
//   };
//   const largeScreenLogin = () => {
//     if (isLoggedIn) { router.push('./account') }
//     else { router.push('./loginregister') }
//   }
//   const closeLogin = () => {
//     setIsLoginOpen(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         if (!isOpen) {
//           setNavBackground('bg-white');
//           setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
//           setBrandSize('text-black text-xl');
//           settextColor('text-black')
//         }
//       } else {
//         if (!isOpen) {
//           setNavBackground('bg-transparent');
//           setBrandPosition('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
//           setBrandSize('text-white text-70vw');
//           settextColor('text-white')
//         }
//       }
//     };

//     if (isOpen || !isDefaultRoute) {
//       setNavBackground('bg-white');
//       setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
//       setBrandSize('text-black text-xl');
//       settextColor('text-black')
//     } else {
//       handleScroll(); // Ensure the correct background on initial load
//     }

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     // console.log(cartCount);
//     if (isLoggedIn) {
//       console.log("inside useeffect");
//     }
//   }, [isLoggedIn, 1]);

// const handleClick=()=>{
//   Router.push("/");
// }

//   return (
//     <nav className={`${isDefaultRoute ? navBackground : "bg-white"} p-4   fixed w-full top-0 left-0 z-50 transition-colors duration-300`} style={{ height: '4rem' }}>
//       <div className="container mx-auto flex justify-between items-center">
//         {isDefaultRoute ? (
//           <div className={`absolute text-black font-bold transition-all duration-1000 flex ${brandPosition}`}>
//             <span className={`transition-all duration-300 ${brandSize}`}>Classic Aura</span>
//           </div>
//         ) : (
//           <div className="text-xl font-bold cursor-pointer " onClick={handleClick}  >Classic Aura</div>
//         )}

//         <div className="text-transparent text-xl font-bold" onClick={handleClick}      >Classic Aura</div>

//         <div className={`${isDefaultRoute ? textColor : "text-black"} hidden md:flex space-x-4 z-50`}>
//           <NavLink href="/products?category=women+jewellery+rings" className="hover:opacity-80">Rings</NavLink>
//           <NavLink href="/products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</NavLink>
//           <NavLink href="/products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</NavLink>
//           <NavLink href="/products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</NavLink>
//           <NavLink href="/products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</NavLink>
//         </div>

//         <div className="flex space-x-4 md:hidden">
//           <div className="relative">
//             <FontAwesomeIcon
//               icon={faSearch}
//               className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
//               onClick={toggleSearch} // Toggle search window on click
//             />
//           </div>
//           <div className="relative">
//         <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick}/>
//         </div>
//           <div className="relative">
//             <FontAwesomeIcon
//               icon={faShoppingBag}
//               className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
//               onClick={handleBagClick}
//             />
//             {cartCount > 0 && ( // Only show the count if it's greater than 0
//               <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </div>

//           <div className="relative">
//             <FontAwesomeIcon
//               icon={isOpen ? faTimes : faBars}
//               className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
//               onClick={toggleMenu}
//               aria-label="Toggle menu"
//             />
//           </div>
//         </div>


//         <div className="hidden md:flex space-x-4">
//         <div className="relative">
//         <FontAwesomeIcon
//             icon={faSearch}
//             className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`}
//             onClick={toggleSearch} // Toggle search window on click
//           />
//         </div>
//         <div className="relative">
//         <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick}/>
//         </div>

//         <div className="relative">
//         <FontAwesomeIcon icon={faShoppingBag} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
//         {cartCount > 0 && ( // Only show the count if it's greater than 0
//               <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//         </div>
//         <div className="relative">
//         <FontAwesomeIcon icon={faUser} onClick={largeScreenLogin} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} ></FontAwesomeIcon>
//         </div>



//         </div>
//       </div>

//       {isOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeMenu}></div>}
//       {isSearchOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeSearch}></div>}
//       {isSearchOpen && <SearchBar onClose={toggleSearch} />}
//       {/* {isLoginOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//           <loginregister onClose={closeLogin} />
//         </div>
//       )} */}

//       <div
//         className={`fixed top-16 right-0 h-[calc(100%-4rem)] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
//           } transition-transform duration-300 ease-in-out z-40`}
//         style={{ width: '80%', maxWidth: '500px' }}
//       >
//         <div className="p-4 flex flex-col space-y-4 h-[85vh] z-10">
//         <NavLink href="/products?category=women+jewellery+rings" className="hover:opacity-80">Rings</NavLink>
//           <NavLink href="/products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</NavLink>
//           <NavLink href="/products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</NavLink>
//           <NavLink href="/products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</NavLink>
//           <NavLink href="/products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</NavLink>


//         </div>
//         <div className="flex justify-center items-center">
//           {isLoggedIn ? (
//             <button
//               className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
//               onClick={() => router.push('/account')}
//             >
//               <FontAwesomeIcon icon={faUser} className="mr-2" />
//               {user.name ? user.name : user.email}
//             </button>
//           ) : (
//             <button
//               className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
//               onClick={handleLoginClick}
//             >
//               <FontAwesomeIcon icon={faUser} className="mr-2" />
//               Login / Register
//             </button>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default NavBar;







import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingBag,
  faBars,
  faTimes,
  faUser,

} from '@fortawesome/free-solid-svg-icons';
import { FiPackage, FiMapPin, FiUser, FiPhone, FiHelpCircle } from "react-icons/fi";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import NavLink from './Navlink';
import SearchBar from './SearchBar';
import { selectCartCount } from '../../store/slices/cartSlice';
import AuriusLogoGold from '../../public/AuriusLogoGold.png';
import AuriusLogoWhite from '../../public/AuriusLogoWhite.png';
import AuriusLogoBlack from '../../public/AuriusLogoBlack.png';

const NavBar = () => {
  const router = useRouter();
  const cartCount = useSelector(selectCartCount);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const isDefaultRoute = router.pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navBackground, setNavBackground] = useState('bg-transparent');
  const [brandPosition, setBrandPosition] = useState('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
  const [brandSize, setBrandSize] = useState('text-white text-70vw h-8');
  const [textColor, setTextColor] = useState('text-white');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  const handleClick = () => router.push('/');

  const handleBagClick = () => router.push('/cart');
  const handleWishListClick = () => router.push('/wishList');
  const handleLoginClick = () => router.push('/loginregister');

  const largeScreenLogin = () => {
    if (isLoggedIn) router.push('/account');
    else router.push('/loginregister');
  };
  const [isMobile, setIsMobile] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
      setIsLarge(window.innerWidth >= 1200); // Tailwind lg breakpoint
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !isOpen) {
        setNavBackground('bg-white');
        setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
        setBrandSize('text-black text-xl');
        setTextColor('text-black');
      } else if (!isOpen) {
        setNavBackground('bg-transparent');
        setBrandPosition('translate-y-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap');
        setBrandSize('text-white text-70vw');
        setTextColor('text-white');
      }
    };

    if (isOpen || !isDefaultRoute) {
      setNavBackground('bg-white');
      setBrandPosition('translate-y-0 left-0 transform -translate-x-0 whitespace-nowrap');
      setBrandSize('text-black text-xl');
      setTextColor('text-black');
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, isDefaultRoute]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    if (!isDefaultRoute || isOpen) {
      setScrolled(true);
      setTextColor('text-black');
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, isDefaultRoute]);
    const handleLogout = () => {
      dispatch(clearUser());
      localStorage.removeItem('token');
      router.push('/');
    };

  return (
    <nav className={`${isDefaultRoute && !scrolled && !isOpen ? 'bg-transparent' : 'bg-white shadow-sm'} p-4  fixed w-full top-0 left-0 z-50 transition-colors duration-300`} style={{ height: '4rem' }}>
      <div className="container mx-auto flex justify-between items-center align-items-center">
        {/* Brand */}



        {isDefaultRoute ? (
          // ✅ Animated Logo only for home page
          <div
            onClick={handleClick}
            className="absolute top-0 left-0 z-50 origin-top-left transition-transform duration-700 ease-in-out"
            style={{
              transform: scrolled
                ? isMobile
                  ? 'translate(0.75rem, 1rem) scale(0.6)'           // mobile scrolled
                  : 'translate(1rem, 0.60rem) scale(0.35)'            // desktop scrolled
                : isMobile
                  ? 'translate(calc(35vw - 20vw), calc(45vh - 20vw)) scale(1.5)' // mobile center
                  : isLarge ? 'translate(calc(50vw - 20vw), calc(60vh - 15vw)) scale(1.2)' // large desktop center
                    : 'translate(calc(50vw - 25vw), calc(60vh - 20vw)) scale(1.1)', // desktop center


            }}
          >
            <Image
              src={scrolled ? AuriusLogoBlack : AuriusLogoWhite}
              alt="Aurius Logo"
              width={1000}
              height={200}
              className="w-[50vw] max-w-[300px] md:max-w-[500px] object-contain cursor-pointer select-none"

            />
          </div>


        ) : (
          // ✅ Static logo for all other routes
          <div className="absolute top-3  left-4 z-30" onClick={handleClick}>
            <Image
              src={AuriusLogoBlack}
              alt="Classic Aura Logo"
              width={1000}
              height={200}
              className="  w-[130px]    
                          sm:w-[140px]
                          md:w-[140px]           
                          lg:w-[180px]
                          xl:w-[200px]
                          2xl:w-[170px]
                         
                          
                          object-contain cursor-pointer select-none"             
                    />
            
          </div>
        )}


        <div className="text-transparent text-xl font-bold" onClick={handleClick}>Classic Aura</div>

        {/* Desktop Links */}
        <div className={`${isDefaultRoute ? textColor : "text-black"} hidden md:flex space-x-4   `}>
          {["RINGS", "EARRINGS", "NECKLACES","BRACELETS","BANGLLES"].map((item) => (
            <NavLink
              key={item}
              href={`/products?category=women+jewellery+${item.toLowerCase()}`}
              className="hover:opacity-80"
            >
              {item}
            </NavLink>
          ))}
        </div>

        {/* Icons - Mobile */}
        <div className="flex space-x-4 md:hidden" style={{ alignItems: 'center' }}>
          <FontAwesomeIcon icon={faSearch} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={toggleSearch} />
          <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick} />
          <div className="relative">
            <FontAwesomeIcon icon={faShoppingBag} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
            {cartCount > 0 && (
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer `} onClick={toggleMenu} style={{fontSize:22}}/>
        </div>

        {/* Icons - Desktop */}
        <div className="hidden md:flex space-x-4 md:align-items-center" style={{ alignItems: 'center' }}>

          <FontAwesomeIcon icon={faSearch} className={`${isDefaultRoute && !scrolled ? 'text-white' : 'text-black'} hover:text-gray-500 cursor-pointer`} onClick={toggleSearch} />
          <FontAwesomeIcon icon={faHeart} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick} />
          <div className="relative">
            <FontAwesomeIcon icon={faShoppingBag} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
            {cartCount > 0 && (
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <FontAwesomeIcon icon={faUser} onClick={largeScreenLogin} className={`${isDefaultRoute ? textColor : "text-black"} hover:text-gray-500 cursor-pointer`} />
        </div>
      </div>

      {/* Overlays */}
      {isOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeMenu}></div>}
      {isSearchOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeSearch}></div>}
      {isSearchOpen && <SearchBar onClose={toggleSearch} />}

      {/* Side Drawer Menu */}
      <div className={`fixed top-16 right-0 h-[calc(100%-4rem)] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`} style={{ width: '80%', maxWidth: '500px' }}>
        <div className="p-4 flex flex-col space-y-4 h-[75vh]">
          {["RINGS", "EARRINGS", "NECKLACES","BRACELETS","BANGLLES"].map((item) => (
            <NavLink
            onClick={closeMenu}
              key={item}
              href={`/products?category=women+jewellery+${item.toLowerCase()}`}
              className="hover:opacity-80"
              
            >
              {item}
            </NavLink>
          ))}
          <div className='border'></div>
                  <div>
          {/* { isLoggedIn && (<div>
            <div>Address</div>
            <div>Order</div>
            <button
             onClick={() => {
              closeMenu(); // ✅ Close the drawer
              if (isLoggedIn) {
                router.push('/profilepage');
              } else {
                handleLoginClick();
              }
            }}
            >Profile</button>


          </div>)} */}

{isLoggedIn && (
  <div className="mt-4 space-y-1">
    <MenuItem icon={FiPackage} label="Orders" onClick={() => { closeMenu(); router.push('/OrdersPage'); }} />
    <MenuItem icon={FiMapPin} label="Address" onClick={() => { closeMenu(); router.push('/address'); }} />
    <MenuItem icon={FiUser} label="Profile" onClick={() => { closeMenu(); router.push('/profilepage'); }} />

    <hr className="my-2 border-gray-300" />

    <MenuItem icon={FiPhone} label="Customer Care" onClick={() => { closeMenu(); router.push('/contactus'); }} />
    {/* <MenuItem icon={FiHelpCircle} label="Help / FAQs" onClick={() => { closeMenu(); router.push('/help'); }} /> */}

    {/* <hr className="my-2 border-gray-300" /> */}
  </div>
)}
        </div>
        </div>

        <div className="flex justify-center items-center pb-4">
          { isLoggedIn ? 
             
             <button
               onClick={handleLogout}
               className=" w-60 text-middle text-red-600 hover:text-red-800 font-medium"
               style={{border: '1px solid red', borderRadius: '120px', padding: '10px'}}
             >
               Logout
             </button>
            :  
        
        <button
        className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
        onClick={() => {
          closeMenu(); // ✅ Close the drawer
          handleLoginClick();
        }}
        
      >
        <FontAwesomeIcon icon={faUser} className="mr-2" />
         Login / Register
      </button>
        }

        </div>
      </div>
    </nav>
  );
};

export default NavBar;


const MenuItem = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-left"
  >
    <Icon size={18} strokeWidth={1.5} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);