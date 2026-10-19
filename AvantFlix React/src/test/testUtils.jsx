import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

export function renderWithRouter(ui, options = {}) {
  const initialEntries = options.initialEntries || ['/']

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {ui}
    </MemoryRouter>
  )
}
