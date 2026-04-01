import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Zap } from 'lucide-react';
import { formatTime, formatCurrency, calculateDuration, getStationName } from '../utils/formatters';

export default function TrainCard({ train, onSelectTrain }) {
  const navigate = useNavigate();
  const stations = getStationName(train);
  const trainNo = train['Train No']?.["'"] || train['Train No'] || 'N/A';
  const trainName = train['train Name'] || 'Unknown';
  const departure = formatTime(train['Departure time']);
  const arrival = formatTime(train['Arrival time']);
  const distance = train['Distance'] || 0;
  const basePrice = 500 + Math.floor(distance / 10); // Simple pricing logic

  const handleSelect = () => {
    onSelectTrain?.(train);
    navigate('/seat-selection', { state: { train, price: basePrice } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Train Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{trainName}</h3>
            <p className="text-gray-600 text-sm">Train #{trainNo}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            Available
          </span>
        </div>

        {/* Route Info */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">Departure</p>
            <p className="text-2xl font-bold text-gray-800">{departure}</p>
            <p className="text-gray-600 text-sm mt-1">
              {stations.source || stations.sourceCode}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center gap-1 text-gray-500 mb-1">
                <Zap size={16} />
              </div>
              <p className="text-xs text-gray-600 font-semibold">
                {calculateDuration(departure, arrival)}
              </p>
              <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full my-2 w-16"></div>
              <p className="text-xs text-gray-600">{distance} km</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-xs uppercase font-semibold">Arrival</p>
            <p className="text-2xl font-bold text-gray-800">{arrival}</p>
            <p className="text-gray-600 text-sm mt-1">
              {stations.destination || stations.destinationCode}
            </p>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">From</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(basePrice)}</p>
            <p className="text-gray-600 text-xs">per seat</p>
          </div>
          <button
            onClick={handleSelect}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Select Train
          </button>
        </div>
      </div>
    </div>
  );
}
