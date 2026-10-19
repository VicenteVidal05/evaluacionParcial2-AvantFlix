import { useParams, useNavigate } from 'react-router-dom'
import blogPosts from '../data/blogPosts'
import Image from '../components/atoms/Image'
import Text from '../components/atoms/Text'
import Button from '../components/atoms/Button'
import Badge from '../components/atoms/Badge'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = blogPosts.find(function (p) {
    return p.id === Number(id)
  })

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <Text variant="h3" className="text-muted mb-4">Artículo no encontrado</Text>
        <Button variant="danger" onClick={() => navigate('/blog')}>
          Volver al Blog
        </Button>
      </div>
    )
  }

  function handleBack() {
    navigate(-1)
  }

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <Button variant="outline-light" onClick={handleBack} className="mb-4">
        ← Volver
      </Button>
      <Badge variant="secondary" className="mb-3">
        {post.category}
      </Badge>
      <Text variant="h1" className="mb-3">
        {post.title}
      </Text>
      <div className="d-flex gap-3 text-muted small mb-4">
        <Text variant="span">Por {post.author}</Text>
        <Text variant="span">•</Text>
        <Text variant="span">{post.date}</Text>
      </div>
      <Image
        src={post.image}
        alt={post.title}
        style={{ borderRadius: '8px', width: '100%', marginBottom: '2rem' }}
      />
      <Text variant="p" className="lead mb-4" style={{ color: 'var(--color-text-muted)' }}>
        {post.excerpt}
      </Text>
      <Text variant="p" style={{ lineHeight: '1.8' }}>
        {post.content}
      </Text>
    </div>
  )
}

export default BlogDetail

