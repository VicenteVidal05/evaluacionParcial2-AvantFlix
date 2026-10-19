import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input', function () {
  it('muestra el placeholder y el valor en el DOM', function () {
    render(
      <Input
        name="email"
        placeholder="tu correo"
        value="admin@avantflix.cl"
        onChange={function () {}}
      />
    )

    const input = screen.getByPlaceholderText('tu correo')
    expect(input.value).toBe('admin@avantflix.cl')
    expect(input.name).toBe('email')
  })

  it('notifica el cambio de valor mediante onChange', function () {
    const onChange = jasmine.createSpy('onChange')
    render(<Input name="nombre" placeholder="Nombre" value="" onChange={onChange} />)

    fireEvent.change(screen.getByPlaceholderText('Nombre'), {
      target: { value: 'Juan' }
    })

    expect(onChange).toHaveBeenCalled()
  })

  it('muestra el mensaje de error y la clase is-invalid', function () {
    render(
      <Input
        name="email"
        placeholder="Correo"
        value=""
        onChange={function () {}}
        error="El correo electrónico es obligatorio"
      />
    )

    const input = screen.getByPlaceholderText('Correo')
    expect(input.className).toContain('is-invalid')
    expect(screen.getByText('El correo electrónico es obligatorio')).toBeTruthy()
  })
})
