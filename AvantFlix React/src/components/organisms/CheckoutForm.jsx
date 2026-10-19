import { useState, useEffect } from 'react'
import Input from '../atoms/Input'
import Select from '../atoms/Select'
import TextArea from '../atoms/TextArea'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import regions from '../../data/regions'

function CheckoutForm({ onSubmit, defaultValues = {} }) {
  const [formData, setFormData] = useState({
    nombre: defaultValues.nombre || '',
    apellidos: defaultValues.apellidos || '',
    correo: defaultValues.correo || '',
    calle: '',
    depto: '',
    region: '',
    comuna: '',
    indicaciones: ''
  })
  const [communes, setCommunes] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(function () {
    if (formData.region) {
      const found = regions.find(function (r) {
        return r.value === formData.region
      })
      if (found) {
        setCommunes(found.communes)
      } else {
        setCommunes([])
      }
    } else {
      setCommunes([])
    }
  }, [formData.region])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(function (prev) {
      const nextData = { ...prev, [name]: value }
      if (name === 'region') {
        nextData.comuna = ''
      }
      return nextData
    })
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    const newErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios'
    if (!formData.correo.trim()) newErrors.correo = 'El correo es obligatorio'
    if (!formData.calle.trim()) newErrors.calle = 'La dirección es obligatoria'
    if (!formData.region) newErrors.region = 'Selecciona una región'
    if (!formData.comuna) newErrors.comuna = 'Selecciona una comuna'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const regionOptions = regions.map(function (r) {
    return { value: r.value, label: r.label }
  })

  return (
    <form onSubmit={handleFormSubmit} className="avantflix-form-dark">
      <Text variant="h5" className="mb-4">Datos de entrega</Text>
      <div className="row">
        <div className="col-md-6">
          <Input
            name="nombre"
            label="Nombre"
            placeholder="Ej: Juan"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />
        </div>
        <div className="col-md-6">
          <Input
            name="apellidos"
            label="Apellidos"
            placeholder="Ej: Pérez González"
            value={formData.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />
        </div>
      </div>
      <Input
        name="correo"
        label="Correo electrónico"
        type="email"
        placeholder="Ej: juan@correo.com"
        value={formData.correo}
        onChange={handleChange}
        error={errors.correo}
      />
      <Input
        name="calle"
        label="Calle y número"
        placeholder="Ej: Av. Providencia 1234"
        value={formData.calle}
        onChange={handleChange}
        error={errors.calle}
      />
      <Input
        name="depto"
        label="Departamento / Piso (opcional)"
        placeholder="Ej: Depto 502"
        value={formData.depto}
        onChange={handleChange}
        error={errors.depto}
      />
      <div className="row">
        <div className="col-md-6">
          <Select
            name="region"
            label="Región"
            options={regionOptions}
            value={formData.region}
            onChange={handleChange}
            error={errors.region}
          />
        </div>
        <div className="col-md-6">
          <Select
            name="comuna"
            label="Comuna"
            options={communes}
            value={formData.comuna}
            onChange={handleChange}
            error={errors.comuna}
            disabled={!formData.region}
          />
        </div>
      </div>
      <TextArea
        name="indicaciones"
        label="Indicaciones de entrega (opcional)"
        placeholder="Ej: Timbre no funciona, llamar al llegar."
        rows={3}
        value={formData.indicaciones}
        onChange={handleChange}
        error={errors.indicaciones}
      />
      <Button type="submit" variant="danger" className="w-100 mt-2 avantflix-btn-primary">
        Confirmar y pagar
      </Button>
    </form>
  )
}

export default CheckoutForm

