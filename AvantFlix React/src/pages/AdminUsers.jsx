import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import initialUsers from '../data/users'
import AdminSidebar from '../components/organisms/AdminSidebar'
import Text from '../components/atoms/Text'
import Button from '../components/atoms/Button'
import Badge from '../components/atoms/Badge'
import Input from '../components/atoms/Input'

const initialForm = {
  name: '',
  email: '',
  role: 'user'
}

function AdminUsers() {
  const [usersList, setUsersList] = useState(initialUsers)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleToggleStatus(id) {
    setUsersList(function (prev) {
      return prev.map(function (u) {
        if (u.id === id) {
          return { ...u, active: !u.active }
        }
        return u
      })
    })
  }

  function handleDeleteUser(id) {
    setUsersList(function (prev) {
      return prev.filter(function (u) { return u.id !== id })
    })
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(function (prev) {
      return { ...prev, [name]: value }
    })
  }

  function handleOpenModal() {
    setFormData(initialForm)
    setErrors({})
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setFormData(initialForm)
    setErrors({})
  }

  function handleAddUser(e) {
    e.preventDefault()

    // Validación básica estilo estudiante
    const newErrors = {}
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role || 'user',
      active: true
    }
    setUsersList(function (prev) { return [...prev, newUser] })
    handleCloseModal()
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 flex-grow-1" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Text variant="h2" className="avantflix-section-title mb-0">
              Gestión de Usuarios
            </Text>
            <Button variant="danger" onClick={handleOpenModal}>
              + Nuevo Usuario
            </Button>
          </div>

          <div className="table-responsive">
            <table className="table avantflix-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(function (u) {
                  return (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <Badge variant={u.role === 'admin' ? 'danger' : 'info'}>
                          {u.role.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant={u.active ? 'success' : 'secondary'}>
                          {u.active ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-light"
                            onClick={() => handleToggleStatus(u.id)}
                          >
                            {u.active ? 'Desactivar' : 'Activar'}
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header
              closeButton
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-light)'
              }}
            >
              <Modal.Title>Crear Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                backgroundColor: 'var(--color-bg-card)',
                color: 'var(--color-text-light)'
              }}
            >
              <form onSubmit={handleAddUser} className="avantflix-form-dark">
                <Input
                  name="name"
                  label="Nombre"
                  placeholder="Ej: Sofía Herrera"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <Input
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="Ej: sofia@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <Input
                  name="role"
                  label="Rol (user / admin)"
                  placeholder="user"
                  value={formData.role}
                  onChange={handleChange}
                  error={errors.role}
                />
                <Button type="submit" variant="danger" className="w-100 mt-2">
                  Guardar Usuario
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers

