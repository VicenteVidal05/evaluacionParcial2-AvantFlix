import CartTable from '../components/organisms/CartTable'
import Text from '../components/atoms/Text'

function Cart({ cartItems = [], onRemove, onQuantityChange, onClearCart }) {
  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">
        Mi Carrito
      </Text>
      <CartTable
        items={cartItems}
        onRemove={onRemove}
        onQuantityChange={onQuantityChange}
        onClearCart={onClearCart}
      />
    </div>
  )
}

export default Cart

