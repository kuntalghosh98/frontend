// components/Header/NavLink.js
import Link from 'next/link';

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}  className=" hover:text-gray-400">
      {children}
    </Link>
  );
};

export default NavLink;
