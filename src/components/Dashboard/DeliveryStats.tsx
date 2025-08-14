import type { DeliveryStats as DeliveryStatsType } from '../../types'
// Build cache buster - force rebuild
import { Package, Truck, Clock, CheckCircle, AlertTriangle, TrendingUp, Zap, Rocket } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
  gradient: string
}

const StatsCard = ({ title, value, icon, color, subtitle, gradient }: StatsCardProps) => (
  <div className={`stat-card bg-gradient-to-br ${gradient} border-2 hover:border-white/40`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-600 mt-1 font-medium">{subtitle}</p>}
      </div>
      <div className={`p-4 rounded-2xl ${color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}>
        {icon}
      </div>
    </div>
  </div>
)

interface DeliveryStatsProps {
  stats: DeliveryStatsType
}

export default function DeliveryStats({ stats }: DeliveryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Total Colis"
        value={stats.totalParcels}
        icon={<Package className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-speed-500 to-speed-600"
        subtitle="En cours de traitement"
        gradient="from-white/95 to-white/90"
      />
      
      <StatsCard
        title="Livrés Aujourd'hui"
        value={stats.deliveredToday}
        icon={<CheckCircle className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-green-500 to-green-600"
        subtitle="Livraisons terminées"
        gradient="from-white/95 to-white/90"
      />
      
      <StatsCard
        title="En Transit"
        value={stats.inTransit}
        icon={<Truck className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-energy-500 to-energy-600"
        subtitle="En cours de livraison"
        gradient="from-white/95 to-white/90"
      />
      
      <StatsCard
        title="En Retard"
        value={stats.delayed}
        icon={<AlertTriangle className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-speed-500 to-red-500"
        subtitle="Livraisons en retard"
        gradient="from-white/95 to-white/90"
      />
      
      <StatsCard
        title="Temps Moyen"
        value={`${stats.averageDeliveryTime}h`}
        icon={<Clock className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-purple-500 to-purple-600"
        subtitle="Durée moyenne"
        gradient="from-white/95 to-white/90"
      />
      
      <StatsCard
        title="Efficacité"
        value={`${stats.driverEfficiency}%`}
        icon={<TrendingUp className="w-7 h-7 text-white" />}
        color="bg-gradient-to-r from-indigo-500 to-indigo-600"
        subtitle="Performance chauffeurs"
        gradient="from-white/95 to-white/90"
      />
    </div>
  )
}
