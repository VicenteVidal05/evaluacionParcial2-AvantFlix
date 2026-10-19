import Image from '../atoms/Image'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

function CartTableRow({ item, onRemove, onQuantityChange }) {
  const subtotal = item.price * item.quantity
  const formattedPrice = item.price.toLocaleString('es-CL')
  const formattedSubtotal = subtotal.toLocaleString('es-CL')

  function handleIncrease() {
    onQuantityChange(item.id, item.quantity + 1)
  }

  function handleDecrease() {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1)
    }
  }

  function handleRemove() {
    onRemove(item.id)
  }

  return (
    <tr>
      <td>
        <Image src={item.image} alt={item.name} className="cart-thumbnail" />
      </td>
      <td>
        <Text variant="span">{item.name}</Text>
      </td>
      <td>
        <Text variant="span">${formattedPrice}</Text>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-light" onClick={handleDecrease}>−</Button>
          <Text variant="span">{item.quantity}</Text>
          <Button variant="outline-light" onClick={handleIncrease}>+</Button>
        </div>
      </td>
      <td>
        <Text variant="span" className="fw-bold">${formattedSubtotal}</Text>
      </td>
      <td>
        <Button variant="danger" onClick={handleRemove}>
          Eliminar
        </Button>
      </td>
    </tr>
  )
}

export default CartTableRow

