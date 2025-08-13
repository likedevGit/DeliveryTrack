import { useState } from 'react'
import { Package, Zap, Rocket } from 'lucide-react'

interface ParcelFormProps {
  onSubmit: (parcel: {
    from: string
    to: string
    driver: string
    note: string
    priority: 'low' | 'medium' | 'high'
    zone: string
  }) => void
}

export default function ParcelForm({ onSubmit }: ParcelFormProps) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [driver, setDriver] = useState('')
  const [note, setNote] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [zone, setZone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!from.trim() || !to.trim()) return
    
    onSubmit({ from, to, driver, note, priority, zone })
    
    setFrom('')
    setTo('')
    setDriver('')
    setNote('')
    setPriority('medium')
    setZone('')
  }

  return (
    <div className="card-speed p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-speed-500 to-energy-500 rounded-xl flex items-center justify-center shadow-lg">
          <Package className="w-5 h-5 text-white" />
        </div>
        <span>Nouveau Colis</span>
        <div className="bg-gradient-to-r from-speed-500 to-energy-500 px-3 py-1 rounded-full text-white text-sm font-bold">
          CRÉATION RAPIDE
        </div>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Expéditeur</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300"
              placeholder="Entrepôt Central"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Destinataire</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300"
              placeholder="Boulangerie du Centre"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Chauffeur</label>
            <input
              type="text"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300"
              placeholder="Jean Dupont"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Priorité</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300"
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Zone</label>
            <input
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300"
              placeholder="Centre-ville"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-energy-500 focus:border-energy-500 transition-all duration-200 hover:border-gray-300 resize-none"
            placeholder="Informations importantes sur le colis..."
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full btn-speed text-lg py-4 rounded-xl font-bold transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <div className="flex items-center justify-center space-x-3">
            <Rocket className="w-5 h-5" />
            <span>CRÉER LE COLIS</span>
            <Zap className="w-5 h-5" />
          </div>
        </button>
      </form>
    </div>
  )
}
