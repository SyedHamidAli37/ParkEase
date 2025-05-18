import React from 'react';
import { Car, MapPin } from 'lucide-react';

interface CarInfo {
  level: string;
  levelName: string;
  slot: string;
  row: string;
  number: number;
  licensePlate: string;
}

interface CarInfoCardProps {
  carInfo: CarInfo;
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({ carInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl border-l-4 border-yellow-500 p-4 max-w-sm w-full animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-yellow-100 p-3">
          <Car className="h-6 w-6 text-yellow-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">We Found Your Car!</h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">License Plate:</span>
              <span className="font-semibold text-gray-800">{carInfo.licensePlate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Level:</span>
              <span className="font-semibold text-gray-800">{carInfo.levelName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Slot:</span>
              <span className="font-semibold text-gray-800">{carInfo.slot}</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <MapPin size={16} />
              <span>Row {carInfo.row}, Slot {carInfo.number}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfoCard;