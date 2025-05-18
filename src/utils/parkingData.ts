import { ParkingData } from '../types/types';

// Generate random slots with some occupied and some vacant
const generateParkingSlots = (rowCount: number, slotsPerRow: number, occupancyRate: number = 0.7) => {
  const rows = Array.from({ length: rowCount }, (_, i) => String.fromCharCode(65 + i));
  
  return rows.flatMap(row => 
    Array.from({ length: slotsPerRow }, (_, i) => {
      const isOccupied = Math.random() < occupancyRate;
      return {
        id: `${row}${i + 1}`,
        row,
        number: i + 1,
        isOccupied,
        licensePlate: isOccupied ? generateRandomLicensePlate() : undefined
      };
    })
  );
};

// Generate a random license plate
const generateRandomLicensePlate = () => {
  const states = ['KA', 'MH', 'TN', 'DL', 'KL', 'AP'];
  const state = states[Math.floor(Math.random() * states.length)];
  const district = Math.floor(Math.random() * 99).toString().padStart(2, '0');
  const series = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const number = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  
  return `${state}${district}${series}${number}`;
};

// Create parking data with multiple levels
export const parkingData: ParkingData = [
  {
    id: 'level-1',
    name: 'Level 1',
    slots: generateParkingSlots(5, 10, 0.7)
  },
  {
    id: 'level-2',
    name: 'Level 2',
    slots: generateParkingSlots(5, 8, 0.6)
  },
  {
    id: 'level-3',
    name: 'Level 3',
    slots: generateParkingSlots(4, 12, 0.5)
  }
];

// Function to find a car by license plate
export const findCarByLicensePlate = (licensePlate: string) => {
  // If empty, return null
  if (!licensePlate.trim()) return null;
  
  // For demo purposes, either:
  // 1. Find a real match if it exists in our data
  // 2. Or assign to a random slot if no match found
  
  for (const level of parkingData) {
    const slot = level.slots.find(slot => 
      slot.licensePlate?.toLowerCase() === licensePlate.toLowerCase()
    );
    
    if (slot) {
      return {
        level: level.id,
        levelName: level.name,
        slot: slot.id,
        row: slot.row,
        number: slot.number,
        licensePlate
      };
    }
  }
  
  // If no match found, assign to a random vacant slot for demo purposes
  const level = parkingData[Math.floor(Math.random() * parkingData.length)];
  const vacantSlots = level.slots.filter(slot => !slot.isOccupied);
  
  if (vacantSlots.length > 0) {
    const randomSlot = vacantSlots[Math.floor(Math.random() * vacantSlots.length)];
    // Update the slot with the license plate
    randomSlot.isOccupied = true;
    randomSlot.licensePlate = licensePlate;
    
    return {
      level: level.id,
      levelName: level.name,
      slot: randomSlot.id,
      row: randomSlot.row,
      number: randomSlot.number,
      licensePlate
    };
  }
  
  return null;
};