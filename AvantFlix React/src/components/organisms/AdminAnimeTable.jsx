import { useState } from 'react'
import { Table, Modal } from 'react-bootstrap'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Badge from '../atoms/Badge'

const initialForm = {
  title: '',
  season: '',
  synopsis: '',
  episodes: '',
  rating: '',
  cover: ''
}

function AdminAnimeTable({ animes, onAdd, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false)
  const [editingAnime, setEditingAnime] = useState(null)
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function handleOpenAdd() {
    setEditingAnime(null)
    setFormData(initialForm)
    setErrors({})
    setShowModal(true)
  }

  function handleOpenEdit(anime) {
    setEditingAnime(anime)
    setFormData({
      title: anime.title || '',
      season: anime.season || '',
      synopsis: anime.synopsis || '',
      episodes: anime.episodes !== undefined ? anime.episodes : '',
      rating: anime.rating !== undefined ? anime.rating : '',
      cover: anime.cover || ''
    })
    setErrors({})
    setShowModal(true)
  }

  function handleClose() {
    setShowModal(false)
    setEditingAnime(null)
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

    const newErrors = {}
    if (!formData.title || !formData.title.trim()) {
      newErrors.title = 'El título es obligatorio'
    }
    if (!formData.season || !formData.season.trim()) {
      newErrors.season = 'La temporada es obligatoria'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingAnime) {
      onEdit({ ...editingAnime, ...formData })
    } else {
      onAdd(formData)
    }
    handleClose()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Text variant="h4">Catálogo de Anime</Text>
        <Button variant="danger" onClick={handleOpenAdd}>+ Agregar Anime</Button>
      </div>

      <Table responsive className="avantflix-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Temporada</th>
            <th>Episodios</th>
            <th>Rating</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {animes.map(function (anime) {
            return (
              <tr key={anime.id}>
                <td>{anime.id}</td>
                <td>{anime.title}</td>
                <td>
                  <Badge variant="danger" className="avantflix-badge-season">
                    {anime.season}
                  </Badge>
                </td>
                <td>{anime.episodes}</td>
                <td style={{ color: 'var(--color-accent)' }}>★ {anime.rating}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-light" onClick={() => handleOpenEdit(anime)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => onDelete(anime.id)}>
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
            {editingAnime ? 'Editar Anime' : 'Agregar Anime'}
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
              name="title"
              label="Título"
              placeholder="Ej: Demon Slayer"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
            <Input
              name="season"
              label="Temporada"
              placeholder="Ej: Verano 2026"
              value={formData.season}
              onChange={handleChange}
              error={errors.season}
            />
            <Input
              name="synopsis"
              label="Sinopsis"
              placeholder="Descripción breve del anime"
              value={formData.synopsis}
              onChange={handleChange}
              error={errors.synopsis}
            />
            <Input
              name="episodes"
              label="Episodios"
              type="number"
              placeholder="Ej: 24"
              value={formData.episodes}
              onChange={handleChange}
              error={errors.episodes}
            />
            <Input
              name="rating"
              label="Rating (0-10)"
              type="number"
              placeholder="Ej: 9.2"
              value={formData.rating}
              onChange={handleChange}
              error={errors.rating}
            />
            <Input
              name="cover"
              label="URL de portada"
              placeholder="https://..."
              value={formData.cover}
              onChange={handleChange}
              error={errors.cover}
            />
            <Button type="submit" variant="danger" className="w-100 mt-2">
              {editingAnime ? 'Guardar cambios' : 'Agregar'}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AdminAnimeTable

