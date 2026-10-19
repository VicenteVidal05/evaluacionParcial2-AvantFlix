function Spinner({ variant = 'light', size = '' }) {
  let spinnerClass = 'spinner-border text-' + variant
  if (size === 'sm') {
    spinnerClass += ' spinner-border-sm'
  }

  return (
    <div className={spinnerClass} role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  )
}

export default Spinner

