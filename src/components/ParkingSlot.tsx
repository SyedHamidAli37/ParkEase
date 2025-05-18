import React from 'react';
import { Car } from 'lucide-react';
import { ParkingSlot as ParkingSlotType } from '../types/types';

interface ParkingSlotProps {
  slot: ParkingSlotType;
  isHighlighted: boolean;
  onClick?: (slot: ParkingSlotType) => void;
}

const ParkingSlot: React.FC<ParkingSlotProps> = ({ 
  slot, 
  isHighlighted,
  onClick 
}) => {
  const getSlotColor = () => {
    if (isHighlighted) {
      return 'bg-yellow-400 border-yellow-500 shadow-lg scale-110 z-10';
    }
    return slot.isOccupied 
      ? 'bg-red-100 border-red-300' 
      : 'bg-green-100 border-green-300';
  };

  const getLabelColor = () => {
    if (isHighlighted) {
      return 'bg-yellow-500 text-white';
    }
    return slot.isOccupied 
      ? 'bg-red-500 text-white' 
      : 'bg-green-500 text-white';
  };

  return (
    <div 
      className={`relative w-14 h-14 sm:w-16 sm:h-16 border-2 rounded-md flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-300 ${getSlotColor()}`}
      onClick={() => onClick?.(slot)}
    >
      <div className={`absolute top-0 left-0 text-xs font-semibold px-1 rounded-br ${getLabelColor()}`}>
        {slot.id}
      </div>
      
      {slot.isOccupied && (
        <div className="mt-2">
          <Car size={isHighlighted ? 24 : 20} className={isHighlighted ? 'text-yellow-700' : 'text-gray-600'} />
        </div>
      )}
      
      {isHighlighted && (
        <div className="absolute -bottom-1 inset-x-0 mx-auto w-3 h-3 bg-yellow-400 transform rotate-45 border-r-2 border-b-2 border-yellow-500"></div>
      )}
    </div>
  );
};

export default ParkingSlot;