import React from 'react';
import { useNavigate } from 'react-router-dom';
import LicensePlateInput from '../components/LicensePlateInput';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { MapPin, QrCode } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (licensePlate: string) => {
    navigate(`/map?license=${encodeURIComponent(licensePlate)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size={56} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to ParkEase
            </h1>
            <p className="text-gray-600">Smart Parking Locator</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all hover:shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-sm bg-blue-50 text-blue-600 p-2 rounded">
              <QrCode size={18} />
              <span>You've scanned the QR code successfully!</span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Enter your License Plate Number to locate your parked vehicle
            </h2>
            
            <LicensePlateInput onSearch={handleSearch} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center justify-center gap-2">
              <MapPin size={18} className="text-blue-600" />
              <span>How it works</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Enter your license plate number and our smart system will instantly 
              locate your vehicle in the parking lot. Simply follow the map to find 
              your car!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;