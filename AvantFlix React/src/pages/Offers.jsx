import ProductCard from '../components/organisms/ProductCard'
import Text from '../components/atoms/Text'

function Offers({ products = [], onAddToCart }) {
  // Filtrado de productos que posean un porcentaje de descuento
  const discountedProducts = products.filter(function (product) {
    return product.discount && product.discount > 0
  })

  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">
        Ofertas Especiales
      </Text>
      <Text variant="p" className="text-muted mb-4">
        Aprovecha descuentos por tiempo limitado en figuras, mangas y accesorios oficiales.
      </Text>

      {discountedProducts.length === 0 ? (
        <Text variant="p" className="text-muted text-center py-5">
          No hay ofertas activas en este momento.
        </Text>
      ) : (
        <div className="row g-4">
          {discountedProducts.map(function (product) {
            return (
              <div key={product.id} className="col-sm-6 col-lg-4 col-xl-3">
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Offers

