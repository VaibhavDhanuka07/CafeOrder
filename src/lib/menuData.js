// Complete menu data for Madhav Bakers

export const menuCategories = {
  COOKIES: {
    name: '🍪 COOKIES',
    pricePerUnit: 70,
    unit: '100g',
    minQuantity: 100,
    quantityStep: 100,
    quantityType: 'grams',
    items: [
      { id: 'cookie-1', name: 'Choco Chip Cookies', featured: false },
      { id: 'cookie-2', name: 'Oatmeal Raisins Cookies', featured: false },
      { id: 'cookie-3', name: 'Choco Chip Walnut Cookies', featured: false },
      { id: 'cookie-4', name: 'Milk Chocolate Cookies', featured: false },
      { id: 'cookie-5', name: 'Coconut Macaroon Cookies', featured: false },
      { id: 'cookie-6', name: 'Almond Crunch Cookies', featured: false },
      { id: 'cookie-7', name: 'Chocolate Chunk Cookies', featured: false },
    ]
  },
  
  MILLET_COOKIES: {
    name: '🌾 MILLET COOKIES',
    pricePerUnit: 120,
    unit: '100g',
    minQuantity: 100,
    quantityStep: 100,
    quantityType: 'grams',
    items: [
      { id: 'millet-1', name: 'Millet Coconut Cookies', featured: false },
      { id: 'millet-2', name: 'Millet Orange Zest Cookies', featured: false },
      { id: 'millet-3', name: 'Millet Almond Cookies', featured: true, image: '/images/millet-almond-cookies.jpg' },
      { id: 'millet-4', name: 'Millet Choco Chip Cookies', featured: false },
      { id: 'millet-5', name: 'Millet Oats & Banana Cookies', featured: false },
      { id: 'millet-6', name: 'Millet Cranberry & Pistachio Cookies', featured: false },
      { id: 'millet-7', name: 'Multi Millet Seed Cookies', featured: false },
      { id: 'millet-8', name: 'Millet Nan Khatai', featured: false },
      { id: 'millet-9', name: 'Millet Brookies', featured: false },
    ]
  },
  
  BROWNIES: {
    name: '🍫 BROWNIES',
    pricePerUnit: 90,
    unit: 'piece',
    minQuantity: 2,
    quantityStep: 1,
    quantityType: 'pieces',
    items: [
      { id: 'brownie-1', name: 'Choco Chip Brownie', featured: false },
      { id: 'brownie-2', name: 'Walnut Brownie', featured: false },
    ]
  },
  
  CHOCO_LAVA: {
    name: '🌋 CHOCO LAVA CAKE',
    pricePerUnit: 100,
    unit: 'piece',
    minQuantity: 2,
    quantityStep: 1,
    quantityType: 'pieces',
    items: [
      { id: 'lava-1', name: 'Choco Lava Cake', featured: false },
    ]
  },
  
  BAKED_CHEESECAKE: {
    name: '🍰 BAKED CHEESECAKE',
    sizeType: 'pastry', // pastry, half_kg, full_kg
    items: [
      {
        id: 'baked-cheese-1',
        name: 'Brownie Cheesecake',
        featured: false,
        sizes: {
          pastry: 250,
          half_kg: 700,
          full_kg: 1400
        }
      },
      {
        id: 'baked-cheese-2',
        name: 'Nutella Cheesecake',
        featured: true,
        image: '/images/nutella-cheesecake.jpg',
        sizes: {
          pastry: 300,
          half_kg: 850,
          full_kg: 1700
        }
      },
      {
        id: 'baked-cheese-3',
        name: 'Lotus Biscoff Cheesecake',
        featured: false,
        sizes: {
          pastry: 300,
          half_kg: 850,
          full_kg: 1700
        }
      },
      {
        id: 'baked-cheese-4',
        name: 'Kunafa Cheesecake',
        featured: false,
        sizes: {
          pastry: 380,
          half_kg: 1000,
          full_kg: 2000
        }
      },
      {
        id: 'baked-cheese-5',
        name: 'Blueberry Cheesecake',
        featured: true,
        image: '/images/blueberry-cheesecake.jpg',
        sizes: {
          pastry: 230,
          half_kg: 650,
          full_kg: 1300
        }
      },
      {
        id: 'baked-cheese-6',
        name: 'Strawberry Cheesecake',
        featured: false,
        sizes: {
          pastry: 230,
          half_kg: 650,
          full_kg: 1300
        }
      },
      {
        id: 'baked-cheese-7',
        name: 'Pineapple Cheesecake',
        featured: false,
        sizes: {
          pastry: 230,
          half_kg: 650,
          full_kg: 1300
        }
      },
      {
        id: 'baked-cheese-8',
        name: 'Mango Cheesecake',
        featured: false,
        sizes: {
          pastry: 230,
          half_kg: 650,
          full_kg: 1300
        }
      },
    ]
  },
  
  NOBAKE_CHEESECAKE: {
    name: '🥛 NO-BAKE CHEESECAKE',
    sizeType: 'jar', // jar, half_kg
    items: [
      {
        id: 'nobake-cheese-1',
        name: 'Brownie Cheesecake',
        featured: false,
        sizes: {
          jar: 270,
          half_kg: 700
        }
      },
      {
        id: 'nobake-cheese-2',
        name: 'Nutella Cheesecake',
        featured: false,
        sizes: {
          jar: 320,
          half_kg: 850
        }
      },
      {
        id: 'nobake-cheese-3',
        name: 'Lotus Biscoff Cheesecake',
        featured: false,
        sizes: {
          jar: 320,
          half_kg: 850
        }
      },
      {
        id: 'nobake-cheese-4',
        name: 'Kunafa Cheesecake',
        featured: false,
        sizes: {
          jar: 400,
          half_kg: 1000
        }
      },
      {
        id: 'nobake-cheese-5',
        name: 'Blueberry Cheesecake',
        featured: false,
        sizes: {
          jar: 250,
          half_kg: 650
        }
      },
      {
        id: 'nobake-cheese-6',
        name: 'Strawberry Cheesecake',
        featured: false,
        sizes: {
          jar: 250,
          half_kg: 650
        }
      },
      {
        id: 'nobake-cheese-7',
        name: 'Pineapple Cheesecake',
        featured: false,
        sizes: {
          jar: 250,
          half_kg: 650
        }
      },
      {
        id: 'nobake-cheese-8',
        name: 'Mango Cheesecake',
        featured: false,
        sizes: {
          jar: 250,
          half_kg: 650
        }
      },
    ]
  },
  
  TIRAMISU: {
    name: '🍮 TIRAMISU',
    sizeType: 'jar', // jar, half_kg
    items: [
      {
        id: 'tiramisu-1',
        name: 'Classic Tiramisu',
        featured: true,
        image: '/images/classic-tiramisu.jpg',
        sizes: {
          jar: 300,
          half_kg: 850
        }
      },
      {
        id: 'tiramisu-2',
        name: 'Kunafa Tiramisu',
        featured: false,
        sizes: {
          jar: 400,
          half_kg: 1000
        }
      },
      {
        id: 'tiramisu-3',
        name: 'Matcha Tiramisu',
        featured: false,
        sizes: {
          jar: 350,
          half_kg: 850
        }
      },
      {
        id: 'tiramisu-4',
        name: 'Caramel Tiramisu',
        featured: false,
        sizes: {
          jar: 350,
          half_kg: 850
        }
      },
      {
        id: 'tiramisu-5',
        name: 'Blueberry Lime Tiramisu',
        featured: false,
        sizes: {
          jar: 380,
          half_kg: 900
        }
      },
      {
        id: 'tiramisu-6',
        name: 'Coconut Mango Tiramisu',
        featured: false,
        sizes: {
          jar: 380,
          half_kg: 900
        }
      },
    ]
  },
  
  ENERGY_BARS: {
    name: '⚡ ENERGY BARS',
    pricePerUnit: 120,
    unit: '100g',
    minQuantity: 100,
    quantityStep: 100,
    quantityType: 'grams',
    items: [
      { id: 'energy-1', name: 'Energy Bars', featured: true, image: '/images/energy-bars.jpg' },
    ]
  },
  
  TEA_CAKES: {
    name: '🍞 TEA CAKES',
    sizeType: 'weight', // half_kg, full_kg
    items: [
      {
        id: 'tea-1',
        name: 'Banana Chocolate',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-2',
        name: 'Lemon Drizzle',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-3',
        name: 'Hazelnut Almond',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-4',
        name: 'Almond',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-5',
        name: 'Fruit',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-6',
        name: 'Coffee & Walnut',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-7',
        name: 'Banana',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-8',
        name: 'Carrot',
        featured: false,
        sizes: {
          half_kg: 250,
          full_kg: 500
        }
      },
      {
        id: 'tea-9',
        name: 'Plum Cake',
        featured: false,
        sizes: {
          half_kg: 500,
          full_kg: 1000
        }
      },
    ]
  },
}

// Get all featured products for homepage
export function getFeaturedProducts() {
  const featured = []
  
  Object.keys(menuCategories).forEach(categoryKey => {
    const category = menuCategories[categoryKey]
    category.items.forEach(item => {
      if (item.featured) {
        featured.push({
          ...item,
          category: category.name,
          categoryKey
        })
      }
    })
  })
  
  return featured
}
