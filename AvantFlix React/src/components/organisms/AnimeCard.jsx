import { useNavigate } from 'react-router-dom'
import CardBody from '../molecules/CardBody'
import AnimeInfo from '../molecules/AnimeInfo'
import Button from '../atoms/Button'

function AnimeCard({ anime }) {
  const navigate = useNavigate()

  if (!anime) {
    return null
  }

  function handleDetail() {
    navigate('/anime/' + anime.id)
  }

  return (
    <div className="card avantflix-card h-100">
      <CardBody imageSrc={anime.cover} imageAlt={anime.title}>
        <AnimeInfo
          season={anime.season}
          title={anime.title}
          synopsis={anime.synopsis}
          rating={anime.rating}
        />
        <div className="px-3 pb-3">
          <Button variant="danger" onClick={handleDetail} className="w-100">
            ▶ Ver episodios
          </Button>
        </div>
      </CardBody>
    </div>
  )
}

export default AnimeCard

