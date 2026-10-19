import { useNavigate } from 'react-router-dom'
import CardBody from '../molecules/CardBody'
import Badge from '../atoms/Badge'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function BlogCard({ post }) {
  const navigate = useNavigate()

  if (!post) {
    return null
  }

  function handleReadMore() {
    navigate('/blog/' + post.id)
  }

  return (
    <div className="card avantflix-card h-100">
      <CardBody
        imageSrc={post.image}
        imageAlt={post.title}
        title={post.title}
        description={post.excerpt}
      >
        <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
          <Badge variant="secondary">{post.category}</Badge>
          <Text variant="span" className="text-muted small">{post.date}</Text>
        </div>
        <Text variant="p" className="text-muted small mb-3">
          Por {post.author}
        </Text>
        <Button variant="outline-light" onClick={handleReadMore} className="w-100">
          Leer más →
        </Button>
      </CardBody>
    </div>
  )
}

export default BlogCard

