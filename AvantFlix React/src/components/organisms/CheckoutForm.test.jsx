import { render, screen, fireEvent } from '@testing-library/react'
import CheckoutForm from './CheckoutForm'

function getField(container, name) {
  return container.querySelector('[name="' + name + '"]')
}

describe('CheckoutForm', function () {
  it('muestra errores de validación si se envía vacío', function () {
    const onSubmit = jasmine.createSpy('onSubmit')
    render(<CheckoutForm onSubmit={onSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar y pagar' }))

    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy()
    expect(screen.getByText('Los apellidos son obligatorios')).toBeTruthy()
    expect(screen.getByText('El correo es obligatorio')).toBeTruthy()
    expect(screen.getByText('La dirección es obligatoria')).toBeTruthy()
    expect(screen.getByText('Selecciona una región')).toBeTruthy()
    expect(screen.getByText('Selecciona una comuna')).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mantiene la comuna deshabilitada hasta elegir región', function () {
    const { container } = render(<CheckoutForm onSubmit={jasmine.createSpy('onSubmit')} />)

    expect(getField(container, 'comuna').disabled).toBe(true)

    fireEvent.change(getField(container, 'region'), {
      target: { value: 'metropolitana' }
    })

    expect(getField(container, 'comuna').disabled).toBe(false)
    expect(screen.getByText('Santiago')).toBeTruthy()
  })

  it('usa defaultValues y envía el formulario completo al mock', function () {
    const onSubmit = jasmine.createSpy('onSubmit')
    const { container } = render(
      <CheckoutForm
        onSubmit={onSubmit}
        defaultValues={{ nombre: 'Ana', apellidos: 'Martínez', correo: 'ana@example.com' }}
      />
    )

    expect(getField(container, 'nombre').value).toBe('Ana')

    fireEvent.change(getField(container, 'calle'), {
      target: { value: 'Calle Falsa 123' }
    })
    fireEvent.change(getField(container, 'region'), {
      target: { value: 'metropolitana' }
    })
    fireEvent.change(getField(container, 'comuna'), {
      target: { value: 'providencia' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar y pagar' }))

    expect(onSubmit).toHaveBeenCalled()
    const payload = onSubmit.calls.mostRecent().args[0]
    expect(payload.nombre).toBe('Ana')
    expect(payload.calle).toBe('Calle Falsa 123')
    expect(payload.region).toBe('metropolitana')
    expect(payload.comuna).toBe('providencia')
  })
})
