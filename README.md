# Madhav Bakers - QR-Based Ordering System

A complete Next.js web application for in-store bakery ordering with QR code table detection and admin dashboard.

## 🎯 Features

### Customer Features
- ✅ QR code-based table detection
- ✅ Browse complete menu with categories
- ✅ Featured products showcase
- ✅ Smart quantity selectors (grams/pieces/sizes)
- ✅ Shopping cart with real-time total
- ✅ Easy checkout process
- ✅ No login required for customers

### Admin Features
- ✅ Secure admin login
- ✅ Real-time order dashboard
- ✅ Order status management
- ✅ Filter orders by status
- ✅ Live order statistics
- ✅ Auto-refresh on new orders

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Your Supabase credentials ready

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
cd madhav-bakers
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://xrkfnieuprqlmgnyxoyc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**To get your anon key:**
- Go to Supabase Dashboard → Settings → API
- Copy the "anon public" key
- Paste it in `.env.local`

### Step 3: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 🎨 Adding Product Images

The app is configured for 5 featured products with 3D realistic images:

1. **Blueberry Cheesecake** → `/public/images/blueberry-cheesecake.jpg`
2. **Nutella Cheesecake** → `/public/images/nutella-cheesecake.jpg`
3. **Classic Tiramisu** → `/public/images/classic-tiramisu.jpg`
4. **Energy Bars** → `/public/images/energy-bars.jpg`
5. **Millet Almond Cookies** → `/public/images/millet-almond-cookies.jpg`

### Option A: Generate AI Images

Use these prompts with AI image generators (DALL-E, Midjourney, Stable Diffusion):

**1. Blueberry Cheesecake:**
```
Professional food photography of a slice of blueberry cheesecake on a white plate, 
creamy white cheese layer topped with fresh blueberries and blueberry sauce, 
graham cracker crust, soft natural lighting, shallow depth of field, 
appetizing presentation, bakery quality, 4K resolution
```

**2. Nutella Cheesecake:**
```
Professional food photography of a rich Nutella cheesecake slice, 
chocolate swirled cream cheese filling, Oreo cookie crust, 
topped with chocolate ganache and hazelnuts, elegant plating, 
studio lighting, premium bakery style, ultra realistic, 4K
```

**3. Classic Tiramisu:**
```
Professional food photography of classic tiramisu in a glass jar, 
layers of coffee-soaked ladyfingers and mascarpone cream visible, 
dusted with cocoa powder on top, rustic wooden table background, 
soft natural light, Italian dessert, bakery quality, 4K resolution
```

**4. Energy Bars:**
```
Professional food photography of healthy energy bars, 
stacked artfully showing nuts, seeds, dried fruits, and oats, 
golden brown color, texture visible, clean white background, 
bright natural lighting, nutritious snack, bakery fresh, 4K
```

**5. Millet Almond Cookies:**
```
Professional food photography of golden brown millet almond cookies, 
rustic texture with visible almonds and millet grains, 
stacked on parchment paper, soft natural lighting, 
wholesome healthy baking, artisan bakery style, 4K resolution
```

### Option B: Use Your Own Photos

Simply take photos of your actual products and save them with the correct filenames in `/public/images/`.

## 📱 How Customers Use the App

1. Customer scans QR code at table (e.g., `yourdomain.com/menu?table=5`)
2. Browses menu and adds items to cart
3. Reviews order and clicks "Checkout"
4. (Optional) Enters name and special instructions
5. Places order
6. Order appears instantly on admin dashboard

## 👨‍💼 How Admins Use the App

1. Go to `/admin/login`
2. Sign in with admin credentials:
   - Email: `vaibhavanildhanuka@gmail.com`
   - Password: Your Supabase password
3. View all orders in real-time
4. Update order status:
   - Pending → Preparing → Ready → Completed

## 🔐 Admin Setup

Your admin user is already configured in Supabase:
- Email: `vaibhavanildhanuka@gmail.com`
- Role: admin (set in user_metadata)

## 📊 Database Structure

### Tables Created:
1. **tables** - Physical table numbers (1-10)
2. **products** - Menu items (5 sample items)
3. **orders** - Customer orders with status tracking

### Order Statuses:
- `pending` - Just placed
- `preparing` - Being made
- `ready` - Ready for pickup
- `completed` - Delivered to customer
- `cancelled` - Cancelled order

## 🎯 Menu Categories

Your complete menu includes:

1. **🍪 Cookies** (₹70/100g)
   - 7 flavors with gram-based pricing

2. **🌾 Millet Cookies** (₹120/100g)
   - 9 healthy flavors with gram-based pricing

3. **🍫 Brownies** (₹90/piece)
   - Choco Chip & Walnut (min. 2 pieces)

4. **🌋 Choco Lava Cake** (₹100/piece)
   - Min. 2 pieces

5. **🍰 Baked Cheesecake** (Pastry/½Kg/1Kg)
   - 8 flavors with 3 size options

6. **🥛 No-Bake Cheesecake** (Jar/½Kg)
   - 8 flavors in jar or ½ kg

7. **🍮 Tiramisu** (Jar/½Kg)
   - 6 unique flavors

8. **⚡ Energy Bars** (₹120/100g)
   - Gram-based pricing

9. **🍞 Tea Cakes** (½Kg/1Kg)
   - 9 flavors including special Plum Cake

## 🌐 Deployment

### Deploy to Vercel (Recommended):

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Your app will be live at `your-app.vercel.app`

### Generate QR Codes:

Use any QR code generator with these URLs:
- Table 1: `your-domain.com/menu?table=1`
- Table 2: `your-domain.com/menu?table=2`
- etc.

Print and place QR codes on each table!

## 🔧 Customization

### Change Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#8B4513',    // Main brown
  secondary: '#D2691E',  // Lighter brown
  accent: '#FFD700',     // Gold
}
```

### Add More Products:
Edit `src/lib/menuData.js` and add your items to the appropriate category.

### Modify Layout:
All components are in `src/components/` and can be easily customized.

## 📞 Support

For any issues:
1. Check Supabase connection (API keys correct?)
2. Verify admin user has `role: "admin"` in user_metadata
3. Check browser console for errors
4. Ensure database tables and RLS policies are set up

## 🎉 You're All Set!

Your Madhav Bakers ordering system is ready to use. Enjoy serving your customers with this modern, efficient ordering solution!

---

**Built with ❤️ using Next.js 14, Supabase, and Tailwind CSS**
