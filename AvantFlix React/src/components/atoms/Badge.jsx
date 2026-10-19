function Badge({ children, variant = 'primary', className = '' }) {
  const badgeClass = 'badge bg-' + variant + (className ? ' ' + className : '')

  return (
    <span className={badgeClass}>
      {children}
    </span>
  )
}

export default Badge

