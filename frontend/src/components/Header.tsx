// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <Link to="/">Rajashekar's Home</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/tech" className="hover:text-yellow-400">Tech</Link>
            </li>
            <li>
              <Link to="/career" className="hover:text-yellow-400">Professional Career</Link>
            </li>
            <li>
              <Link to="/personal" className="hover:text-yellow-400">Personal</Link>
            </li>
            <li>
              <Link to="/trading" className="hover:text-yellow-400">Trading</Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-yellow-400">Projects</Link>
            </li>
          </ul>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
