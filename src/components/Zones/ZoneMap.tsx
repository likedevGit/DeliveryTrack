import { useState } from 'react'
import { MapPin, Package, Users, TrendingUp, Zap } from 'lucide-react'
import { DeliveryZone } from '../../types'

interface ZoneMapProps {
  zones: DeliveryZone[]
  onZoneSelect: (zone: DeliveryZone) => void
}

export default function ZoneMap({ zones, onZoneSelect }: ZoneMapProps) {
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null)
  const [hoveredZone, setHoveredZone] = useState<DeliveryZone | null>(null)

  const handleZoneClick = (zone: DeliveryZone) => {
    setSelectedZone(zone)
    onZoneSelect(zone)
  }

  const getZoneSize = (parcelsCount: number) => {
    if (parcelsCount >= 5) return 'w-24 h-24'
    if (parcelsCount >= 3) return 'w-20 h-20'
    if (parcelsCount >= 1) return 'w-16 h-16'
    return 'w-12 h-12'
  }

  const getZoneIntensity = (parcelsCount: number) => {
    if (parcelsCount >= 5) return 'shadow-2xl scale-110'
    if (parcelsCount >= 3) return 'shadow-xl scale-105'
    if (parcelsCount >= 1) return 'shadow-lg'
    return 'shadow-md'
  }

  return (
    <div className="card-speed p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-energy-500" />
          <span>Carte des Zones de Livraison</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-fast"></div>
          <span className="text-sm text-green-600 font-semibold">ACTIF</span>
        </div>
      </div>

      {/* Carte interactive */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-80">
        {/* Légende */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">Légende</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Zone active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Zone modérée</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Zone critique</span>
            </div>
          </div>
        </div>

        {/* Zones positionnées */}
        <div className="relative w-full h-full">
          {/* Centre-ville */}
          <div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getZoneSize(zones[0]?.parcelsCount || 0)} ${getZoneIntensity(zones[0]?.parcelsCount || 0)} transition-all duration-300 cursor-pointer`}
            style={{ backgroundColor: zones[0]?.color || '#3B82F6' }}
            onClick={() => handleZoneClick(zones[0])}
            onMouseEnter={() => setHoveredZone(zones[0])}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm relative overflow-hidden">
              <Package className="w-6 h-6" />
              {/* Effet de particules */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-pulse-fast"></div>
                <div className="absolute top-3 right-2 w-1 h-1 bg-white rounded-full animate-pulse-fast" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Quartier Nord */}
          <div 
            className={`absolute top-8 left-1/4 ${getZoneSize(zones[1]?.parcelsCount || 0)} ${getZoneIntensity(zones[1]?.parcelsCount || 0)} transition-all duration-300 cursor-pointer`}
            style={{ backgroundColor: zones[1]?.color || '#EF4444' }}
            onClick={() => handleZoneClick(zones[1])}
            onMouseEnter={() => setHoveredZone(zones[1])}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Quartier Sud */}
          <div 
            className={`absolute bottom-8 left-1/4 ${getZoneSize(zones[2]?.parcelsCount || 0)} ${getZoneIntensity(zones[2]?.parcelsCount || 0)} transition-all duration-300 cursor-pointer`}
            style={{ backgroundColor: zones[2]?.color || '#10B981' }}
            onClick={() => handleZoneClick(zones[2])}
            onMouseEnter={() => setHoveredZone(zones[2])}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Quartier Est */}
          <div 
            className={`absolute top-1/2 right-8 ${getZoneSize(zones[3]?.parcelsCount || 0)} ${getZoneIntensity(zones[3]?.parcelsCount || 0)} transition-all duration-300 cursor-pointer`}
            style={{ backgroundColor: zones[3]?.color || '#F59E0B' }}
            onClick={() => handleZoneClick(zones[3])}
            onMouseEnter={() => setHoveredZone(zones[3])}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Quartier Ouest */}
          <div 
            className={`absolute top-1/2 left-8 ${getZoneSize(zones[4]?.parcelsCount || 0)} ${getZoneIntensity(zones[4]?.parcelsCount || 0)} transition-all duration-300 cursor-pointer`}
            style={{ backgroundColor: zones[4]?.color || '#8B5CF6' }}
            onClick={() => handleZoneClick(zones[4])}
            onMouseEnter={() => setHoveredZone(zones[4])}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
              <Package className="w-5 h-5" />
            </div>
          </div>

          {/* Lignes de connexion */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <line x1="50%" y1="50%" x2="25%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-fast" />
            <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-fast" style={{ animationDelay: '0.5s' }} />
            <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-fast" style={{ animationDelay: '1s' }} />
            <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse-fast" style={{ animationDelay: '1.5s' }} />
          </svg>
        </div>

        {/* Info-bulle de zone */}
        {hoveredZone && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200 animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredZone.color }}></div>
              <span className="font-semibold text-gray-900">{hoveredZone.name}</span>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>{hoveredZone.parcelsCount} colis actifs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Statistiques des zones */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
        {zones.map((zone) => (
          <div 
            key={zone.id}
            className={`text-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              selectedZone?.id === zone.id 
                ? 'bg-gradient-to-r from-energy-500 to-yellow-400 text-white shadow-lg scale-105' 
                : 'bg-white/80 hover:bg-white hover:scale-105'
            }`}
            onClick={() => handleZoneClick(zone)}
          >
            <div className="text-lg font-bold">{zone.parcelsCount}</div>
            <div className={`text-xs ${selectedZone?.id === zone.id ? 'text-white/90' : 'text-gray-600'}`}>
              {zone.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
