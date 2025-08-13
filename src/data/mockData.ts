import { Parcel, Driver, DeliveryZone, DeliveryStats } from '../types'

export const mockParcels: Parcel[] = [
  {
    id: 1,
    from: 'Entrepôt Central',
    to: 'Boulangerie du Centre',
    status: 'delivered',
    driver: 'Jean Dupont',
    note: 'Livraison fragile',
    priority: 'high',
    createdAt: new Date('2024-01-15T08:00:00'),
    estimatedDelivery: new Date('2024-01-15T10:00:00'),
    actualDelivery: new Date('2024-01-15T09:45:00'),
    zone: 'Centre-ville'
  },
  {
    id: 2,
    from: 'Entrepôt Nord',
    to: 'Restaurant Le Gourmet',
    status: 'in-transit',
    driver: 'Marie Martin',
    note: 'Livraison urgente',
    priority: 'high',
    createdAt: new Date('2024-01-15T09:00:00'),
    estimatedDelivery: new Date('2024-01-15T11:30:00'),
    zone: 'Quartier Nord'
  },
  {
    id: 3,
    from: 'Entrepôt Sud',
    to: 'Pharmacie Saint-Jean',
    status: 'created',
    driver: 'Pierre Durand',
    note: 'Produits réfrigérés',
    priority: 'medium',
    createdAt: new Date('2024-01-15T10:00:00'),
    estimatedDelivery: new Date('2024-01-15T14:00:00'),
    zone: 'Quartier Sud'
  },
  {
    id: 4,
    from: 'Entrepôt Est',
    to: 'Café des Arts',
    status: 'in-transit',
    driver: 'Sophie Bernard',
    note: 'Livraison standard',
    priority: 'low',
    createdAt: new Date('2024-01-15T08:30:00'),
    estimatedDelivery: new Date('2024-01-15T12:00:00'),
    zone: 'Quartier Est'
  },
  {
    id: 5,
    from: 'Entrepôt Ouest',
    to: 'Boutique Mode',
    status: 'created',
    driver: 'Lucas Petit',
    note: 'Vêtements sur cintres',
    priority: 'medium',
    createdAt: new Date('2024-01-15T11:00:00'),
    estimatedDelivery: new Date('2024-01-15T15:00:00'),
    zone: 'Quartier Ouest'
  }
]

export const mockDrivers: Driver[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    vehicle: 'Camionnette Renault Master',
    phone: '06 12 34 56 78',
    status: 'available',
    currentZone: 'Centre-ville',
    parcelsCount: 2
  },
  {
    id: 2,
    name: 'Marie Martin',
    vehicle: 'Fourgon Mercedes Sprinter',
    phone: '06 23 45 67 89',
    status: 'busy',
    currentZone: 'Quartier Nord',
    parcelsCount: 1
  },
  {
    id: 3,
    name: 'Pierre Durand',
    vehicle: 'Camionnette Peugeot Boxer',
    phone: '06 34 56 78 90',
    status: 'available',
    currentZone: 'Quartier Sud',
    parcelsCount: 1
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    vehicle: 'Fourgon Ford Transit',
    phone: '06 45 67 89 01',
    status: 'busy',
    currentZone: 'Quartier Est',
    parcelsCount: 1
  },
  {
    id: 5,
    name: 'Lucas Petit',
    vehicle: 'Camionnette Citroën Jumper',
    phone: '06 56 78 90 12',
    status: 'available',
    currentZone: 'Quartier Ouest',
    parcelsCount: 1
  }
]

export const mockZones: DeliveryZone[] = [
  { id: 1, name: 'Centre-ville', color: '#3B82F6', parcelsCount: 2 },
  { id: 2, name: 'Quartier Nord', color: '#EF4444', parcelsCount: 1 },
  { id: 3, name: 'Quartier Sud', color: '#10B981', parcelsCount: 1 },
  { id: 4, name: 'Quartier Est', color: '#F59E0B', parcelsCount: 1 },
  { id: 5, name: 'Quartier Ouest', color: '#8B5CF6', parcelsCount: 1 }
]

export const mockStats: DeliveryStats = {
  totalParcels: 5,
  deliveredToday: 1,
  inTransit: 2,
  delayed: 0,
  averageDeliveryTime: 2.5,
  driverEfficiency: 85
}
