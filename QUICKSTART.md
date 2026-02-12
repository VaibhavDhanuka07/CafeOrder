# 🚀 QUICK START GUIDE - Madhav Bakers

## ⚡ 3-Minute Setup

### Step 1: Get Your Supabase API Key (2 minutes)

1. Go to your Supabase Dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API**
4. Scroll down to find **"Project API keys"**
5. **COPY** the **anon public** key (long string starting with `eyJhbG...`)

### Step 2: Add API Key to Project (1 minute)

1. Open the `madhav-bakers` folder
2. Find the file `.env.local.example`
3. **Copy it** and rename to `.env.local`
4. Open `.env.local` in any text editor
5. Replace `your_anon_key_here` with your actual key:

```
NEXT_PUBLIC_SUPABASE_URL=https://xrkfnieuprqlmgnyxoyc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  ← Your key here
```

6. **Save** the file

### Step 3: Install & Run (1 minute)

Open terminal in the `madhav-bakers` folder and run:

```bash
npm install
npm run dev
```

**That's it!** 🎉

Visit: `http://localhost:3000`

---

## 📱 Testing the App

### Test as Customer:
1. Go to `http://localhost:3000`
2. Click table number **5** (or any number)
3. Browse menu and add items to cart
4. Click the cart icon (bottom right)
5. Click "Proceed to Checkout"
6. Place order

### Test as Admin:
1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Email: `vaibhavanildhanuka@gmail.com`
   - Password: Your Supabase password
3. You'll see the order you just placed!
4. Change order status: Pending → Preparing → Ready → Completed

---

## 🎨 Adding Product Images (Optional)

### Quick Method - Use Placeholder Images:
The app works perfectly without images! Products will show with text only.

### Better Method - Add 3D Images:
1. Open `AI-IMAGE-PROMPTS.md` file
2. Copy the prompts for your 5 featured products
3. Use ChatGPT, DALL-E, or Midjourney to generate images
4. Save images in `public/images/` folder with exact names:
   - `blueberry-cheesecake.jpg`
   - `nutella-cheesecake.jpg`
   - `classic-tiramisu.jpg`
   - `energy-bars.jpg`
   - `millet-almond-cookies.jpg`

---

## ✅ Checklist

- [ ] Supabase database is set up (tables, products, orders)
- [ ] Admin user has `role: admin` in user_metadata
- [ ] Row Level Security (RLS) is enabled
- [ ] API key added to `.env.local`
- [ ] App running on `http://localhost:3000`
- [ ] Can browse menu as customer
- [ ] Can place test order
- [ ] Can login as admin
- [ ] Can see order in admin dashboard
- [ ] Can update order status

---

## 🆘 Common Issues

**Problem:** "Invalid API key" error
- **Solution:** Make sure you copied the **anon public** key, NOT the service_role key

**Problem:** Can't see products in menu
- **Solution:** Check that you ran the SQL to insert sample products in Supabase

**Problem:** Can't login as admin
- **Solution:** Verify your user has `{"role": "admin"}` in user_metadata

**Problem:** Changes not showing
- **Solution:** Stop the dev server (Ctrl+C) and run `npm run dev` again

---

## 🌐 Going Live

### Deploy to Vercel (Free):

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Connect your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your app will be live in ~2 minutes!

### Generate QR Codes:

1. Go to [qr-code-generator.com](https://www.qr-code-generator.com)
2. Enter URL: `your-app.vercel.app/menu?table=1`
3. Download QR code
4. Print and place on Table 1
5. Repeat for all tables (change `?table=` number)

---

## 📞 Need Help?

Check:
1. `README.md` - Full documentation
2. `AI-IMAGE-PROMPTS.md` - Image generation guide
3. Browser console (F12) - For error messages
4. Supabase logs - For database issues

---

**You're ready to serve customers! 🎉**
