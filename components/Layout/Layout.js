// components/Layout/Layout.js

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <header className="py-4 border-b mb-4">
        <h1 className="text-2xl font-bold">My E-commerce Site</h1>
        {/* Include navigation links, search bar, etc. */}
      </header>
      <main>{children}</main>
      <footer className="py-4 border-t mt-4">
        <p>&copy; {new Date().getFullYear()} My E-commerce. All rights reserved.</p>
        {/* Include footer links, legal information, etc. */}
      </footer>
    </div>
  );
};

export default Layout;
