import React, { useState } from 'react';
import { MapPin, AlertTriangle, Info, X } from 'lucide-react';
import { dummyDisasterPins } from '../utils/dummyData';
import { DisasterPin } from '../types';

const Map: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<DisasterPin | null>(null);
  const [pins] = useState<DisasterPin[]>(dummyDisasterPins);

  const getPinColor = (reliability: number) => {
    if (reliability >= 0.8) return 'text-destructive';
    if (reliability >= 0.6) return 'text-orange-500'; // No direct equivalent in new palette, keep for now
    return 'text-yellow-500'; // No direct equivalent in new palette, keep for now
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
    <div className="flex flex-col md:flex-row h-full">
      {/* Map Container */}
      <div className="md:w-2/3 h-96 md:h-full relative bg-muted">
        {/* Simplified Map Background */}
        <div className="absolute inset-0 bg-muted">
          {/* Grid lines to simulate map */}
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Roads simulation */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-muted-foreground transform -translate-y-1/2"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-muted-foreground transform -translate-x-1/2"></div>
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
        <div className="absolute top-4 right-4 bg-card text-card-foreground p-3 rounded-lg shadow-md border border-border">
          <h4 className="text-xs font-bold mb-2">信頼度</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-destructive" />
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
      <div className="md:w-1/3 p-4 overflow-y-auto">
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow-md border border-border">
          <div className="flex items-center mb-3">
            <Info size={20} className="text-primary mr-2" />
            <h3 className="font-bold text-lg">災害情報一覧</h3>
          </div>
          
          <div className="space-y-3">
            {pins.map((pin) => (
              <div
                key={pin.id}
                onClick={() => setSelectedPin(pin)}
                className="p-3 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-sm">{pin.title}</h4>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(pin.timestamp)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{pin.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">by {pin.author}</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${pin.reliability >= 0.8 ? 'bg-destructive' : pin.reliability >= 0.6 ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs text-muted-foreground">{Math.round(pin.reliability * 100)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pin Detail Modal */}
      {selectedPin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-end justify-center z-50" onClick={() => setSelectedPin(null)}>
          <div 
            className="bg-card text-card-foreground rounded-t-lg md:rounded-lg p-6 w-full max-w-md max-h-[70vh] md:max-h-[80vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{selectedPin.title}</h3>
              <button
                onClick={() => setSelectedPin(null)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                aria-label="閉じる"
              >
                <X size={24} />
              </button>
            </div>
            
            {selectedPin.image && (
              <img
                src={selectedPin.image}
                alt={selectedPin.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            
            <p className="text-muted-foreground mb-4">{selectedPin.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">投稿者:</span>
                <p className="font-medium">{selectedPin.author}</p>
              </div>
              <div>
                <span className="text-muted-foreground">時刻:</span>
                <p className="font-medium">{formatTimeAgo(selectedPin.timestamp)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">信頼度:</span>
                <p className="font-medium">{Math.round(selectedPin.reliability * 100)}%</p>
              </div>
              <div>
                <span className="text-muted-foreground">位置:</span>
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