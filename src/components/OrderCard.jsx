'use client'

export default function OrderCard({ order, onUpdateStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending'
      case 'preparing': return 'badge-preparing'
      case 'ready': return 'badge-ready'
      case 'completed': return 'badge-completed'
      case 'cancelled': return 'badge-cancelled'
      default: return 'badge-pending'
    }
  }
  
  const statusOptions = ['pending', 'preparing', 'ready', 'completed', 'cancelled']
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return (
    <div className="card">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Table #{order.table_number}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
          {order.customer_name && (
            <p className="text-sm text-gray-600 mt-1">
              Customer: <span className="font-semibold">{order.customer_name}</span>
            </p>
          )}
        </div>
        <span className={`badge ${getStatusColor(order.status)} text-xs uppercase`}>
          {order.status}
        </span>
      </div>
      
      {/* Order Items */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.displayText}</p>
              </div>
              <p className="font-bold text-primary">₹{item.price.toFixed(0)}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Special Instructions */}
      {order.special_instructions && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm font-semibold text-yellow-800 mb-1">Special Instructions:</p>
          <p className="text-sm text-yellow-700">{order.special_instructions}</p>
        </div>
      )}
      
      {/* Total */}
      <div className="flex justify-between items-center py-3 px-4 bg-amber-50 rounded-lg mb-4">
        <span className="font-semibold text-gray-700">Total:</span>
        <span className="text-2xl font-bold text-primary">₹{order.total_amount.toFixed(0)}</span>
      </div>
      
      {/* Status Update */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Update Status:
        </label>
        <select
          value={order.status}
          onChange={(e) => onUpdateStatus(order.id, e.target.value)}
          className="input"
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
