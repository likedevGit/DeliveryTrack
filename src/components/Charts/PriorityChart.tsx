import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Parcel } from '../../types'

interface PriorityChartProps {
  parcels: Parcel[]
}

export default function PriorityChart({ parcels }: PriorityChartProps) {
  const priorityCounts = parcels.reduce((acc, parcel) => {
    acc[parcel.priority] = (acc[parcel.priority] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = [
    { name: 'Basse', value: priorityCounts['low'] || 0, color: '#10B981' },
    { name: 'Moyenne', value: priorityCounts['medium'] || 0, color: '#F59E0B' },
    { name: 'Haute', value: priorityCounts['high'] || 0, color: '#EF4444' }
  ]

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Priorités</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
