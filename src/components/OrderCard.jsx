'use client'

export default function OrderCard({ order, onUpdateStatus, onGenerateBill }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-pending'
      case 'preparing':
        return 'badge-preparing'
      case 'ready':
        return 'badge-ready'
      case 'completed':
        return 'badge-completed'
      case 'cancelled':
        return 'badge-cancelled'
      default:
        return 'badge-pending'
    }
  }

  const statusOptions = ['pending', 'preparing', 'ready', 'completed', 'cancelled']

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4 gap-2">
        <div>
          <h3 className="text-xl font-extrabold text-gray-800">Table #{order.table_number}</h3>
          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
          {order.customer_name && (
            <p className="text-sm text-gray-600 mt-1">
              Customer: <span className="font-semibold">{order.customer_name}</span>
            </p>
          )}
        </div>
        <span className={`badge ${getStatusColor(order.status)} uppercase`}>{order.status}</span>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
        <div className="space-y-2">
          {(order.items || []).map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-100 gap-2">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.displayText}</p>
              </div>
              <p className="font-bold text-primary whitespace-nowrap">Rs. {Number(item.price || 0).toFixed(0)}</p>
            </div>
          ))}
        </div>
      </div>

      {order.special_instructions && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm font-semibold text-yellow-800 mb-1">Special Instructions:</p>
          <p className="text-sm text-yellow-700">{order.special_instructions}</p>
        </div>
      )}

      <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl mb-4 border border-amber-100">
        <span className="font-semibold text-gray-700">Total:</span>
        <span className="text-2xl font-extrabold text-primary">Rs. {Number(order.total_amount || 0).toFixed(0)}</span>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Update Status:</label>
        <select value={order.status} onChange={(e) => onUpdateStatus(order.id, e.target.value)} className="input mb-3">
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={() => onGenerateBill(order)} className="btn-outline w-full py-2">
          Generate Bill
        </button>
      </div>
    </div>
  )
}
