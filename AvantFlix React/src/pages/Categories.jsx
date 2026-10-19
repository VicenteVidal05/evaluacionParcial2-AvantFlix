import { useState } from 'react'
import AnimeCard from '../components/organisms/AnimeCard'
import SearchBar from '../components/molecules/SearchBar'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'

function Categories({ animes = [] }) {
  const [selectedSeason, setSelectedSeason] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const seasons = []
  animes.forEach(function (a) {
    if (!seasons.includes(a.season)) {
      seasons.push(a.season)
    }
  })

  function handleSearch(query) {
    setSearchQuery(query)
  }

  function handleSeasonFilter(season) {
    if (selectedSeason === season) {
      setSelectedSeason('')
    } else {
      setSelectedSeason(season)
    }
  }

  function handleClearFilters() {
    setSelectedSeason('')
    setSearchQuery('')
  }

  let filtered = animes

  if (selectedSeason) {
    filtered = filtered.filter(function (a) {
      return a.season === selectedSeason
    })
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase()
    filtered = filtered.filter(function (a) {
      return a.title.toLowerCase().includes(lowerQuery)
    })
  }

  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">
        Catálogo de Streaming
      </Text>
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} placeholder="Buscar anime por título..." />
      </div>
      <div className="d-flex gap-2 flex-wrap mb-4">
        {seasons.map(function (season) {
          return (
            <Button
              key={season}
              variant={selectedSeason === season ? 'danger' : 'outline-secondary'}
              onClick={() => handleSeasonFilter(season)}
            >
              {season}
            </Button>
          )
        })}
        {(selectedSeason || searchQuery) && (
          <Button variant="outline-light" onClick={handleClearFilters}>
            Limpiar filtros ✕
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <Text variant="p" className="text-muted text-center py-5">
          No se encontraron animes con los filtros seleccionados.
        </Text>
      ) : (
        <div className="row g-4">
          {filtered.map(function (anime) {
            return (
              <div key={anime.id} className="col-sm-6 col-lg-4 col-xl-3">
                <AnimeCard anime={anime} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Categories

