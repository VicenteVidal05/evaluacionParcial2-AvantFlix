import { screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { render } from '@testing-library/react'
import Login from './Login'

function LocationProbe() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderLogin(onLogin) {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Login onLogin={onLogin} />
      <LocationProbe />
    </MemoryRouter>
  )
}

function fillLogin(email, password) {
  fireEvent.change(screen.getByPlaceholderText('admin@avantflix.cl o tu correo'), {
    target: { value: email }
  })
  fireEvent.change(screen.getByPlaceholderText('••••••••'), {
    target: { value: password }
  })
}

describe('Login', function () {
  it('muestra errores de validación si el formulario está vacío', function () {
    const onLogin = jasmine.createSpy('onLogin')
    renderLogin(onLogin)

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByText('El correo electrónico es obligatorio')).toBeTruthy()
    expect(screen.getByText('La contraseña es obligatoria')).toBeTruthy()
    expect(onLogin).not.toHaveBeenCalled()
  })

  it('autentica al administrador y navega al panel', function () {
    const onLogin = jasmine.createSpy('onLogin')
    renderLogin(onLogin)

    fillLogin('admin@avantflix.cl', 'admin123')
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onLogin).toHaveBeenCalledWith({
      name: 'Admin AvantFlix',
      email: 'admin@avantflix.cl',
      role: 'admin'
    })
    expect(screen.getByTestId('location').textContent).toBe('/admin')
  })

  it('autentica a un usuario normal y navega al inicio', function () {
    const onLogin = jasmine.createSpy('onLogin')
    renderLogin(onLogin)

    fillLogin('maria@example.com', 'clave123')
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(onLogin).toHaveBeenCalledWith({
      name: 'maria',
      email: 'maria@example.com',
      role: 'user'
    })
    expect(screen.getByTestId('location').textContent).toBe('/')
  })
})
