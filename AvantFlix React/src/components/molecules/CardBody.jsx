import Image from '../atoms/Image'
import Text from '../atoms/Text'

function CardBody({ imageSrc = '', imageAlt = '', title = '', description = '', children }) {
  return (
    <div>
      <Image src={imageSrc} alt={imageAlt} />
      <div className="p-3">
        {title && <Text variant="h5" className="mb-1">{title}</Text>}
        {description && (
          <Text variant="p" className="text-muted small mb-2">{description}</Text>
        )}
        {children}
      </div>
    </div>
  )
}

export default CardBody

