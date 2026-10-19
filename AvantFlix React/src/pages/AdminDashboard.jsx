import AdminSidebar from '../components/organisms/AdminSidebar'
import KpiCard from '../components/molecules/KpiCard'
import Text from '../components/atoms/Text'
import users from '../data/users'

function AdminDashboard({ animes = [], products = [] }) {
  const totalAnimes = animes.length
  const totalProducts = products.length

  // Filtrado simple de productos con stock crítico (5 o menos)
  const criticalStockProducts = products.filter(function (p) {
    return p.stock <= 5
  })

  const totalUsers = users.length

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="p-4 flex-grow-1" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="container-fluid">
          <Text variant="h2" className="avantflix-section-title mb-4">
            Panel de Métricas (KPIs)
          </Text>
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <KpiCard value={totalAnimes} label="Series en Catálogo" />
            </div>
            <div className="col-md-3">
              <KpiCard value={totalProducts} label="Productos en Inventario" />
            </div>
            <div className="col-md-3">
              <KpiCard
                value={criticalStockProducts.length}
                label="Productos Stock Crítico"
                colorClass="text-warning"
              />
            </div>
            <div className="col-md-3">
              <KpiCard value={totalUsers} label="Usuarios Registrados" />
            </div>
          </div>

          <Text variant="h4" className="avantflix-section-title mb-3">
            Alertas de Inventario Crítico
          </Text>
          {criticalStockProducts.length === 0 ? (
            <Text variant="p" className="text-muted">
              No hay productos con stock crítico en este momento.
            </Text>
          ) : (
            <div className="p-3" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              {criticalStockProducts.map(function (p) {
                return (
                  <div key={p.id} className="d-flex justify-content-between align-items-center py-2 border-bottom border-secondary">
                    <Text variant="span">{p.name}</Text>
                    <Text variant="span" className="fw-bold" style={{ color: p.stock === 0 ? 'var(--color-primary)' : 'var(--color-accent)' }}>
                      {p.stock === 0 ? 'Sin existencias' : `${p.stock} disponibles`}
                    </Text>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

