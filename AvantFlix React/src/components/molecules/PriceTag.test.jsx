import { render, screen } from '@testing-library/react'
import PriceTag from './PriceTag'

describe('PriceTag', function () {
  it('muestra el precio formateado cuando no hay descuento', function () {
    const { container } = render(<PriceTag price={10000} />)

    expect(container.textContent).toContain('10.000')
    expect(screen.queryByText(/% OFF/)).toBeNull()
  })

  it('calcula el precio con descuento y muestra el badge de oferta', function () {
    const { container } = render(<PriceTag price={10000} discount={20} />)

    expect(container.textContent).toContain('8.000')
    expect(container.textContent).toContain('10.000')
    expect(screen.getByText('20% OFF')).toBeTruthy()
  })

  it('no aplica descuento si el porcentaje es 0', function () {
    const { container } = render(<PriceTag price={5000} discount={0} />)

    expect(screen.queryByText(/OFF/)).toBeNull()
    expect(container.textContent).toContain('5.000')
  })
})
