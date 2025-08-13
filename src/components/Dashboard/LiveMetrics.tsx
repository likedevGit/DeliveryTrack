import { useState, useEffect } from 'react'
import { Activity, Clock, TrendingUp, Users, Package, Zap } from 'lucide-react'

interface LiveMetricsProps {
  totalParcels: number
  activeDrivers: number
  averageDeliveryTime: number
  efficiency: number
}

export default function LiveMetrics({ totalParcels, activeDrivers, averageDeliveryTime, efficiency }: LiveMetricsProps) {
  const [animatedValues, setAnimatedValues] = useState({
    parcels: 0,
    drivers: 0,
    time: 0,
    efficiency: 0
  })

  useEffect(() => {
    const duration = 2000 // 2 secondes pour l'animation
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        parcels: Math.floor(totalParcels * progress),
        drivers: Math.floor(activeDrivers * progress),
        time: Number((averageDeliveryTime * progress).toFixed(1)),
        efficiency: Math.floor(efficiency * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValues({
          parcels: totalParcels,
          drivers: activeDrivers,
          time: averageDeliveryTime,
          efficiency: efficiency
        })
      }
    }, interval)

    return () => clearInterval(timer)
  }, [totalParcels, activeDrivers, averageDeliveryTime, efficiency])

  const getEfficiencyColor = (eff: number) => {
    if (eff >= 80) return 'from-green-500 to-green-600'
    if (eff >= 60) return 'from-yellow-500 to-yellow-600'
    if (eff >= 40) return 'from-orange-500 to-orange-600'
    return 'from-speed-500 to-red-600'
  }

  const getEfficiencyIcon = (eff: number) => {
    if (eff >= 80) return <TrendingUp className="w-5 h-5 text-green-500" />
    if (eff >= 60) return <Activity className="w-5 h-5 text-yellow-500" />
    return <Zap className="w-5 h-5 text-orange-500" />
  }

  return (
    <div className="card-speed p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Activity className="w-6 h-6 text-energy-500 animate-pulse-fast" />
          <span>Métriques en Temps Réel</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-fast"></div>
          <span className="text-sm text-green-600 font-semibold">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Colis */}
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {animatedValues.parcels}
          </div>
          <div className="text-sm text-blue-700 font-medium">Total Colis</div>
        </div>

        {/* Chauffeurs Actifs */}
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {animatedValues.drivers}
          </div>
          <div className="text-sm text-green-700 font-medium">Chauffeurs Actifs</div>
        </div>

        {/* Temps Moyen */}
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {animatedValues.time}h
          </div>
          <div className="text-sm text-purple-700 font-medium">Temps Moyen</div>
        </div>

        {/* Efficacité */}
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            {getEfficiencyIcon(animatedValues.efficiency)}
          </div>
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {animatedValues.efficiency}%
          </div>
          <div className="text-sm text-orange-700 font-medium">Efficacité</div>
        </div>
      </div>

      {/* Barre de progression globale */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Performance Globale</span>
          <span className="text-sm font-bold text-gray-900">
            {Math.round((animatedValues.efficiency + (100 - animatedValues.time * 10)) / 2)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getEfficiencyColor(animatedValues.efficiency)} rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: `${Math.round((animatedValues.efficiency + (100 - animatedValues.time * 10)) / 2)}%` }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-fast"></div>
          </div>
        </div>
      </div>

      {/* Indicateur de statut */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-fast"></div>
        <span className="text-xs text-gray-500 font-medium">
          Dernière mise à jour: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}
