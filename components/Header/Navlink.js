// components/Header/NavLink.js
import Link from 'next/link';

const NavLink = ({ href, children,onClick  }) => {
  return (
    <Link href={href}  className=" hover:text-gray-400" onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavLink;
