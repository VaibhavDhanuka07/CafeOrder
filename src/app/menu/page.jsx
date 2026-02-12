'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import MenuItem from '../../components/MenuItem'
import Cart from '../../components/Cart'
import { menuCategories, getFeaturedProducts } from '../../lib/menuData'
import { createOrder } from '../../lib/supabase'

function MenuContent() {
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
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Madhav Bakers</h1>
            <p className="text-gray-600">Fresh Baked Delights</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Table Number</p>
            <p className="text-2xl font-bold text-primary">#{tableNumber}</p>
          </div>
        </div>
      </header>

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

      <Cart
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  )
}
