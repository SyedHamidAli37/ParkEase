import React from 'react';
import Logo from './Logo';
import { Phone, Mail, Info, FileText, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        <div>
          <Logo className="mb-4" />
          <p className="text-gray-300 max-w-xs">
            Smart parking solution to help you locate your vehicle effortlessly. 
            Never lose your car in a parking lot again.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center gap-2">
                <Info size={16} />
                <span>About ParkEase</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center gap-2">
                <HelpCircle size={16} />
                <span>How It Works</span>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white flex items-center gap-2">
                <FileText size={16} />
                <span>Terms of Service</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-300">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Mail size={16} />
              <span>support@parkease.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>© {new Date().getFullYear()} ParkEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;