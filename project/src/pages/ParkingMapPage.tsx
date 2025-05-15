import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParkingLevel from '../components/ParkingLevel';
import CarInfoCard from '../components/CarInfoCard';
import { parkingData, findCarByLicensePlate } from '../utils/parkingData';
import { ArrowLeft, Car, AlertCircle } from 'lucide-react';

const ParkingMapPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(parkingData[0].id);
  const [carInfo, setCarInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const licensePlate = searchParams.get('license');
    
    if (licensePlate) {
      searchCar(licensePlate);
    }
  }, [location]);

  const searchCar = (licensePlate: string) => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const result = findCarByLicensePlate(licensePlate);
      
      if (result) {
        setCarInfo(result);
        setSelectedLevel(result.level);
      } else {
        setError('Vehicle not found. Please check the license plate number.');
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const currentLevel = parkingData.find(level => level.id === selectedLevel);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <button 
          onClick={handleBackClick}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Search</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Car className="text-blue-600" size={24} />
                <span>Parking Map</span>
              </h2>
              
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex space-x-2 overflow-x-auto pb-1">
                  {parkingData.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`px-4 py-2 whitespace-nowrap font-medium rounded-t-lg transition-colors ${
                        selectedLevel === level.id
                          ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
              ) : currentLevel ? (
                <ParkingLevel 
                  level={currentLevel} 
                  highlightedSlotId={carInfo?.slot || null}
                />
              ) : null}
            </div>
          </div>
          
          <div className="space-y-6">
            {error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            ) : carInfo ? (
              <CarInfoCard carInfo={carInfo} />
            ) : (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-lg border border-blue-200">
                <p className="font-medium">No vehicle selected</p>
                <p className="text-sm mt-1 text-blue-600">
                  Enter a license plate number to locate a vehicle
                </p>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Parking Statistics</h3>
              
              <div className="space-y-3">
                {parkingData.map(level => {
                  const totalSlots = level.slots.length;
                  const occupiedSlots = level.slots.filter(s => s.isOccupied).length;
                  const occupancyRate = (occupiedSlots / totalSlots) * 100;
                  
                  return (
                    <div key={level.id}>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{level.name}</span>
                        <span className="text-gray-800 font-medium">
                          {occupiedSlots}/{totalSlots} ({Math.round(occupancyRate)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className={`h-2.5 rounded-full ${
                            occupancyRate > 80 ? 'bg-red-500' : 
                            occupancyRate > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${occupancyRate}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParkingMapPage;