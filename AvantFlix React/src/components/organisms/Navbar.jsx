import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar({ cartCount = 0, user = null, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg avantflix-navbar navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          AvantFlix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={'collapse navbar-collapse ' + (isOpen ? 'show' : '')} id="main-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link" onClick={closeMenu}>Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link to="/offers" className="nav-link" onClick={closeMenu}>Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link" onClick={closeMenu}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>Contacto</Link>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center gap-1">
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative me-3" onClick={closeMenu}>
                🛒
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/admin" className="nav-link text-muted" onClick={closeMenu}>
                    Panel Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link text-muted btn btn-link p-0"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-muted" onClick={closeMenu}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-muted" onClick={closeMenu}>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

