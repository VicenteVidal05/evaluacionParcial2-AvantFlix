import { useNavigate } from 'react-router-dom'
import CartTableRow from '../molecules/CartTableRow'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function CartTable({ items = [], onRemove, onQuantityChange, onClearCart }) {
  const navigate = useNavigate()

  let total = 0
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity
  }

  function handleCheckout() {
    navigate('/checkout')
  }

  function handleCatalog() {
    navigate('/categories')
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <Text variant="h4" className="text-muted mb-2">Tu carrito está vacío</Text>
        <Text variant="p" className="text-muted mb-4">
          Explora el catálogo y agrega productos que te interesen.
        </Text>
        <Button variant="danger" onClick={handleCatalog}>
          Ir al catálogo
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table avantflix-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {items.map(function (item) {
              return (
                <CartTableRow
                  key={item.id}
                  item={item}
                  onRemove={onRemove}
                  onQuantityChange={onQuantityChange}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <Button variant="outline-danger" onClick={onClearCart}>
          Limpiar carrito
        </Button>
        <div className="text-end">
          <Text variant="h5" className="mb-2">
            Total: ${total.toLocaleString('es-CL')}
          </Text>
          <Button variant="danger" onClick={handleCheckout}>
            Proceder al pago →
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartTable

