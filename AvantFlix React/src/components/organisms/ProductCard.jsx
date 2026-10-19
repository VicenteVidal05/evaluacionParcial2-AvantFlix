import CardBody from '../molecules/CardBody'
import PriceTag from '../molecules/PriceTag'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'

function ProductCard({ product, onAddToCart }) {
  if (!product) {
    return null
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  function handleAdd() {
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product)
    }
  }

  function renderStockBadge() {
    if (isOutOfStock) {
      return <Badge variant="secondary">Sin stock</Badge>
    }
    if (isLowStock) {
      return <Badge variant="warning">¡Últimas {product.stock} unidades!</Badge>
    }
    return <Badge variant="success">En stock</Badge>
  }

  return (
    <div className="card avantflix-card h-100">
      <CardBody
        imageSrc={product.image}
        imageAlt={product.name}
        title={product.name}
      >
        <div className="mt-2 mb-3">
          <PriceTag price={product.price} discount={product.discount} />
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {renderStockBadge()}
          <Badge variant="info">{product.category}</Badge>
        </div>
        <Button
          variant="danger"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="w-100"
        >
          {isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </CardBody>
    </div>
  )
}

export default ProductCard

