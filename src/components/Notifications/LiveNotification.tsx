import { useState, useEffect } from 'react'
import { Bell, CheckCircle, AlertTriangle, Info, X, Zap } from 'lucide-react'

interface Notification {
  id: number
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  timestamp: Date
}

interface LiveNotificationProps {
  notifications: Notification[]
  onDismiss: (id: number) => void
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    case 'info':
      return <Info className="w-5 h-5 text-blue-500" />
    case 'error':
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    default:
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'border-l-green-500 bg-gradient-to-r from-green-50 to-green-100'
    case 'warning':
      return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100'
    case 'info':
      return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100'
    case 'error':
      return 'border-l-red-500 bg-gradient-to-r from-red-50 to-red-100'
    default:
      return 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100'
  }
}

export default function LiveNotification({ notifications, onDismiss }: LiveNotificationProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications[notifications.length - 1]
      setVisibleNotifications(prev => [...prev, newNotification])
      
      // Auto-dismiss après 5 secondes
      setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== newNotification.id))
      }, 5000)
    }
  }, [notifications])

  const handleDismiss = (id: number) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id))
    onDismiss(id)
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`card-speed border-l-4 ${getNotificationColor(notification.type)} transform transition-all duration-500 ease-out ${
            index === 0 ? 'animate-slide-in-right' : 'animate-fade-in-up'
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start space-x-3 p-4">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">
                  {notification.title}
                </h4>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Zap className="w-3 h-3 text-energy-500 animate-pulse-fast" />
                <span className="text-xs text-gray-500">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Barre de progression pour l'auto-dismiss */}
          <div className="h-1 bg-gray-200 rounded-b-xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-energy-500 to-yellow-400 transition-all duration-5000 ease-linear"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
