import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Parcel } from '../../types'

interface StatusChartProps {
  parcels: Parcel[]
}

export default function StatusChart({ parcels }: StatusChartProps) {
  const statusCounts = parcels.reduce((acc, parcel) => {
    acc[parcel.status] = (acc[parcel.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = [
    { name: 'Créé', value: statusCounts['created'] || 0, color: '#6B7280' },
    { name: 'En Transit', value: statusCounts['in-transit'] || 0, color: '#F59E0B' },
    { name: 'Livré', value: statusCounts['delivered'] || 0, color: '#10B981' }
  ].filter(item => item.value > 0)

  const COLORS = data.map(item => item.color)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Statuts</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
