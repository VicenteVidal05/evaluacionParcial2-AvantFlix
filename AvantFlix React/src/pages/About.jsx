import Text from '../components/atoms/Text'
import Image from '../components/atoms/Image'

function About() {
  return (
    <div className="container py-5">
      <Text variant="h2" className="avantflix-section-title mb-4">
        Sobre AvantFlix
      </Text>
      <div className="row g-5 align-items-center mb-5">
        <div className="col-md-6">
          <Text variant="h3" className="mb-3">Nuestra Misión</Text>
          <Text variant="p" className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
            AvantFlix nació como una respuesta a la necesidad de la comunidad otaku en Latinoamérica de contar con una plataforma unificada: streaming en alta fidelidad y una tienda con mercancía 100% original y licenciada.
          </Text>
          <Text variant="p" className="text-muted" style={{ lineHeight: '1.7' }}>
            Trabajamos directamente con distribuidores oficiales en Japón y las principales editoriales para asegurar que cada manga, figura y accesorio que llega a tus manos cumpla con los estándares más exigentes de autenticidad y calidad.
          </Text>
        </div>
        <div className="col-md-6">
          <Image
            src="https://placehold.co/600x400/1a1a1a/e50914?text=AvantFlix+HQ"
            alt="AvantFlix Headquarters"
            style={{ borderRadius: '8px', width: '100%' }}
          />
        </div>
      </div>
      <div className="row g-4 text-center mt-3">
        <div className="col-md-4">
          <div className="p-4" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <Text variant="h4" style={{ color: 'var(--color-primary)' }} className="mb-2">+100</Text>
            <Text variant="h6" className="mb-2">Títulos en Transmisión</Text>
            <Text variant="p" className="text-muted small">Simulcasts y clásicos actualizados cada temporada.</Text>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <Text variant="h4" style={{ color: 'var(--color-primary)' }} className="mb-2">100%</Text>
            <Text variant="h6" className="mb-2">Merchandising Oficial</Text>
            <Text variant="p" className="text-muted small">Certificados de autenticidad en todas las figuras.</Text>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4" style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <Text variant="h4" style={{ color: 'var(--color-primary)' }} className="mb-2">Envío Rápido</Text>
            <Text variant="h6" className="mb-2">Cobertura Nacional</Text>
            <Text variant="p" className="text-muted small">Entregas con seguimiento detallado en tiempo real.</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

