import { useState } from 'react'
import Input from '../atoms/Input'
import Button from '../atoms/Button'

function SearchBar({ onSearch, placeholder = 'Buscar...' }) {
  const [query, setQuery] = useState('')

  function handleChange(e) {
    setQuery(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSearch(query)
    }
  }

  function handleClick() {
    onSearch(query)
  }

  return (
    <div className="d-flex gap-2 align-items-start">
      <div style={{ flex: 1 }}>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="search"
        />
      </div>
      <Button variant="danger" onClick={handleClick}>
        Buscar
      </Button>
    </div>
  )
}

export default SearchBar

