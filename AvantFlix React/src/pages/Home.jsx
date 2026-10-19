import HeroBanner from '../components/organisms/HeroBanner'
import AnimeCard from '../components/organisms/AnimeCard'
import ProductCard from '../components/organisms/ProductCard'
import Text from '../components/atoms/Text'

function Home({ animes = [], products = [], onAddToCart }) {
  const featured = animes.length > 0 ? animes[animes.length - 1] : null

  const recentAnimes = animes.slice(0, 4)
  const featuredProducts = products.slice(0, 4)

  return (
    <div>
      <HeroBanner anime={featured} />
      <div className="container py-5">
        <Text variant="h2" className="avantflix-section-title mb-4">
          Temporadas actuales
        </Text>
        <div className="row g-4 mb-5">
          {recentAnimes.map(function (anime) {
            return (
              <div key={anime.id} className="col-sm-6 col-lg-3">
                <AnimeCard anime={anime} />
              </div>
            )
          })}
        </div>

        <Text variant="h2" className="avantflix-section-title mb-4">
          Productos destacados
        </Text>
        <div className="row g-4">
          {featuredProducts.map(function (product) {
            return (
              <div key={product.id} className="col-sm-6 col-lg-3">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home

