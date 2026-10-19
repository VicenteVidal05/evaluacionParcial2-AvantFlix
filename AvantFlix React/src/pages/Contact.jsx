import { useState } from 'react'
import Text from '../components/atoms/Text'
import Input from '../components/atoms/Input'
import TextArea from '../components/atoms/TextArea'
import Button from '../components/atoms/Button'

const initialForm = {
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: ''
}

function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(function (prev) {
      return { ...prev, [name]: value }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio'
    }
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es obligatorio'
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitted(true)
    setFormData(initialForm)
    setErrors({})
  }

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <Text variant="h2" className="avantflix-section-title mb-4">
        Contacto y Soporte
      </Text>
      <Text variant="p" className="text-muted mb-4">
        ¿Tienes dudas sobre un pedido, sugerencias de anime o consultas comerciales? Escríbenos y te responderemos en breve.
      </Text>

      {submitted && (
        <div className="alert alert-success mb-4" role="alert">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo dentro de las próximas 24 horas hábiles.
        </div>
      )}

      <form onSubmit={handleSubmit} className="avantflix-form-dark">
        <div className="row">
          <div className="col-md-6">
            <Input
              name="nombre"
              label="Nombre completo"
              placeholder="Ej: Laura Méndez"
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
            />
          </div>
          <div className="col-md-6">
            <Input
              name="correo"
              type="email"
              label="Correo electrónico"
              placeholder="Ej: laura@ejemplo.com"
              value={formData.correo}
              onChange={handleChange}
              error={errors.correo}
            />
          </div>
        </div>
        <Input
          name="asunto"
          label="Asunto"
          placeholder="Ej: Consulta por stock de figura"
          value={formData.asunto}
          onChange={handleChange}
          error={errors.asunto}
        />
        <TextArea
          name="mensaje"
          label="Mensaje"
          placeholder="Describe tu consulta con detalle..."
          rows={5}
          value={formData.mensaje}
          onChange={handleChange}
          error={errors.mensaje}
        />
        <Button type="submit" variant="danger" className="w-100 avantflix-btn-primary mt-2">
          Enviar mensaje
        </Button>
      </form>
    </div>
  )
}

export default Contact

