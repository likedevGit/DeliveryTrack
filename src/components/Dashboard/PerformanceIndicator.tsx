import { useState, useEffect } from 'react'
import { TrendingUp, Zap, Target, Rocket } from 'lucide-react'

interface PerformanceIndicatorProps {
  value: number
  maxValue: number
  label: string
  color: string
  icon: React.ReactNode
}

export default function PerformanceIndicator({ value, maxValue, label, color, icon }: PerformanceIndicatorProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = (value / maxValue) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 500)
    return () => clearTimeout(timer)
  }, [value])

  const getPerformanceColor = (percent: number) => {
    if (percent >= 80) return 'from-green-500 to-green-600'
    if (percent >= 60) return 'from-yellow-500 to-yellow-600'
    if (percent >= 40) return 'from-orange-500 to-orange-600'
    return 'from-speed-500 to-red-600'
  }

  const getPerformanceText = (percent: number) => {
    if (percent >= 80) return 'Excellent'
    if (percent >= 60) return 'Bon'
    if (percent >= 40) return 'Moyen'
    return 'À améliorer'
  }

  return (
    <div className="card-speed p-6 relative overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full animate-pulse-fast"></div>
        <div className="absolute top-8 right-4 w-1 h-1 bg-white rounded-full animate-pulse-fast" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse-fast" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{label}</h3>
              <p className="text-sm text-gray-600">{getPerformanceText(percentage)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{animatedValue}</div>
            <div className="text-sm text-gray-500">sur {maxValue}</div>
          </div>
        </div>

        {/* Barre de progression animée */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getPerformanceColor(percentage)} rounded-full transition-all duration-1000 ease-out relative`}
            style={{ width: `${percentage}%` }}
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-fast"></div>
          </div>
        </div>

        {/* Indicateur de pourcentage avec animation */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            {percentage.toFixed(1)}% de performance
          </span>
          <div className="flex items-center space-x-2">
            {percentage >= 80 && <Rocket className="w-4 h-4 text-green-500 animate-bounce-fast" />}
            {percentage >= 60 && percentage < 80 && <Target className="w-4 h-4 text-yellow-500" />}
            {percentage < 60 && <Zap className="w-4 h-4 text-orange-500 animate-pulse-fast" />}
          </div>
        </div>
      </div>

      {/* Bordure animée */}
      <div className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r ${getPerformanceColor(percentage)} bg-clip-border opacity-20`}></div>
    </div>
  )
}
