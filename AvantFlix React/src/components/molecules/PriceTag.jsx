import Text from '../atoms/Text'
import Badge from '../atoms/Badge'

function PriceTag({ price = 0, discount = null }) {
  const formattedPrice = Number(price).toLocaleString('es-CL')

  if (discount && discount > 0) {
    const discountedPrice = Math.round(price * (1 - discount / 100))
    const formattedDiscounted = discountedPrice.toLocaleString('es-CL')

    return (
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Text variant="span" className="fw-bold fs-5">
          ${formattedDiscounted}
        </Text>
        <Text variant="span" className="text-decoration-line-through text-muted small">
          ${formattedPrice}
        </Text>
        <Badge variant="warning">{discount}% OFF</Badge>
      </div>
    )
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <Text variant="span" className="fw-bold fs-5">
        ${formattedPrice}
      </Text>
    </div>
  )
}

export default PriceTag

