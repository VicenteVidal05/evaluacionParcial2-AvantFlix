import Text from '../atoms/Text'

function KpiCard({ value = 0, label = '', colorClass = '' }) {
  const valueClass = colorClass ? 'kpi-value ' + colorClass : 'kpi-value'

  return (
    <div className="admin-kpi-card">
      <Text variant="p" className={valueClass}>{value}</Text>
      <Text variant="p" className="kpi-label">{label}</Text>
    </div>
  )
}

export default KpiCard

