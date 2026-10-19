import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Text from '../atoms/Text'

function AdminSidebar() {
  const location = useLocation()

  function getLinkStyle(path) {
    const isActive = location.pathname === path
    return {
      color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
      fontWeight: isActive ? 'bold' : 'normal'
    }
  }

  return (
    <div className="admin-sidebar p-4">
      <Text variant="h5" style={{ color: 'var(--color-primary)' }} className="mb-4 fw-bold">
        Admin Panel
      </Text>
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/admin" style={getLinkStyle('/admin')}>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/anime" style={getLinkStyle('/admin/anime')}>
          Catálogo Anime
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/store" style={getLinkStyle('/admin/store')}>
          Tienda
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/users" style={getLinkStyle('/admin/users')}>
          Usuarios
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default AdminSidebar

