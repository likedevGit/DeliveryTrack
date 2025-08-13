import { Parcel } from '../../types'
import ParcelCard from './ParcelCard'

interface ParcelsListProps {
  parcels: Parcel[]
  onStatusChange: (id: number, status: Parcel['status']) => void
}

export default function ParcelsList({ parcels, onStatusChange }: ParcelsListProps) {
  if (parcels.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun colis</h3>
        <p className="text-gray-500">Commencez par créer votre premier colis</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parcels.map((parcel) => (
        <ParcelCard
          key={parcel.id}
          parcel={parcel}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
