import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="auth" element={<AuthPage />} />
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact  />} />
            <Route path="users/:id" element={<User />} />
          </Route>

          <Route path="/shop" element={<ShopLayout><ShopHome /></ShopLayout>} />
          <Route path="/shop/:category" element={<ShopLayout><ShopCollections /></ShopLayout>} />
          <Route path="/shop/product/:id" element={<ShopLayout><ProductDetail /></ShopLayout>} />

          {/* 404 catch-all */}
          <Route path="*" element={<main style={{padding:16}}>Page not found</main>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)