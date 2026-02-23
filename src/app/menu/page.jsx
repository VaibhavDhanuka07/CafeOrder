'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MenuItem from '../../components/MenuItem'
import Cart from '../../components/Cart'
import { menuCategories } from '../../lib/menuData'
import { createOrder } from '../../lib/supabase'

function MenuContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [tableNumber, setTableNumber] = useState(null)
  const [cart, setCart] = useState([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categoryKeys = Object.keys(menuCategories)
  const visibleCategoryKeys = selectedCategory === 'ALL' ? categoryKeys : [selectedCategory]

  useEffect(() => {
    const table = searchParams.get('table')
    if (table) {
      setTableNumber(parseInt(table))
    } else {
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

  if (!tableNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-30 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">Madhav Bakers</h1>
            <p className="text-amber-800/80">Fresh Baked Delights</p>
          </div>
          <div className="text-right rounded-xl border border-amber-200 bg-amber-50 px-4 py-2">
            <p className="text-xs uppercase tracking-wider text-amber-700 font-bold">Table Number</p>
            <p className="text-2xl font-extrabold text-primary">#{tableNumber}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <section className="mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-lg font-extrabold text-gray-800">Filter Categories</h2>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{visibleCategoryKeys.length} shown</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap font-semibold border transition-all ${
                  selectedCategory === 'ALL'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-amber-50 text-gray-700 border-amber-100 hover:bg-amber-100'
                }`}
              >
                All
              </button>
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap font-semibold border transition-all ${
                    selectedCategory === key
                      ? 'bg-primary text-white border-primary'
                      : 'bg-amber-50 text-gray-700 border-amber-100 hover:bg-amber-100'
                  }`}
                >
                  {menuCategories[key].name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {visibleCategoryKeys.map((categoryKey) => {
          const category = menuCategories[categoryKey]

          return (
            <section key={categoryKey} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
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

      <Cart cart={cart} onRemoveItem={handleRemoveItem} onCheckout={handleCheckout} />

      {isCheckingOut && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-amber-100 animate-scaleIn">
            {!orderSuccess ? (
              <>
                <h2 className="text-2xl font-bold mb-1 text-gray-800">Checkout</h2>
                <p className="text-sm text-gray-600 mb-4">Confirm order details before placing.</p>

                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="input mb-3"
                />

                <textarea
                  placeholder="Special Instructions (Optional)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="input mb-4 min-h-24"
                />

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>

                  <button onClick={handlePlaceOrder} className="w-1/2 btn-primary py-3">
                    Place Order
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600">Thank you for ordering.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading menu...</p>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  )
}
