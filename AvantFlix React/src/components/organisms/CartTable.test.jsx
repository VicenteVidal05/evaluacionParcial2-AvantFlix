import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import CartTable from './CartTable'

function LocationProbe() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}

function renderCart(items, handlers) {
  return render(
    <MemoryRouter initialEntries={['/cart']}>
      <CartTable
        items={items}
        onRemove={handlers.onRemove}
        onQuantityChange={handlers.onQuantityChange}
        onClearCart={handlers.onClearCart}
      />
      <LocationProbe />
    </MemoryRouter>
  )
}

describe('CartTable', function () {
  const items = [
    { id: 1, name: 'Poster Goku', price: 5000, quantity: 2, image: 'goku.png' },
    { id: 2, name: 'Taza Anime', price: 8000, quantity: 1, image: 'taza.png' }
  ]

  it('muestra el estado vacío y navega al catálogo', function () {
    renderCart([], {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      onClearCart: jasmine.createSpy('onClearCart')
    })

    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Ir al catálogo' }))
    expect(screen.getByTestId('location').textContent).toBe('/categories')
  })

  it('calcula el total de todos los productos', function () {
    const { container } = renderCart(items, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      onClearCart: jasmine.createSpy('onClearCart')
    })

    expect(screen.getByText('Poster Goku')).toBeTruthy()
    expect(screen.getByText('Taza Anime')).toBeTruthy()
    expect(container.textContent).toContain('18.000')
  })

  it('ejecuta el mock para limpiar el carrito', function () {
    const onClearCart = jasmine.createSpy('onClearCart')
    renderCart(items, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      onClearCart: onClearCart
    })

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar carrito' }))
    expect(onClearCart).toHaveBeenCalledTimes(1)
  })

  it('navega a checkout al proceder al pago', function () {
    renderCart(items, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      onClearCart: jasmine.createSpy('onClearCart')
    })

    fireEvent.click(screen.getByRole('button', { name: 'Proceder al pago →' }))
    expect(screen.getByTestId('location').textContent).toBe('/checkout')
  })
})
