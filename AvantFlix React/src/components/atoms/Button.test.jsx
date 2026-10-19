import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', function () {
  it('renderiza el texto del botón en el DOM', function () {
    render(<Button>Agregar al carrito</Button>)

    expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeTruthy()
  })

  it('aplica la clase de Bootstrap según la variante', function () {
    render(<Button variant="danger">Pagar</Button>)

    const button = screen.getByRole('button', { name: 'Pagar' })
    expect(button.className).toContain('btn-danger')
  })

  it('ejecuta onClick cuando el usuario presiona el botón', function () {
    const onClick = jasmine.createSpy('onClick')
    render(<Button onClick={onClick}>Buscar</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no dispara onClick si está deshabilitado', function () {
    const onClick = jasmine.createSpy('onClick')
    render(<Button disabled={true} onClick={onClick}>Sin stock</Button>)

    const button = screen.getByRole('button', { name: 'Sin stock' })
    expect(button.disabled).toBe(true)
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
