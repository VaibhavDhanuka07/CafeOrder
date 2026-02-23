'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OrderCard from '../../../components/OrderCard'
import {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getCurrentUser,
  signOut,
  subscribeToOrders,
} from '../../../lib/supabase'

function createEmptyManualItem() {
  return {
    name: '',
    quantity: 1,
    unitPrice: '',
  }
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isManualOrderOpen, setIsManualOrderOpen] = useState(false)
  const [manualTableNumber, setManualTableNumber] = useState('')
  const [manualCustomerName, setManualCustomerName] = useState('')
  const [manualSpecialInstructions, setManualSpecialInstructions] = useState('')
  const [manualItems, setManualItems] = useState([createEmptyManualItem()])
  const [isSavingManualOrder, setIsSavingManualOrder] = useState(false)

  useEffect(() => {
    checkAuth()
    loadOrders()

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

    if (currentUser.user_metadata?.role !== 'admin') {
      router.push('/')
      return
    }
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

  const addManualItem = () => {
    setManualItems([...manualItems, createEmptyManualItem()])
  }

  const removeManualItem = (index) => {
    setManualItems(manualItems.filter((_, i) => i !== index))
  }

  const updateManualItem = (index, field, value) => {
    setManualItems(
      manualItems.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    )
  }

  const getManualTotal = () => {
    return manualItems.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0
      const unitPrice = Number(item.unitPrice) || 0
      return sum + quantity * unitPrice
    }, 0)
  }

  const resetManualOrderForm = () => {
    setManualTableNumber('')
    setManualCustomerName('')
    setManualSpecialInstructions('')
    setManualItems([createEmptyManualItem()])
  }

  const handleCreateManualOrder = async () => {
    const table = Number(manualTableNumber)
    if (!table || table < 1) {
      alert('Please enter a valid table number')
      return
    }

    const normalizedItems = manualItems
      .map((item, index) => {
        const name = item.name.trim()
        const quantity = Number(item.quantity)
        const unitPrice = Number(item.unitPrice)

        if (!name || !quantity || quantity < 1 || !unitPrice || unitPrice <= 0) {
          return null
        }

        const lineTotal = quantity * unitPrice

        return {
          id: `manual-${Date.now()}-${index}`,
          name,
          quantity,
          unit: 'pcs',
          displayText: `${quantity} x Rs. ${unitPrice.toFixed(0)}`,
          price: lineTotal,
          category: 'Manual',
        }
      })
      .filter(Boolean)

    if (normalizedItems.length === 0) {
      alert('Please add at least one valid item')
      return
    }

    const total = normalizedItems.reduce((sum, item) => sum + item.price, 0)

    try {
      setIsSavingManualOrder(true)

      await createOrder(
        table,
        normalizedItems,
        total,
        manualCustomerName.trim() || null,
        manualSpecialInstructions.trim() || null
      )

      setIsManualOrderOpen(false)
      resetManualOrderForm()
      loadOrders()
    } catch (error) {
      alert('Failed to create manual order')
      console.error(error)
    } finally {
      setIsSavingManualOrder(false)
    }
  }

  const handleGenerateBill = (order) => {
    const billWindow = window.open('', '_blank', 'width=800,height=900')
    if (!billWindow) {
      alert('Popup blocked. Please allow popups to generate bill.')
      return
    }

    const dateText = new Date(order.created_at).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const itemsHtml = (order.items || [])
      .map((item, index) => {
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${item.name || '-'}${item.displayText ? `<br/><span style="color:#666;">${item.displayText}</span>` : ''}</td>
            <td style="text-align:right;">Rs. ${Number(item.price || 0).toFixed(0)}</td>
          </tr>
        `
      })
      .join('')

    const subTotal = Number(order.total_amount || 0)
    const sgst = subTotal * 0.025
    const cgst = subTotal * 0.025
    const grandTotal = subTotal + sgst + cgst

    billWindow.document.write(`
      <html>
        <head>
          <title>Bill - Order #${order.id}</title>
          <style>
            @page { size: 2in auto; margin: 0.08in; }
            body {
              font-family: Arial, sans-serif;
              width: 2in;
              margin: 0;
              padding: 0;
              color: #222;
              font-size: 10px;
              line-height: 1.25;
            }
            .receipt { width: 100%; }
            .title { font-size: 12px; font-weight: bold; text-align: center; margin-bottom: 2px; }
            .sub { color: #555; text-align: center; margin-bottom: 6px; font-size: 9px; }
            .meta { margin-bottom: 6px; }
            .meta p { margin: 2px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 4px; table-layout: fixed; }
            th, td { border: 1px solid #ddd; padding: 3px 2px; font-size: 8px; word-wrap: break-word; }
            th { background: #f5f5f5; text-align: left; }
            .summary { margin-top: 6px; width: 100%; }
            .summary-row { display: flex; justify-content: space-between; padding: 2px 0; font-size: 9px; border-bottom: 1px dashed #ddd; }
            .summary-total { display: flex; justify-content: space-between; padding-top: 4px; font-size: 11px; font-weight: bold; }
            .notes { margin-top: 6px; padding: 4px; background: #fff9e8; border: 1px solid #f4e1aa; font-size: 8px; }
            .footer { margin-top: 8px; text-align: center; font-size: 8px; color: #666; }
          </style>
        </head>
        <body>
          <div class="receipt">
          <div class="title">Madhav Bakers</div>
          <div class="sub">Customer Bill</div>
          <div class="meta">
            <p><strong>Order:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${dateText}</p>
            <p><strong>Table:</strong> #${order.table_number}</p>
            <p><strong>Name:</strong> ${order.customer_name || 'Walk-in'}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th style="text-align:right;">Amt</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="summary">
            <div class="summary-row">
              <span>Sub Total</span>
              <span>Rs. ${subTotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>SGST (2.5%)</span>
              <span>Rs. ${sgst.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>CGST (2.5%)</span>
              <span>Rs. ${cgst.toFixed(2)}</span>
            </div>
            <div class="summary-total">
              <span>Grand Total</span>
              <span>Rs. ${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          ${
            order.special_instructions
              ? `<div class="notes"><strong>Special Instructions:</strong> ${order.special_instructions}</div>`
              : ''
          }
          <div class="footer">Thank you for your order</div>
          </div>
        </body>
      </html>
    `)
    billWindow.document.close()
    billWindow.focus()
    billWindow.print()
  }

  const filteredOrders = filterStatus === 'ALL' ? orders : orders.filter((order) => order.status === filterStatus)

  const statusCounts = {
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-30 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-3">
            <div>
              <h1 className="text-3xl font-extrabold text-primary tracking-tight">Admin Dashboard</h1>
              <p className="text-amber-800/80">Madhav Bakers</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsManualOrderOpen(true)} className="btn-primary py-2 px-4">
                + Manual Order
              </button>
              <button onClick={handleSignOut} className="btn-outline py-2">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl p-4 text-center bg-yellow-50 border border-yellow-200">
            <p className="text-3xl font-bold text-yellow-800">{statusCounts.pending}</p>
            <p className="text-sm text-yellow-700 font-semibold">Pending</p>
          </div>
          <div className="rounded-2xl p-4 text-center bg-blue-50 border border-blue-200">
            <p className="text-3xl font-bold text-blue-800">{statusCounts.preparing}</p>
            <p className="text-sm text-blue-700 font-semibold">Preparing</p>
          </div>
          <div className="rounded-2xl p-4 text-center bg-green-50 border border-green-200">
            <p className="text-3xl font-bold text-green-800">{statusCounts.ready}</p>
            <p className="text-sm text-green-700 font-semibold">Ready</p>
          </div>
          <div className="rounded-2xl p-4 text-center bg-gray-50 border border-gray-200">
            <p className="text-3xl font-bold text-gray-800">{statusCounts.completed}</p>
            <p className="text-sm text-gray-700 font-semibold">Completed</p>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {['ALL', 'pending', 'preparing', 'ready', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all border ${
                  filterStatus === status
                    ? 'bg-primary text-white border-primary'
                    : 'bg-amber-50 text-gray-700 border-amber-100 hover:bg-amber-100'
                }`}
              >
                {status === 'ALL' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 card">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Orders will appear here when customers place them</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onGenerateBill={handleGenerateBill}
              />
            ))}
          </div>
        )}
      </div>

      {isManualOrderOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-amber-100 animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-extrabold text-gray-800">Create Manual Order</h2>
              <button onClick={() => setIsManualOrderOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="number"
                min="1"
                placeholder="Table Number"
                value={manualTableNumber}
                onChange={(e) => setManualTableNumber(e.target.value)}
                className="input"
              />
              <input
                type="text"
                placeholder="Customer Name (Optional)"
                value={manualCustomerName}
                onChange={(e) => setManualCustomerName(e.target.value)}
                className="input"
              />
            </div>

            <textarea
              placeholder="Special Instructions (Optional)"
              value={manualSpecialInstructions}
              onChange={(e) => setManualSpecialInstructions(e.target.value)}
              className="input min-h-24 mb-4"
            />

            <div className="mb-3 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Items</h3>
              <button onClick={addManualItem} className="btn-outline px-4 py-2">
                + Add Item
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {manualItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) => updateManualItem(index, 'name', e.target.value)}
                    className="input md:col-span-5"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateManualItem(index, 'quantity', e.target.value)}
                    className="input md:col-span-2"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) => updateManualItem(index, 'unitPrice', e.target.value)}
                    className="input md:col-span-3"
                  />
                  <div className="md:col-span-2 flex md:justify-end">
                    <button
                      onClick={() => removeManualItem(index)}
                      disabled={manualItems.length === 1}
                      className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-5 p-3 rounded-xl bg-amber-50 border border-amber-100">
              <span className="font-semibold text-gray-700">Order Total</span>
              <span className="text-2xl font-extrabold text-primary">Rs. {getManualTotal().toFixed(0)}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsManualOrderOpen(false)
                  resetManualOrderForm()
                }}
                className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateManualOrder}
                disabled={isSavingManualOrder}
                className="w-1/2 btn-primary py-3 disabled:opacity-50"
              >
                {isSavingManualOrder ? 'Saving...' : 'Create Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
