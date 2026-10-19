import { useParams, useNavigate } from 'react-router-dom'
import Image from '../components/atoms/Image'
import Text from '../components/atoms/Text'
import Button from '../components/atoms/Button'
import Badge from '../components/atoms/Badge'
import ProductCard from '../components/organisms/ProductCard'

function AnimeDetail({ animes = [], products = [], onAddToCart }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const anime = animes.find(function (a) {
    return a.id === Number(id)
  })

  if (!anime) {
    return (
      <div className="container py-5 text-center">
        <Text variant="h3" className="text-muted mb-4">Anime no encontrado</Text>
        <Button variant="danger" onClick={() => navigate('/categories')}>
          Volver al catálogo
        </Button>
      </div>
    )
  }

  const relatedProducts = products.filter(function (p) {
    return anime.relatedProducts && anime.relatedProducts.includes(p.id)
  })

  const episodeCount = Math.min(anime.episodes, 12)
  const episodeList = []
  for (let i = 1; i <= episodeCount; i++) {
    episodeList.push(i)
  }

  return (
    <div className="container py-5">
      <Button variant="outline-light" onClick={() => navigate(-1)} className="mb-4">
        ← Volver
      </Button>
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <Image
            src={anime.cover}
            alt={anime.title}
            style={{ borderRadius: '8px', width: '100%' }}
          />
        </div>
        <div className="col-md-8">
          <Badge variant="danger" className="mb-3 avantflix-badge-season">
            {anime.season}
          </Badge>
          <Text variant="h1" className="mb-2">{anime.title}</Text>
          <Text variant="p" className="mb-3" style={{ color: 'var(--color-accent)' }}>
            ★ {anime.rating} — {anime.episodes} episodios
          </Text>
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {anime.genre && anime.genre.map(function (g) {
              return <Badge key={g} variant="secondary">{g}</Badge>
            })}
          </div>
          <Text variant="p" className="text-muted mb-4">{anime.synopsis}</Text>
          <Button variant="danger">▶ Ver episodio 1</Button>
        </div>
      </div>

      <Text variant="h4" className="avantflix-section-title mb-3">
        Episodios disponibles
      </Text>
      <ul className="list-group mb-5">
        {episodeList.map(function (num) {
          return (
            <li
              key={num}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-light)'
              }}
            >
              <Text variant="span">Ep. {num} — Episodio {num}</Text>
              <Button variant="outline-danger">▶ Ver</Button>
            </li>
          )
        })}
        {anime.episodes > 12 && (
          <li
            className="list-group-item"
            style={{
              backgroundColor: 'var(--color-secondary)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
              textAlign: 'center'
            }}
          >
            ... y {anime.episodes - 12} episodios más disponibles
          </li>
        )}
      </ul>

      {relatedProducts.length > 0 && (
        <>
          <Text variant="h4" className="avantflix-section-title mb-4">
            Merchandising relacionado
          </Text>
          <div className="row g-4">
            {relatedProducts.map(function (product) {
              return (
                <div key={product.id} className="col-sm-6 col-lg-4">
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default AnimeDetail

