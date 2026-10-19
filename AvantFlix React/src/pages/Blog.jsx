import { useState } from 'react'
import blogPosts from '../data/blogPosts'
import BlogCard from '../components/organisms/BlogCard'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = []
  blogPosts.forEach(function (post) {
    if (!categories.includes(post.category)) {
      categories.push(post.category)
    }
  })

  function handleCategoryFilter(cat) {
    if (selectedCategory === cat) {
      setSelectedCategory('')
    } else {
      setSelectedCategory(cat)
    }
  }

  function handleClearCategory() {
    setSelectedCategory('')
  }

  let posts = blogPosts
  if (selectedCategory) {
    posts = posts.filter(function (post) {
      return post.category === selectedCategory
    })
  }

  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">
        Blog y Noticias de Anime
      </Text>
      <div className="d-flex gap-2 flex-wrap mb-4">
        {categories.map(function (category) {
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'danger' : 'outline-secondary'}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Button>
          )
        })}
        {selectedCategory && (
          <Button variant="outline-light" onClick={handleClearCategory}>
            Ver todas ✕
          </Button>
        )}
      </div>
      <div className="row g-4">
        {posts.map(function (post) {
          return (
            <div key={post.id} className="col-md-6 col-lg-4">
              <BlogCard post={post} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Blog

