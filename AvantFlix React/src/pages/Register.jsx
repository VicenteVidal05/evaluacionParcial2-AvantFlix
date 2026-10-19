import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Text from '../components/atoms/Text'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const initialForm = {
  name: '',
  email: '',
  password: ''
}

function Register() {
  const [formData, setFormData] = useState(initialForm)
  const [registered, setRegistered] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(function (prev) {
      return { ...prev, [name]: value }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Validación básica estilo estudiante
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio'
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setRegistered(true)
    setTimeout(function () {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="container py-5" style={{ maxWidth: '460px' }}>
      <div className="payment-success-wrapper p-4">
        <Text variant="h3" className="text-center mb-4">Crear Cuenta</Text>

        {registered && (
          <div className="alert alert-success mb-3" role="alert">
            ¡Cuenta creada exitosamente! Redirigiendo a inicio de sesión...
          </div>
        )}

        <form onSubmit={handleSubmit} className="avantflix-form-dark">
          <Input
            name="name"
            label="Nombre completo"
            placeholder="Ej: Daniel Vargas"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="Ej: daniel@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Crea una contraseña segura"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" variant="danger" className="w-100 avantflix-btn-primary mb-3">
            Registrarse
          </Button>
        </form>

        <div className="text-center mt-3">
          <Text variant="span" className="text-muted small">
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--color-primary)' }}>Inicia sesión</Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Register

