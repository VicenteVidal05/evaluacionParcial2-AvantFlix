import { render, screen, fireEvent } from '@testing-library/react'
import CartTableRow from './CartTableRow'

function renderRow(item, handlers) {
  return render(
    <table>
      <tbody>
        <CartTableRow
          item={item}
          onRemove={handlers.onRemove}
          onQuantityChange={handlers.onQuantityChange}
        />
      </tbody>
    </table>
  )
}

describe('CartTableRow', function () {
  const item = {
    id: 7,
    name: 'Figura Luffy',
    price: 20000,
    quantity: 2,
    image: 'luffy.png'
  }

  it('muestra nombre, cantidad y subtotal calculado', function () {
    const { container } = renderRow(item, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: jasmine.createSpy('onQuantityChange')
    })

    expect(screen.getByText('Figura Luffy')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
    expect(container.textContent).toContain('40.000')
  })

  it('incrementa y decrementa la cantidad mediante los mocks', function () {
    const onQuantityChange = jasmine.createSpy('onQuantityChange')
    renderRow(item, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: onQuantityChange
    })

    fireEvent.click(screen.getByRole('button', { name: '+' }))
    expect(onQuantityChange).toHaveBeenCalledWith(7, 3)

    fireEvent.click(screen.getByRole('button', { name: '−' }))
    expect(onQuantityChange).toHaveBeenCalledWith(7, 1)
  })

  it('no disminuye la cantidad por debajo de 1', function () {
    const onQuantityChange = jasmine.createSpy('onQuantityChange')
    renderRow({ ...item, quantity: 1 }, {
      onRemove: jasmine.createSpy('onRemove'),
      onQuantityChange: onQuantityChange
    })

    fireEvent.click(screen.getByRole('button', { name: '−' }))
    expect(onQuantityChange).not.toHaveBeenCalled()
  })

  it('elimina el producto enviando su id al mock', function () {
    const onRemove = jasmine.createSpy('onRemove')
    renderRow(item, {
      onRemove: onRemove,
      onQuantityChange: jasmine.createSpy('onQuantityChange')
    })

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
    expect(onRemove).toHaveBeenCalledWith(7)
  })
})
