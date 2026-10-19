import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', function () {
  it('usa el placeholder personalizado en el input', function () {
    render(<SearchBar onSearch={function () {}} placeholder="Buscar anime..." />)

    expect(screen.getByPlaceholderText('Buscar anime...')).toBeTruthy()
  })

  it('llama a onSearch con el texto escrito al hacer clic', function () {
    const onSearch = jasmine.createSpy('onSearch')
    render(<SearchBar onSearch={onSearch} />)

    fireEvent.change(screen.getByPlaceholderText('Buscar...'), {
      target: { value: 'Naruto' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onSearch).toHaveBeenCalledWith('Naruto')
  })

  it('llama a onSearch al presionar Enter', function () {
    const onSearch = jasmine.createSpy('onSearch')
    render(<SearchBar onSearch={onSearch} />)

    const input = screen.getByPlaceholderText('Buscar...')
    fireEvent.change(input, { target: { value: 'One Piece' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSearch).toHaveBeenCalledWith('One Piece')
  })
})
