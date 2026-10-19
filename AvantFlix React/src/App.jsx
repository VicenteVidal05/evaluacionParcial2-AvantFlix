// Componente App: Raíz de la Aplicación (Estilo estudiante de React)
// Aquí concentramos el estado global de la aplicación (Carrito, Usuario autenticado, Catálogo de Anime y Tienda)
// utilizando únicamente useState básico y pasando los datos y manejadores de eventos (callbacks)
// a través de props tradicionales a cada vista y componente hijo.

import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import initialAnimes from './data/animes'
import initialProducts from './data/products'
import Navbar from './components/organisms/Navbar'
import Footer from './components/organisms/Footer'
import Home from './pages/Home'
import Categories from './pages/Categories'
import AnimeDetail from './pages/AnimeDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentRejected from './pages/PaymentRejected'
import Offers from './pages/Offers'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import AdminAnime from './pages/AdminAnime'
import AdminStore from './pages/AdminStore'
import AdminUsers from './pages/AdminUsers'

function App() {
  // Estado 1: Productos en el carrito de compras
  const [cartItems, setCartItems] = useState([])

  // Estado 2: Usuario que ha iniciado sesión (null si es invitado)
  const [user, setUser] = useState(null)

  // Estado 3: Lista de animes (inicialmente cargada desde el archivo data/animes.js)
  const [animes, setAnimes] = useState(initialAnimes)

  // Estado 4: Lista de productos de merchandising (cargada desde data/products.js)
  const [products, setProducts] = useState(initialProducts)

  const location = useLocation()

  // Renderizado condicional simple para ocultar el footer en las páginas del panel de administración
  const isAdminRoute = location.pathname.startsWith('/admin')

  // --- LÓGICA DEL CARRITO (useState básico) ---

  // Agrega un producto o incrementa su cantidad si ya existe
  function addToCart(product) {
    setCartItems(function (prevItems) {
      const existing = prevItems.find(function (item) {
        return item.id === product.id
      })

      if (existing) {
        return prevItems.map(function (item) {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  // Elimina un producto del carrito por su ID
  function removeFromCart(id) {
    setCartItems(function (prevItems) {
      return prevItems.filter(function (item) {
        return item.id !== id
      })
    })
  }

  // Actualiza manualmente la cantidad de un artículo
  function updateQuantity(id, quantity) {
    setCartItems(function (prevItems) {
      return prevItems.map(function (item) {
        if (item.id === id) {
          return { ...item, quantity: quantity }
        }
        return item
      })
    })
  }

  // Vacía todos los artículos del carrito
  function clearCart() {
    setCartItems([])
  }

  // --- LÓGICA DE USUARIOS ---

  function handleLogin(userData) {
    setUser(userData)
  }

  function handleLogout() {
    setUser(null)
  }

  // --- LÓGICA CRUD DE ANIME (Panel de administración) ---

  function handleAddAnime(data) {
    const newAnime = {
      id: Date.now(),
      title: data.title,
      season: data.season,
      synopsis: data.synopsis,
      episodes: Number(data.episodes) || 0,
      rating: Number(data.rating) || 0,
      cover: data.cover || 'https://placehold.co/400x560/1a1a1a/ffffff?text=Nuevo+Anime',
      genre: [],
      relatedProducts: []
    }
    setAnimes(function (prev) {
      return [...prev, newAnime]
    })
  }

  function handleEditAnime(updatedAnime) {
    setAnimes(function (prev) {
      return prev.map(function (a) {
        if (a.id === updatedAnime.id) return updatedAnime
        return a
      })
    })
  }

  function handleDeleteAnime(id) {
    setAnimes(function (prev) {
      return prev.filter(function (a) {
        return a.id !== id
      })
    })
  }

  // --- LÓGICA CRUD DE PRODUCTOS (Panel de administración) ---

  function handleAddProduct(data) {
    const newProduct = {
      id: Date.now(),
      name: data.name,
      price: Number(data.price) || 0,
      stock: Number(data.stock) || 0,
      category: data.category,
      image: data.image || 'https://placehold.co/300x300/1a1a1a/ffffff?text=Producto',
      discount: data.discount ? Number(data.discount) : null,
      animeId: null
    }
    setProducts(function (prev) {
      return [...prev, newProduct]
    })
  }

  function handleEditProduct(updatedProduct) {
    setProducts(function (prev) {
      return prev.map(function (p) {
        if (p.id === updatedProduct.id) return updatedProduct
        return p
      })
    })
  }

  function handleDeleteProduct(id) {
    setProducts(function (prev) {
      return prev.filter(function (p) {
        return p.id !== id
      })
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cartCount={cartItems.length} user={user} onLogout={handleLogout} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home animes={animes} products={products} onAddToCart={addToCart} />} />
          <Route path="/categories" element={<Categories animes={animes} />} />
          <Route path="/anime/:id" element={<AnimeDetail animes={animes} products={products} onAddToCart={addToCart} />} />
          <Route path="/offers" element={<Offers products={products} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemove={removeFromCart} onQuantityChange={updateQuantity} onClearCart={clearCart} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} user={user} onClearCart={clearCart} />} />
          <Route path="/checkout/success" element={<PaymentSuccess />} />
          <Route path="/checkout/rejected" element={<PaymentRejected />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard animes={animes} products={products} />} />
          <Route path="/admin/anime" element={<AdminAnime animes={animes} onAdd={handleAddAnime} onEdit={handleEditAnime} onDelete={handleDeleteAnime} />} />
          <Route path="/admin/store" element={<AdminStore products={products} onAdd={handleAddProduct} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App

