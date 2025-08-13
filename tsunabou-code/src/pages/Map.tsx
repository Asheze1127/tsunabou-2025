import React, { useState } from 'react';
import { MapPin, AlertTriangle, Info, X } from 'lucide-react';
import { dummyDisasterPins } from '../utils/dummyData';
import { DisasterPin } from '../types';

const Map: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<DisasterPin | null>(null);
  const [pins] = useState<DisasterPin[]>(dummyDisasterPins);

  const getPinColor = (reliability: number) => {
    if (reliability >= 0.8) return 'text-red-600';
    if (reliability >= 0.6) return 'text-orange-500';
    return 'text-yellow-500';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}時間前`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}日前`;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 relative z-10">
        <h1 className="text-xl font-bold flex items-center">
          <MapPin size={24} className="mr-2" />
          防災マップ
        </h1>
        <p className="text-yellow-100 text-sm mt-1">災害情報をリアルタイムで確認</p>
      </header>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 border-b border-gray-300">
        {/* Simplified Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200">
          {/* Grid lines to simulate map */}
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4B5563" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Roads simulation */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400 transform -translate-x-1/2"></div>
        </div>

        {/* Disaster Pins */}
        {pins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${getPinColor(pin.reliability)}`}
            style={{
              left: `${((pin.lng - 139.6400) / 0.015) * 100}%`,
              top: `${((35.6900 - pin.lat) / 0.020) * 100}%`
            }}
            aria-label={`災害情報: ${pin.title}`}
          >
            <AlertTriangle size={32} className="drop-shadow-md" />
          </button>
        ))}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
          <h4 className="text-xs font-bold mb-2">信頼度</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-red-600" />
              <span>高 (80%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-orange-500" />
              <span>中 (60-79%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-yellow-500" />
              <span>低 (60%未満)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Panel */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="flex items-center mb-3">
            <Info size={20} className="text-blue-600 mr-2" />
            <h3 className="font-bold">災害情報一覧</h3>
          </div>
          
          <div className="space-y-3">
            {pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-sm">{pin.title}</h4>
                  <span className="text-xs text-gray-500">{formatTimeAgo(pin.timestamp)}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{pin.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">by {pin.author}</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${pin.reliability >= 0.8 ? 'bg-red-500' : pin.reliability >= 0.6 ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs text-gray-500">{Math.round(pin.reliability * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pin Detail Modal */}
      {selectedPin && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50" onClick={() => setSelectedPin(null)}>
          <div 
            className="bg-white rounded-t-2xl p-6 w-full max-w-md max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{selectedPin.title}</h3>
              <button
                onClick={() => setSelectedPin(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="閉じる"
              >
                <X size={24} />
              </button>
            </div>
            
            {selectedPin.image && (
              <img
                src={selectedPin.image}
                alt={selectedPin.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            
            <p className="text-gray-700 mb-4">{selectedPin.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">投稿者:</span>
                <p className="font-medium">{selectedPin.author}</p>
              </div>
              <div>
                <span className="text-gray-500">時刻:</span>
                <p className="font-medium">{formatTimeAgo(selectedPin.timestamp)}</p>
              </div>
              <div>
                <span className="text-gray-500">信頼度:</span>
                <p className="font-medium">{Math.round(selectedPin.reliability * 100)}%</p>
              </div>
              <div>
                <span className="text-gray-500">位置:</span>
                <p className="font-medium">{selectedPin.lat.toFixed(4)}, {selectedPin.lng.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;