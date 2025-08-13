import { Driver } from '../../types'
import { User, Phone, Truck, MapPin, Circle } from 'lucide-react'

interface DriversListProps {
  drivers: Driver[]
}

const getStatusColor = (status: Driver['status']) => {
  switch (status) {
    case 'available': return 'text-green-600'
    case 'busy': return 'text-orange-600'
    case 'offline': return 'text-gray-600'
    default: return 'text-gray-600'
  }
}

const getStatusText = (status: Driver['status']) => {
  switch (status) {
    case 'available': return 'Disponible'
    case 'busy': return 'Occupé'
    case 'offline': return 'Hors ligne'
    default: return status
  }
}

export default function DriversList({ drivers }: DriversListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Chauffeurs</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {drivers.map((driver) => (
          <div key={driver.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{driver.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      {driver.vehicle}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {driver.phone}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Circle className={`w-2 h-2 ${getStatusColor(driver.status)}`} />
                    <span className={`text-sm font-medium ${getStatusColor(driver.status)}`}>
                      {getStatusText(driver.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {driver.parcelsCount} colis
                  </div>
                </div>
                
                {driver.currentZone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {driver.currentZone}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
