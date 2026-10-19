import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'

const product = {
  id: 1,
  name: 'Polera Naruto',
  price: 15990,
  stock: 12,
  category: 'Ropa',
  image: 'naruto.png',
  discount: null
}

describe('ProductCard', function () {
  it('no renderiza nada si no hay producto', function () {
    const { container } = render(<ProductCard product={null} onAddToCart={function () {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('muestra el producto en stock y permite agregarlo al carrito', function () {
    const onAddToCart = jasmine.createSpy('onAddToCart')
    render(<ProductCard product={product} onAddToCart={onAddToCart} />)

    expect(screen.getByText('Polera Naruto')).toBeTruthy()
    expect(screen.getByText('En stock')).toBeTruthy()
    expect(screen.getByText('Ropa')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
    expect(onAddToCart).toHaveBeenCalledWith(product)
  })

  it('muestra alerta de stock bajo cuando quedan 5 o menos unidades', function () {
    render(
      <ProductCard
        product={{ ...product, stock: 3 }}
        onAddToCart={jasmine.createSpy('onAddToCart')}
      />
    )

    expect(screen.getByText('¡Últimas 3 unidades!')).toBeTruthy()
  })

  it('deshabilita el botón y no llama al mock si no hay stock', function () {
    const onAddToCart = jasmine.createSpy('onAddToCart')
    render(
      <ProductCard
        product={{ ...product, stock: 0 }}
        onAddToCart={onAddToCart}
      />
    )

    const button = screen.getByRole('button', { name: 'Sin stock' })
    expect(button.disabled).toBe(true)
    expect(screen.getAllByText('Sin stock').length).toBe(2)
    fireEvent.click(button)
    expect(onAddToCart).not.toHaveBeenCalled()
  })
})
