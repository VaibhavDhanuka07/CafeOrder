'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OrderCard from '../../../components/OrderCard'
import { getAllOrders, updateOrderStatus, getCurrentUser, signOut, subscribeToOrders } from '../../../lib/supabase'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    checkAuth()
    loadOrders()
    
    // Subscribe to real-time updates
    const subscription = subscribeToOrders(() => {
      loadOrders()
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push('/admin/login')
      return
    }
    
    // Check if user is admin
    if (currentUser.user_metadata?.role !== 'admin') {
      router.push('/')
      return
    }
    
    setUser(currentUser)
  }
  
  const loadOrders = async () => {
    try {
      const data = await getAllOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      loadOrders()
    } catch (error) {
      alert('Failed to update order status')
    }
  }
  
  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)
  
  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-gray-600">Madhav Bakers</p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-outline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      
      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-100 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-yellow-800">{statusCounts.pending}</p>
            <p className="text-sm text-yellow-600 font-semibold">Pending</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-blue-800">{statusCounts.preparing}</p>
            <p className="text-sm text-blue-600 font-semibold">Preparing</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-800">{statusCounts.ready}</p>
            <p className="text-sm text-green-600 font-semibold">Ready</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{statusCounts.completed}</p>
            <p className="text-sm text-gray-600 font-semibold">Completed</p>
          </div>
        </div>
        
        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {['ALL', 'pending', 'preparing', 'ready', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'ALL' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Orders will appear here when customers place them</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
