import { useLocation, useNavigate } from 'react-router-dom'
import Text from '../components/atoms/Text'
import Button from '../components/atoms/Button'

function PaymentRejected() {
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state || {}
  const orderNumber = state.orderNumber || '#PENDIENTE'

  function handleRetry() {
    navigate('/checkout', { state: location.state })
  }

  function handleGoHome() {
    navigate('/')
  }

  return (
    <div className="container py-5">
      <div className="payment-rejected-wrapper mx-auto" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <Text variant="p" style={{ color: 'var(--color-primary)', fontSize: '3rem' }}>✕</Text>
          <Text variant="h3" className="mb-2">Pago rechazado</Text>
          <Text variant="p" className="text-muted">
            No pudimos procesar tu pago. Tus datos de entrega están guardados.
          </Text>
        </div>

        <div className="alert alert-danger mb-4" role="alert">
          <Text variant="p" className="mb-0">
            <strong>Número de orden:</strong> {orderNumber}
          </Text>
        </div>

        <Text variant="p" className="text-muted text-center mb-4">
          Verifica los datos de tu tarjeta e intenta nuevamente. Si el problema persiste, contacta a tu banco.
        </Text>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button variant="danger" onClick={handleRetry} className="px-4">
            VOLVER A REALIZAR EL PAGO
          </Button>
          <Button variant="outline-light" onClick={handleGoHome}>
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentRejected

