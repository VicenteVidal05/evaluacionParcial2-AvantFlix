import Badge from '../atoms/Badge'
import Text from '../atoms/Text'

function AnimeInfo({ season = '', title = '', synopsis = '', rating = null }) {
  return (
    <div className="p-3">
      <Badge variant="danger" className="mb-2 avantflix-badge-season">
        {season}
      </Badge>
      <Text variant="h5" className="mb-1">{title}</Text>
      <Text variant="p" className="text-muted small mb-2">{synopsis}</Text>
      {rating && (
        <Text variant="span" className="fw-bold" style={{ color: 'var(--color-accent)' }}>
          ★ {rating}
        </Text>
      )}
    </div>
  )
}

export default AnimeInfo

