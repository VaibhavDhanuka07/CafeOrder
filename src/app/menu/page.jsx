'use client'
export const dynamic = "force-dynamic"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MenuItem from '../../components/MenuItem'
import Cart from '../../components/Cart'
import { menuCategories, getFeaturedProducts } from '../../lib/menuData'
import { createOrder } from '../../lib/supabase'


export default function MenuPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  
  useEffect(() => {
    const table = searchParams.get('table')
    if (table) {
      setTableNumber(parseInt(table))
    } else {
      // Redirect to home if no table number
      router.push('/')
    }
  }, [searchParams, router])
  
  const handleAddToCart = (item) => {
    setCart([...cart, item])
  }
  
  const handleRemoveItem = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }
  
  const handleCheckout = () => {
    setIsCheckingOut(true)
  }
  
  const handlePlaceOrder = async () => {
    if (!tableNumber) {
      alert('Table number not found!')
      return
    }
    
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    
    try {
      const total = cart.reduce((sum, item) => sum + item.price, 0)
      
      await createOrder(
        tableNumber,
        cart,
        total,
        customerName || null,
        specialInstructions || null
      )
      
      setOrderSuccess(true)
      setCart([])
      setCustomerName('')
      setSpecialInstructions('')
      
      setTimeout(() => {
        setIsCheckingOut(false)
        setOrderSuccess(false)
      }, 3000)
      
    } catch (error) {
      alert('Failed to place order. Please try again.')
      console.error(error)
    }
  }
  
  const categories = Object.keys(menuCategories)
  const featuredProducts = getFeaturedProducts()
  
  if (!tableNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
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
              <h1 className="text-3xl font-bold text-primary">Madhav Bakers</h1>
              <p className="text-gray-600">Fresh Baked Delights</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Table Number</p>
              <p className="text-2xl font-bold text-primary">#{tableNumber}</p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Featured Products */}
      {selectedCategory === 'ALL' && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⭐ Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => {
              const category = menuCategories[product.categoryKey]
              return (
                <MenuItem
                  key={product.id}
                  item={product}
                  category={category}
                  onAddToCart={handleAddToCart}
                />
              )
            })}
          </div>
        </section>
      )}
      
      {/* Category Filter */}
      <div className="bg-white shadow-md sticky top-[88px] z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {menuCategories[cat].name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        {categories.map(categoryKey => {
          const category = menuCategories[categoryKey]
          
          if (selectedCategory !== 'ALL' && selectedCategory !== categoryKey) {
            return null
          }
          
          return (
            <section key={categoryKey} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map(item => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    category={category}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </main>
      
      {/* Cart */}
      <Cart
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-fadeIn">
            {orderSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
                <p className="text-gray-600">Your order has been received and will be prepared shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="input"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any special requests?"
                    rows={3}
                    className="input"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Table:</span>
                    <span className="font-bold">#{tableNumber}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-bold">{cart.length}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{cart.reduce((sum, item) => sum + item.price, 0).toFixed(0)}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary flex-1"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
