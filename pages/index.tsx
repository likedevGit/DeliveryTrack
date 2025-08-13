import { useState, useEffect } from 'react'
import { Parcel, Driver, DeliveryZone, DeliveryStats } from '../src/types'
import { mockParcels, mockDrivers, mockZones, mockStats } from '../src/data/mockData'
import DeliveryStatsComponent from '../src/components/Dashboard/DeliveryStats'
import PerformanceIndicator from '../src/components/Dashboard/PerformanceIndicator'
import LiveMetrics from '../src/components/Dashboard/LiveMetrics'
import StatusChart from '../src/components/Charts/StatusChart'
import PriorityChart from '../src/components/Charts/PriorityChart'
import ZoneChart from '../src/components/Charts/ZoneChart'
import ZoneMap from '../src/components/Zones/ZoneMap'
import ParcelForm from '../src/components/Parcels/ParcelForm'
import ParcelsList from '../src/components/Parcels/ParcelsList'
import DriversList from '../src/components/Drivers/DriversList'
import LiveNotification from '../src/components/Notifications/LiveNotification'
import { Package, Truck, BarChart3, Users, MapPin, Zap, Rocket, Target, Bell, TrendingUp, CheckCircle } from 'lucide-react'

interface Notification {
  id: number
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  timestamp: Date
}

export default function DeliveryTrack() {
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels)
  const [drivers] = useState<Driver[]>(mockDrivers)
  const [zones] = useState<DeliveryZone[]>(mockZones)
  const [stats] = useState<DeliveryStats>(mockStats)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'parcels' | 'drivers'>('dashboard')
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null)

  // Simuler des notifications en temps réel
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const types: Notification['type'][] = ['success', 'warning', 'info']
      const randomType = types[Math.floor(Math.random() * types.length)]
      
      const newNotification: Notification = {
        id: Date.now(),
        type: randomType,
        title: getRandomNotificationTitle(randomType),
        message: getRandomNotificationMessage(randomType),
        timestamp: new Date()
      }
      
      setNotifications(prev => [...prev, newNotification])
    }, 8000) // Nouvelle notification toutes les 8 secondes

    return () => clearInterval(notificationInterval)
  }, [])

  function getRandomNotificationTitle(type: Notification['type']): string {
    switch (type) {
      case 'success':
        return 'Livraison terminée !'
      case 'warning':
        return 'Attention requise'
      case 'info':
        return 'Mise à jour statut'
      default:
        return 'Notification'
    }
  }

  function getRandomNotificationMessage(type: Notification['type']): string {
    switch (type) {
      case 'success':
        return 'Colis #' + Math.floor(Math.random() * 1000) + ' livré avec succès'
      case 'warning':
        return 'Retard détecté sur la livraison #' + Math.floor(Math.random() * 1000)
      case 'info':
        return 'Nouveau colis créé dans la zone ' + ['Centre-ville', 'Quartier Nord', 'Quartier Sud'][Math.floor(Math.random() * 3)]
      default:
        return 'Mise à jour du système'
    }
  }

  function addParcel(parcelData: {
    from: string
    to: string
    driver: string
    note: string
    priority: 'low' | 'medium' | 'high'
    zone: string
  }) {
    const newParcel: Parcel = {
      id: Date.now(),
      ...parcelData,
      status: 'created',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 2 * 60 * 60 * 1000) // +2h
    }
    setParcels(prev => [...prev, newParcel])

    // Ajouter une notification de succès
    const successNotification: Notification = {
      id: Date.now() + 1,
      type: 'success',
      title: 'Nouveau colis créé !',
      message: `Colis de ${parcelData.from} vers ${parcelData.to} ajouté avec succès`,
      timestamp: new Date()
    }
    setNotifications(prev => [...prev, successNotification])
  }

  function setStatus(id: number, status: Parcel['status']) {
    setParcels(prev => prev.map(p => 
      p.id === id ? { ...p, status, actualDelivery: status === 'delivered' ? new Date() : undefined } : p
    ))

    // Ajouter une notification de mise à jour
    const updateNotification: Notification = {
      id: Date.now() + 1,
      type: 'info',
      title: 'Statut mis à jour',
      message: `Colis #${id} maintenant ${status === 'delivered' ? 'livré' : status === 'in-transit' ? 'en transit' : 'créé'}`,
      timestamp: new Date()
    }
    setNotifications(prev => [...prev, updateNotification])
  }

  function handleZoneSelect(zone: DeliveryZone) {
    setSelectedZone(zone)
  }

  function handleNotificationDismiss(id: number) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3, color: 'from-speed-500 to-energy-500' },
    { id: 'parcels', label: 'Colis', icon: Package, color: 'from-energy-500 to-yellow-400' },
    { id: 'drivers', label: 'Chauffeurs', icon: Users, color: 'from-yellow-400 to-orange-400' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-power-900 via-power-800 to-power-900">
      {/* Header avec effet de vitesse */}
      <header className="bg-gradient-to-r from-speed-600 via-energy-500 to-yellow-400 shadow-2xl border-b-4 border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="w-7 h-7 text-white animate-bounce-fast" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                  <span>DeliveryTrack</span>
                  <Zap className="w-6 h-6 text-yellow-300 animate-pulse-fast" />
                </h1>
                <p className="text-white/80 text-sm font-medium">Performance & Vitesse</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
                <Bell className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">🚀 Mode Turbo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs avec animations */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-6 rounded-t-xl font-semibold text-sm flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <Target className="w-4 h-4 animate-pulse-fast" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content avec animations */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Métriques en temps réel */}
            <div className="animate-slide-in-right">
              <LiveMetrics 
                totalParcels={stats.totalParcels}
                activeDrivers={drivers.filter(d => d.status === 'available' || d.status === 'busy').length}
                averageDeliveryTime={stats.averageDeliveryTime}
                efficiency={stats.driverEfficiency}
              />
            </div>

            {/* Stats Cards */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <DeliveryStatsComponent stats={stats} />
            </div>
            
            {/* Indicateurs de performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <PerformanceIndicator
                  value={stats.driverEfficiency}
                  maxValue={100}
                  label="Efficacité des Chauffeurs"
                  color="bg-gradient-to-r from-indigo-500 to-indigo-600"
                  icon={<TrendingUp className="w-6 h-6 text-white" />}
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <PerformanceIndicator
                  value={stats.deliveredToday}
                  maxValue={stats.totalParcels}
                  label="Livraisons du Jour"
                  color="bg-gradient-to-r from-green-500 to-green-600"
                  icon={<CheckCircle className="w-6 h-6 text-white" />}
                />
              </div>
            </div>
            
            {/* Charts Grid avec animations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <StatusChart parcels={parcels} />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <PriorityChart parcels={parcels} />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <ZoneChart zones={zones} />
              </div>
            </div>

            {/* Carte interactive des zones */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <ZoneMap zones={zones} onZoneSelect={handleZoneSelect} />
            </div>
          </div>
        )}

        {activeTab === 'parcels' && (
          <div className="space-y-8 animate-fade-in-up">
            <ParcelForm onSubmit={addParcel} />
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Package className="w-6 h-6 text-energy-400" />
                <span>Colis ({parcels.length})</span>
                <div className="bg-gradient-to-r from-speed-500 to-energy-500 px-3 py-1 rounded-full text-white text-sm font-bold">
                  ACTIF
                </div>
              </h2>
              <ParcelsList parcels={parcels} onStatusChange={setStatus} />
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="card-speed p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <Users className="w-6 h-6 text-speed-500" />
                <span>Vue d'ensemble des chauffeurs</span>
                <div className="speed-gradient px-3 py-1 rounded-full text-white text-sm font-bold">
                  PERFORMANCE
                </div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-green-600">
                    {drivers.filter(d => d.status === 'available').length}
                  </div>
                  <div className="text-sm text-green-700 font-semibold">Disponibles</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-energy-50 to-energy-100 rounded-xl border-2 border-energy-200 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-energy-600">
                    {drivers.filter(d => d.status === 'busy').length}
                  </div>
                  <div className="text-sm text-energy-700 font-semibold">En livraison</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-power-50 to-power-100 rounded-xl border-2 border-power-200 hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-power-600">
                    {drivers.filter(d => d.status === 'offline').length}
                  </div>
                  <div className="text-sm text-power-700 font-semibold">Hors ligne</div>
                </div>
              </div>
            </div>
            
            <DriversList drivers={drivers} />
          </div>
        )}
      </main>

      {/* Notifications en temps réel */}
      <LiveNotification 
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
      />
    </div>
  )
}
