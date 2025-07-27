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
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import NavLink from './Navlink';
import SearchBar from './SearchBar';
import { selectCartCount } from '../../store/slices/cartSlice';
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
  const [textColor, setTextColor] = useState('text-white');
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        setIsLarge(window.innerWidth >= 1440);
      }
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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

  // ✅ missing search toggle handlers added
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

  const getTransform = () => {
    if (scrolled) {
      return isMobile
        ? 'translate(0.75rem, 1rem) scale(0.6)'
        : 'translate(1rem, 0.60rem) scale(0.35)';
    } else {
      const scale = isMobile ? 1.5 : isLarge ? 1.4 : 1.2;
      const top = isMobile ? '45vh' : '60vh';
      return `translate(-50%, ${top}) scale(${scale})`;
    }
  };

  return (
    <nav className={`${isDefaultRoute && !scrolled && !isOpen ? 'bg-transparent' : 'bg-white'} p-4 fixed w-full top-0 left-0 z-50 transition-colors duration-300`} style={{ height: '4rem' }}>
      <div className="container mx-auto flex justify-between items-center">
        {isDefaultRoute ? (
          <div
            onClick={handleClick}
            className="absolute z-50 origin-top-left transition-transform duration-700 ease-in-out"
            style={{
              transform: getTransform(),
              left: scrolled ? '0' : '50%',
              top: scrolled ? '0.75rem' : undefined,
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
          <div className="absolute top-2 left-4 z-30" onClick={handleClick}>
            <Image
              src={AuriusLogoBlack}
              alt="Classic Aura Logo"
              width={120}
              height={40}
              className="object-contain cursor-pointer select-none"
              priority
            />
          </div>
        )}

        <div className="text-transparent text-xl font-bold" onClick={handleClick}>Classic Aura</div>

        <div className={`${isDefaultRoute ? textColor : "text-black"} hidden md:flex space-x-4`}>
          {["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles"].map((item) => (
            <NavLink
              key={item}
              href={`/products?category=women+jewellery+${item.toLowerCase()}`}
              className="hover:opacity-80"
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex space-x-4 md:hidden">
          <FontAwesomeIcon icon={faSearch} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={toggleSearch} />
          <FontAwesomeIcon icon={faHeart} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick} />
          <div className="relative">
            <FontAwesomeIcon icon={faShoppingBag} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
            {cartCount > 0 && (
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={() => setIsOpen(!isOpen)} />
        </div>

        <div className="hidden md:flex space-x-4" style={{ alignItems: 'center' }}>
          <FontAwesomeIcon icon={faSearch} className={`${isDefaultRoute && !scrolled ? 'text-white' : 'text-black'} hover:text-gray-500 cursor-pointer`} onClick={toggleSearch} />
          <FontAwesomeIcon icon={faHeart} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={handleWishListClick} />
          <div className="relative">
            <FontAwesomeIcon icon={faShoppingBag} className={`${textColor} hover:text-gray-500 cursor-pointer`} onClick={handleBagClick} />
            {cartCount > 0 && (
              <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <FontAwesomeIcon icon={faUser} onClick={largeScreenLogin} className={`${textColor} hover:text-gray-500 cursor-pointer`} />
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={() => setIsOpen(false)} />}
      {isSearchOpen && <div className="fixed inset-0 bg-white opacity-10 z-30" onClick={closeSearch} />}
      {isSearchOpen && <SearchBar onClose={toggleSearch} />}

      <div className={`fixed top-16 right-0 h-[calc(100%-4rem)] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`} style={{ width: '80%', maxWidth: '500px' }}>
        <div className="p-4 flex flex-col space-y-4 h-[85vh]">
          {["Rings", "Earrings", "Necklaces", "Bracelets", "Bangles"].map((item) => (
            <NavLink
              key={item}
              href={`/products?category=women+jewellery+${item.toLowerCase()}`}
              className="hover:opacity-80"
            >
              {item}
            </NavLink>
          ))}
        </div>
        <div className="flex justify-center items-center pb-4">
          <button
            className="flex items-center justify-center bg-black text-white rounded-full px-8 py-2"
            onClick={isLoggedIn ? () => router.push('/account') : handleLoginClick}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            {isLoggedIn ? (user.name || user.email) : 'Login / Register'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
