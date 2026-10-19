import { screen, fireEvent } from '@testing-library/react'
import { renderWithRouter } from '../../test/testUtils'
import Navbar from './Navbar'

describe('Navbar', function () {
  it('muestra enlaces públicos y el acceso a login cuando no hay usuario', function () {
    renderWithRouter(<Navbar cartCount={0} user={null} onLogout={function () {}} />)

    expect(screen.getByText('AvantFlix')).toBeTruthy()
    expect(screen.getByText('Catálogo')).toBeTruthy()
    expect(screen.getByText('Iniciar sesión')).toBeTruthy()
    expect(screen.queryByText('Cerrar sesión')).toBeNull()
  })

  it('muestra el badge del carrito solo si hay productos', function () {
    renderWithRouter(<Navbar cartCount={3} user={null} onLogout={function () {}} />)

    expect(screen.getByText('3')).toBeTruthy()
  })

  it('muestra el panel admin y cierra sesión usando el mock', function () {
    const onLogout = jasmine.createSpy('onLogout')
    const user = { name: 'Admin AvantFlix', email: 'admin@avantflix.cl', role: 'admin' }

    renderWithRouter(<Navbar cartCount={1} user={user} onLogout={onLogout} />)

    expect(screen.getByText('Panel Admin')).toBeTruthy()
    fireEvent.click(screen.getByText('Cerrar sesión'))
    expect(onLogout).toHaveBeenCalledTimes(1)
  })

  it('abre el menú hamburguesa cambiando la clase collapse', function () {
    const { container } = renderWithRouter(
      <Navbar cartCount={0} user={null} onLogout={function () {}} />
    )

    const menu = container.querySelector('#main-nav')
    expect(menu.className).not.toContain('show')

    fireEvent.click(screen.getByLabelText('Abrir navegación'))
    expect(menu.className).toContain('show')
  })
})
