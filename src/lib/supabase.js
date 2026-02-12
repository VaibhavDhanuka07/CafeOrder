'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xrkfnieuprqlmgnyxoyc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations

// Get all available products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('category', { ascending: true })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data
}

// Get products by category
export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('is_available', true)
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  return data
}

// Create a new order
export async function createOrder(tableNumber, items, totalAmount, customerName = null, specialInstructions = null) {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      table_number: tableNumber,
      items: items,
      total_amount: totalAmount,
      customer_name: customerName,
      special_instructions: specialInstructions,
      status: 'pending'
    })
    .select()
  
  if (error) {
    console.error('Error creating order:', error)
    throw error
  }
  
  return data[0]
}

// Get all orders (for admin)
export async function getAllOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }
  
  return data
}

// Update order status
export async function updateOrderStatus(orderId, newStatus) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)
    .select()
  
  if (error) {
    console.error('Error updating order:', error)
    throw error
  }
  
  return data[0]
}

// Admin authentication
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) {
    console.error('Error signing in:', error)
    throw error
  }
  
  // Check if user is admin
  const isAdmin = data?.user?.user_metadata?.role === 'admin'
  
  return { user: data.user, isAdmin }
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Subscribe to order changes (real-time)
export function subscribeToOrders(callback) {
  return supabase
    .channel('orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, callback)
    .subscribe()
}
