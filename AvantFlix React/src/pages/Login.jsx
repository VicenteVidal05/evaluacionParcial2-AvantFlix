import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Text from '../components/atoms/Text'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio'
    }
    if (!password.trim()) {
      newErrors.password = 'La contraseña es obligatoria'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (email === 'admin@avantflix.cl' && password === 'admin123') {
      onLogin({ name: 'Admin AvantFlix', email: email, role: 'admin' })
      navigate('/admin')
      return
    }

    if (email && password) {
      const username = email.split('@')[0]
      onLogin({ name: username, email: email, role: 'user' })
      navigate('/')
      return
    }

    setErrorMsg('Credenciales inválidas.')
  }

  return (
    <div className="container py-5" style={{ maxWidth: '460px' }}>
      <div className="payment-success-wrapper p-4">
        <Text variant="h3" className="text-center mb-4">Iniciar Sesión</Text>

        {errorMsg && (
          <div className="alert alert-danger mb-3" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="avantflix-form-dark">
          <Input
            name="email"
            type="email"
            label="Correo electrónico"
            placeholder="admin@avantflix.cl o tu correo"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrorMsg('') }}
            error={errors.password}
          />
          <Button type="submit" variant="danger" className="w-100 avantflix-btn-primary mb-3">
            Ingresar
          </Button>
        </form>

        <div className="text-center mt-3">
          <Text variant="span" className="text-muted small">
            ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--color-primary)' }}>Regístrate aquí</Link>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Login

