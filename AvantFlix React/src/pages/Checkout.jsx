import { useNavigate } from 'react-router-dom'
import CheckoutForm from '../components/organisms/CheckoutForm'
import Text from '../components/atoms/Text'

function Checkout({ cartItems = [], user = null, onClearCart }) {
  const navigate = useNavigate()

  let total = 0
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].quantity
  }

  const defaultValues = user ? { nombre: user.name, correo: user.email } : {}

  function handleSubmit(formData) {
    const orderNumber = '#' + Math.floor(10000000 + Math.random() * 90000000)
    const trackingCode = 'AVX-' + Date.now().toString().slice(-6)
    const snapshot = [...cartItems]

    onClearCart()

    navigate('/checkout/success', {
      state: {
        order: { number: orderNumber, tracking: trackingCode, ...formData },
        items: snapshot,
        total: total
      }
    })
  }

  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">Checkout</Text>
      <div className="row g-4">
        <div className="col-lg-7">
          <CheckoutForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        </div>
        <div className="col-lg-5">
          <div
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}
          >
            <Text variant="h5" className="mb-3">Resumen del pedido</Text>
            <table className="table avantflix-table table-sm">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(function (item) {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <hr style={{ borderColor: 'var(--color-border)' }} />
            <Text variant="h5" className="text-end mb-0">
              Total: ${total.toLocaleString('es-CL')}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

