import { Parcel } from '../../types'
import { Package, MapPin, User, Clock, AlertTriangle, Zap, Rocket } from 'lucide-react'

interface ParcelCardProps {
  parcel: Parcel
  onStatusChange: (id: number, status: Parcel['status']) => void
}

const getStatusColor = (status: Parcel['status']) => {
  switch (status) {
    case 'created': return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    case 'in-transit': return 'bg-gradient-to-r from-energy-500 to-energy-600 text-white'
    case 'delivered': return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
    default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
  }
}

const getPriorityColor = (priority: Parcel['priority']) => {
  switch (priority) {
    case 'low': return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
    case 'medium': return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
    case 'high': return 'bg-gradient-to-r from-speed-500 to-red-600 text-white'
    default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
  }
}

export default function ParcelCard({ parcel, onStatusChange }: ParcelCardProps) {
  const isDelayed = parcel.estimatedDelivery && new Date() > parcel.estimatedDelivery && parcel.status !== 'delivered'

  return (
    <div className="card-speed hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-speed-500 to-energy-500 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">#{parcel.id}</span>
        </div>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(parcel.priority)} shadow-md`}>
            {parcel.priority === 'low' ? 'Basse' : parcel.priority === 'medium' ? 'Moyenne' : 'Haute'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(parcel.status)} shadow-md`}>
            {parcel.status === 'created' ? 'Créé' : parcel.status === 'in-transit' ? 'En Transit' : 'Livré'}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-energy-500" />
          <div className="text-sm">
            <span className="font-bold text-gray-900">{parcel.from}</span>
            <span className="text-gray-500 mx-2">→</span>
            <span className="font-bold text-gray-900">{parcel.to}</span>
          </div>
        </div>

        {parcel.driver && (
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-speed-500" />
            <span className="text-sm text-gray-700 font-medium">{parcel.driver}</span>
          </div>
        )}

        {parcel.note && (
          <div className="text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border-l-4 border-energy-400">
            <span className="font-medium">Note:</span> {parcel.note}
          </div>
        )}

        {isDelayed && (
          <div className="flex items-center space-x-3 text-speed-600 bg-gradient-to-r from-speed-50 to-red-50 p-3 rounded-lg border-l-4 border-speed-500">
            <AlertTriangle className="w-5 h-5 animate-pulse-fast" />
            <span className="text-sm font-bold">EN RETARD - Action requise !</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onStatusChange(parcel.id, 'created')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 transform hover:scale-105 ${
            parcel.status === 'created' 
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
          }`}
        >
          Créé
        </button>
        <button
          onClick={() => onStatusChange(parcel.id, 'in-transit')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 transform hover:scale-105 ${
            parcel.status === 'in-transit' 
              ? 'bg-gradient-to-r from-energy-600 to-energy-700 text-white shadow-lg' 
              : 'bg-gradient-to-r from-energy-100 to-energy-200 text-energy-700 hover:from-energy-200 hover:to-energy-300'
          }`}
        >
          En Transit
        </button>
        <button
          onClick={() => onStatusChange(parcel.id, 'delivered')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 transform hover:scale-105 ${
            parcel.status === 'delivered' 
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg' 
              : 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 hover:from-green-200 hover:to-green-300'
          }`}
        >
          Livré
        </button>
      </div>
    </div>
  )
}
