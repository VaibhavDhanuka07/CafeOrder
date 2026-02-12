import './globals.css'

export const metadata = {
  title: 'Madhav Bakers - Fresh Baked Delights',
  description: 'Order fresh baked goods from Madhav Bakers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
