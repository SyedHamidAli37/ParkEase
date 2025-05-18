export interface ParkingSlot {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  licensePlate?: string;
}

export interface ParkingLevel {
  id: string;
  name: string;
  slots: ParkingSlot[];
}

export type ParkingData = ParkingLevel[];