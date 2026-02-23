'use client'

import { useState } from 'react'

export default function MenuItem({ item, category, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(category.minQuantity || 1)
  const [customGrams, setCustomGrams] = useState('')

  const calculatePrice = () => {
    if (category.quantityType === 'grams') {
      const grams = customGrams || quantity
      return (grams / 100) * category.pricePerUnit
    } else if (category.quantityType === 'pieces') {
      return quantity * category.pricePerUnit
    } else if (item.sizes) {
      return selectedSize ? item.sizes[selectedSize] : 0
    }
    return 0
  }

  const handleAddToCart = () => {
    let cartItem = {
      id: item.id,
      name: item.name,
      category: category.name,
      price: calculatePrice(),
    }

    if (category.quantityType === 'grams') {
      const grams = customGrams || quantity
      cartItem.quantity = grams
      cartItem.unit = 'g'
      cartItem.displayText = `${grams}g`
    } else if (category.quantityType === 'pieces') {
      cartItem.quantity = quantity
      cartItem.unit = 'pcs'
      cartItem.displayText = `${quantity} piece${quantity > 1 ? 's' : ''}`
    } else if (item.sizes && selectedSize) {
      cartItem.quantity = 1
      cartItem.size = selectedSize
      cartItem.displayText = getSizeLabel(selectedSize)
    } else {
      alert('Please select a size or quantity')
      return
    }

    onAddToCart(cartItem)

    setSelectedSize(null)
    setQuantity(category.minQuantity || 1)
    setCustomGrams('')
  }

  const getSizeLabel = (size) => {
    if (category.sizeType === 'pastry') {
      if (size === 'pastry') return 'Pastry'
      if (size === 'half_kg') return '1/2 Kg'
      if (size === 'full_kg') return '1 Kg'
    } else if (category.sizeType === 'jar') {
      if (size === 'jar') return 'Jar'
      if (size === 'half_kg') return '1/2 Kg'
    } else if (category.sizeType === 'weight') {
      if (size === 'half_kg') return '1/2 Kg'
      if (size === 'full_kg') return '1 Kg'
    }
    return size
  }

  return (
    <div className="card animate-fadeIn group">
      {item.image && (
        <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center border border-amber-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{item.name}</h3>

      {category.quantityType === 'grams' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Weight:</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {[100, 200, 300, 500].map((g) => (
              <button
                key={g}
                onClick={() => {
                  setQuantity(g)
                  setCustomGrams('')
                }}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  quantity === g && !customGrams
                    ? 'bg-primary text-white'
                    : 'bg-amber-50 text-gray-700 border border-amber-100 hover:bg-amber-100'
                }`}
              >
                {g}g
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Custom (grams)"
              value={customGrams}
              onChange={(e) => {
                const value = parseInt(e.target.value) || ''
                if (value === '' || value >= 100) {
                  setCustomGrams(value)
                }
              }}
              min={category.minQuantity}
              step={category.quantityStep}
              className="input flex-1"
            />
            <span className="text-gray-600 font-semibold">grams</span>
          </div>
        </div>
      )}

      {category.quantityType === 'pieces' && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity:</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(category.minQuantity, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 font-bold text-xl"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-800 min-w-[60px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 font-bold text-xl"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Min. {category.minQuantity} pieces</p>
        </div>
      )}

      {item.sizes && (
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Size:</label>
          <div className="space-y-2">
            {Object.keys(item.sizes).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-full px-4 py-3 rounded-xl font-semibold transition-all flex justify-between items-center border ${
                  selectedSize === size
                    ? 'bg-primary text-white border-primary'
                    : 'bg-amber-50 text-gray-700 border-amber-100 hover:bg-amber-100'
                }`}
              >
                <span>{getSizeLabel(size)}</span>
                <span>Rs. {item.sizes[size]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 py-3 px-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">Price:</span>
          <span className="text-2xl font-extrabold text-primary">Rs. {calculatePrice().toFixed(0)}</span>
        </div>
        {category.pricePerUnit && (
          <p className="text-xs text-gray-500 mt-1">@ Rs. {category.pricePerUnit} per {category.unit}</p>
        )}
      </div>

      <button onClick={handleAddToCart} className="btn-primary w-full">
        Add to Cart
      </button>
    </div>
  )
}
