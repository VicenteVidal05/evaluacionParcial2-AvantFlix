import { Link } from 'react-router-dom'
import Text from '../atoms/Text'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-secondary)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto'
      }}
      className="py-4 mt-5"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <Text variant="h5" style={{ color: 'var(--color-primary)' }}>AvantFlix</Text>
            <Text variant="p" className="text-muted small mt-2">
              Tu plataforma de streaming y merchandising de anime oficial. Contenido de calidad, entrega garantizada.
            </Text>
          </div>
          <div className="col-md-4 mb-4">
            <Text variant="h6" className="mb-3">Navegación</Text>
            <ul className="list-unstyled d-flex flex-column gap-1">
              <li><Link to="/" className="text-muted small">Inicio</Link></li>
              <li><Link to="/categories" className="text-muted small">Catálogo</Link></li>
              <li><Link to="/offers" className="text-muted small">Ofertas</Link></li>
              <li><Link to="/blog" className="text-muted small">Blog</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <Text variant="h6" className="mb-3">Soporte</Text>
            <ul className="list-unstyled d-flex flex-column gap-1">
              <li><Link to="/about" className="text-muted small">Nosotros</Link></li>
              <li><Link to="/contact" className="text-muted small">Contacto</Link></li>
              <li><Link to="/login" className="text-muted small">Iniciar sesión</Link></li>
            </ul>
          </div>
        </div>
        <hr style={{ borderColor: 'var(--color-border)' }} />
        <Text variant="p" className="text-muted text-center small mb-0">
          © {year} AvantFlix — Todos los derechos reservados.
        </Text>
      </div>
    </footer>
  )
}

export default Footer

