import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Culture, Art & Heritage of India',
  description: 'Explore the vibrant culture of Indian states.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen px-6 py-8 bg-[var(--background)] text-[var(--foreground)]">
          {children}
        </main>
      </body>
    </html>
  )
}
