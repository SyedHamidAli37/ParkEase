import React from 'react';
import { ParkingSquare } from 'lucide-react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ParkingSquare 
        size={size} 
        className="text-blue-600" 
        strokeWidth={2.5}
      />
      <span className="font-bold text-xl tracking-tight">
        <span className="text-blue-600">Park</span>
        <span className="text-teal-600">Ease</span>
      </span>
    </div>
  );
};

export default Logo;