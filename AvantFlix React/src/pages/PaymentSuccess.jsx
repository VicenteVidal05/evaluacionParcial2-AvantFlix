import { useLocation, useNavigate } from 'react-router-dom'
import Text from '../components/atoms/Text'
import Button from '../components/atoms/Button'

function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state || {}
  const order = state.order || {}
  const items = state.items || []
  const total = state.total || 0

  function handlePrint() {
    window.print()
  }

  function handleGoHome() {
    navigate('/')
  }

  return (
    <div className="container py-5">
      <div className="payment-success-wrapper mx-auto" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-4">
          <Text variant="p" style={{ color: 'var(--color-accent)', fontSize: '3rem' }}>✓</Text>
          <Text variant="h3" className="mb-2">¡Pago exitoso!</Text>
          <Text variant="p" className="text-muted">
            Tu pedido ha sido confirmado y está en preparación.
          </Text>
        </div>

        <div className="alert alert-success mb-4" role="alert">
          <Text variant="p" className="mb-1">
            <strong>Número de orden:</strong> {order.number}
          </Text>
          <Text variant="p" className="mb-0">
            <strong>Código de seguimiento:</strong> {order.tracking}
          </Text>
        </div>

        <Text variant="h5" className="mb-2">Datos de envío</Text>
        <Text variant="p" className="text-muted mb-1">
          {order.nombre} {order.apellidos}
        </Text>
        <Text variant="p" className="text-muted mb-1">{order.correo}</Text>
        <Text variant="p" className="text-muted mb-4">
          {order.calle}{order.depto ? ', ' + order.depto : ''} — {order.region}, {order.comuna}
        </Text>

        <Text variant="h5" className="mb-3">Resumen de compra</Text>
        <div className="table-responsive">
          <table className="table avantflix-table mb-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map(function (item) {
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
        </div>

        <Text variant="h4" className="text-end mb-4">
          Total pagado: ${total.toLocaleString('es-CL')}
        </Text>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button variant="outline-light" onClick={handlePrint}>
            🖨️ Imprimir boleta en PDF
          </Button>
          <Button variant="outline-light">
            📧 Enviar boleta por email
          </Button>
          <Button variant="danger" onClick={handleGoHome}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess

