export interface Parcel {
  id: number
  from: string
  to: string
  status: 'created' | 'in-transit' | 'delivered'
  driver?: string
  note?: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  estimatedDelivery?: Date
  actualDelivery?: Date
  zone: string
}

export interface Driver {
  id: number
  name: string
  vehicle: string
  phone: string
  status: 'available' | 'busy' | 'offline'
  currentZone?: string
  parcelsCount: number
}

export interface DeliveryZone {
  id: number
  name: string
  color: string
  parcelsCount: number
}

export interface DeliveryStats {
  totalParcels: number
  deliveredToday: number
  inTransit: number
  delayed: number
  averageDeliveryTime: number
  driverEfficiency: number
}
