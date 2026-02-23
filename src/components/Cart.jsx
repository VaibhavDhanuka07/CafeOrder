'use client'

import { useState } from 'react'

export default function Cart({ cart, onRemoveItem, onUpdateQuantity, onCheckout }) {
  const [isOpen, setIsOpen] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const itemCount = cart.length

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-2xl w-16 h-16 flex items-center justify-center shadow-2xl hover:brightness-105 transition-all z-50 border border-amber-200"
      >
        <div className="relative">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 px-1 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/45 z-40" />

          <div className="fixed right-0 top-0 h-full w-full md:w-[26rem] bg-white shadow-2xl z-50 flex flex-col animate-fadeIn border-l border-amber-100">
            <div className="bg-primary text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-extrabold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-white/90 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some delicious items!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="bg-amber-50 rounded-xl p-4 relative border border-amber-100">
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <h3 className="font-semibold text-gray-800 pr-8">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.displayText}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-lg font-bold text-primary mt-2">Rs. {item.price.toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-amber-100 p-6 bg-white">
                <div className="flex justify-between items-center mb-4 rounded-xl bg-amber-50 border border-amber-100 p-3">
                  <span className="text-base font-semibold text-gray-700">Total:</span>
                  <span className="text-2xl font-extrabold text-primary">Rs. {total.toFixed(0)}</span>
                </div>
                <button onClick={onCheckout} className="btn-primary w-full text-lg py-4">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
