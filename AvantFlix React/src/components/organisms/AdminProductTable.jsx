import { useState } from 'react'
import { Table, Modal } from 'react-bootstrap'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Badge from '../atoms/Badge'

const initialForm = {
  name: '',
  price: '',
  stock: '',
  category: '',
  image: '',
  discount: ''
}

function AdminProductTable({ products, onAdd, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleOpenAdd() {
    setEditingProduct(null)
    setFormData(initialForm)
    setErrors({})
    setShowModal(true)
  }

  function handleOpenEdit(product) {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      price: product.price !== undefined ? product.price : '',
      stock: product.stock !== undefined ? product.stock : '',
      category: product.category || '',
      image: product.image || '',
      discount: product.discount !== null && product.discount !== undefined ? product.discount : ''
    })
    setErrors({})
    setShowModal(true)
  }

  function handleClose() {
    setShowModal(false)
    setEditingProduct(null)
    setFormData(initialForm)
    setErrors({})
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(function (prev) {
      return { ...prev, [name]: value }
    })
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    // Validación básica estilo estudiante
    const newErrors = {}
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    if (formData.price === '' || isNaN(Number(formData.price))) {
      newErrors.price = 'Ingrese un precio válido'
    }
    if (formData.stock === '' || isNaN(Number(formData.stock))) {
      newErrors.stock = 'Ingrese el stock'
    }
    if (!formData.category || !formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingProduct) {
      onEdit({ ...editingProduct, ...formData })
    } else {
      onAdd(formData)
    }
    handleClose()
  }

  function getStockBadge(stock) {
    const stockNum = Number(stock)
    if (stockNum === 0) {
      return <Badge variant="secondary">Sin stock</Badge>
    }
    if (stockNum <= 5) {
      return <Badge variant="warning">Crítico ({stockNum})</Badge>
    }
    return <Badge variant="success">OK ({stockNum})</Badge>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Text variant="h4">Tienda de Merchandising</Text>
        <Button variant="danger" onClick={handleOpenAdd}>+ Agregar Producto</Button>
      </div>

      <Table responsive className="avantflix-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(function (product) {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td><Badge variant="info">{product.category}</Badge></td>
                <td>${Number(product.price).toLocaleString('es-CL')}</td>
                <td>{getStockBadge(product.stock)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-light" onClick={() => handleOpenEdit(product)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(product.id)}>
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-light)'
          }}
        >
          <Modal.Title>
            {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text-light)'
          }}
        >
          <form onSubmit={handleFormSubmit} className="avantflix-form-dark">
            <Input
              name="name"
              label="Nombre"
              placeholder="Ej: Figura Tanjiro"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              name="price"
              label="Precio (CLP)"
              type="number"
              placeholder="Ej: 29990"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
            />
            <Input
              name="stock"
              label="Stock"
              type="number"
              placeholder="Ej: 15"
              value={formData.stock}
              onChange={handleChange}
              error={errors.stock}
            />
            <Input
              name="category"
              label="Categoría"
              placeholder="Figuras / Mangas / Accesorios"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
            />
            <Input
              name="image"
              label="URL de imagen"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
            />
            <Input
              name="discount"
              label="Descuento % (opcional)"
              type="number"
              placeholder="Ej: 10"
              value={formData.discount}
              onChange={handleChange}
              error={errors.discount}
            />
            <Button type="submit" variant="danger" className="w-100 mt-2">
              {editingProduct ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminProductTable

