import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import User from './pages/User.jsx'
import ShopLayout from './layout/ShopLayout.jsx'
import ShopHome from './pages/ShopHome.jsx'
import ShopCollections from './pages/ShopCollections.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import "./styles/base.css";
import AuthPage from './pages/AuthPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ReadingPage from './pages/ReadingPage.jsx'
import ReaderSchedulePage from './pages/ReaderSchedulePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="auth" element={<AuthPage />} />
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact  />} />
            <Route path="users/:id" element={<User />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="reading" element={<ReadingPage />} />
            <Route path="reader-schedule" element={<ReaderSchedulePage />} />
          </Route>

            <Route path="/shop" element={<ShopLayout />}>
        <Route index element={<ShopHome />} />
        <Route path="collection/:category" element={<ShopCollections />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

        

          {/* 404 catch-all */}
          <Route path="*" element={<main style={{padding:16}}>Page not found</main>} />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)