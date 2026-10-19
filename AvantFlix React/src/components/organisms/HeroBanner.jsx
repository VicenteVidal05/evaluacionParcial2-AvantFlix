import { useNavigate } from 'react-router-dom'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import Image from '../atoms/Image'

function HeroBanner({ anime }) {
  const navigate = useNavigate()

  if (!anime) {
    return null
  }

  function handleWatch() {
    navigate('/anime/' + anime.id)
  }

  function handleCatalog() {
    navigate('/categories')
  }

  return (
    <section className="avantflix-banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <Badge variant="danger" className="mb-3 avantflix-badge-season">
              {anime.season}
            </Badge>
            <Text variant="h1" className="display-4 fw-bold mb-3">
              {anime.title}
            </Text>
            <Text variant="p" className="lead mb-2" style={{ color: 'var(--color-text-muted)' }}>
              {anime.synopsis}
            </Text>
            <Text variant="p" className="mb-4" style={{ color: 'var(--color-accent)' }}>
              ★ {anime.rating} — {anime.episodes} episodios
            </Text>
            <div className="d-flex gap-3 flex-wrap">
              <Button variant="danger" onClick={handleWatch}>
                ▶ Ver ahora
              </Button>
              <Button variant="outline-light" onClick={handleCatalog}>
                Ver catálogo completo
              </Button>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <Image
              src={anime.cover}
              alt={anime.title}
              style={{
                maxHeight: '420px',
                borderRadius: '8px',
                margin: '0 auto',
                boxShadow: '0 16px 48px rgba(229, 9, 20, 0.3)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner

