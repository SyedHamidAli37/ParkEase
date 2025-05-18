import React from 'react';
import ParkingSlot from './ParkingSlot';
import { ParkingLevel as ParkingLevelType, ParkingSlot as ParkingSlotType } from '../types/types';

interface ParkingLevelProps {
  level: ParkingLevelType;
  highlightedSlotId: string | null;
  onSlotClick?: (slot: ParkingSlotType) => void;
}

const ParkingLevel: React.FC<ParkingLevelProps> = ({ 
  level, 
  highlightedSlotId,
  onSlotClick 
}) => {
  // Group slots by row
  const slotsByRow = level.slots.reduce<Record<string, ParkingSlotType[]>>(
    (acc, slot) => {
      if (!acc[slot.row]) {
        acc[slot.row] = [];
      }
      acc[slot.row].push(slot);
      return acc;
    },
    {}
  );

  // Get sorted row keys
  const rows = Object.keys(slotsByRow).sort();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{level.name}</h3>
      
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-4 min-w-max">
          {rows.map((row) => (
            <div key={row} className="flex gap-2 items-center">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full font-semibold text-gray-700">
                {row}
              </div>
              <div className="flex gap-2">
                {slotsByRow[row].map((slot) => (
                  <ParkingSlot
                    key={slot.id}
                    slot={slot}
                    isHighlighted={slot.id === highlightedSlotId}
                    onClick={onSlotClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span className="text-sm text-gray-600">Vacant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
        {highlightedSlotId && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Your Car</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingLevel;