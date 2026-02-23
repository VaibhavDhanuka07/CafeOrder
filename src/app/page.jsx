'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState('')

  const handleTableEntry = (e) => {
    e.preventDefault()
    if (tableNumber) {
      router.push(`/menu?table=${tableNumber}`)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-10 md:mb-12 animate-fadeIn">
          <p className="inline-flex items-center rounded-full border border-amber-200 bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-4">
            Artisan Bakery Experience
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-4 tracking-tight">
            Madhav Bakers
          </h1>
          <p className="text-xl md:text-2xl text-amber-900 mb-2">Fresh Baked Delights</p>
          <p className="text-base md:text-lg text-amber-800/80">Crafted with love, served with joy</p>
        </div>

        <div className="card rounded-3xl p-7 md:p-10 max-w-2xl mx-auto animate-scaleIn">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600 leading-relaxed">
              Scan the QR code on your table to view our menu and place your order
            </p>
          </div>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-amber-200"></div>
            <span className="text-gray-500 font-semibold text-sm">OR</span>
            <div className="flex-1 h-px bg-amber-200"></div>
          </div>

          <form onSubmit={handleTableEntry} className="mb-8">
            <label className="block text-center text-gray-700 font-semibold mb-3">
              Enter your table number manually:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Table number (e.g., 5)"
                min="1"
                max="50"
                className="input flex-1 text-center text-lg sm:text-xl"
              />
              <button type="submit" className="btn-primary px-8 sm:px-10">
                Go
              </button>
            </div>
          </form>

          <div className="mb-8">
            <p className="text-center text-sm text-gray-600 mb-3">Quick access:</p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => router.push(`/menu?table=${num}`)}
                  className="bg-amber-50 border border-amber-100 hover:bg-primary hover:text-white text-gray-700 font-bold py-3 rounded-xl transition-all"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-6 border-t border-amber-100">
            <button
              onClick={() => router.push('/admin/login')}
              className="text-primary hover:underline text-sm font-semibold"
            >
              Admin Login -&gt;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Fresh Daily</h3>
            <p className="text-sm text-gray-600">All items baked fresh every day</p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Quick Service</h3>
            <p className="text-sm text-gray-600">Fast preparation and delivery</p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-gray-600">Premium ingredients only</p>
          </div>
        </div>
      </div>
    </div>
  )
}
