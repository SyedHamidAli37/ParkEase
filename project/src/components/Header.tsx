import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          onClick={() => navigate('/')}
          className="cursor-pointer"
        >
          <Logo />
        </div>
        <nav className="hidden sm:flex gap-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;