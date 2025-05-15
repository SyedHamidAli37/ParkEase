import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface LicensePlateInputProps {
  onSearch: (licensePlate: string) => void;
}

const LicensePlateInput: React.FC<LicensePlateInputProps> = ({ onSearch }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!licensePlate.trim()) {
      setError('Please enter a license plate number');
      return;
    }
    
    // Basic validation - at least 4 characters
    if (licensePlate.trim().length < 4) {
      setError('License plate must be at least 4 characters');
      return;
    }
    
    setError(null);
    onSearch(licensePlate);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <label 
          htmlFor="license-plate" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          License Plate Number
        </label>
        <div className="relative">
          <input
            id="license-plate"
            type="text"
            placeholder="e.g., KA01AB1234"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            className={`w-full px-4 py-3 bg-gray-50 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex justify-center items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
      >
        <Search size={20} />
        <span>Find My Car</span>
      </button>
    </form>
  );
};

export default LicensePlateInput;