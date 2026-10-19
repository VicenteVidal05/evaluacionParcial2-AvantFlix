import AdminSidebar from '../components/organisms/AdminSidebar'
import AdminAnimeTable from '../components/organisms/AdminAnimeTable'

function AdminAnime({ animes, onAdd, onEdit, onDelete }) {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 flex-grow-1" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="container-fluid">
          <AdminAnimeTable
            animes={animes}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminAnime

