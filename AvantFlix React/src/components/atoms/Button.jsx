function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) {
  const btnClass = 'btn btn-' + variant + (className ? ' ' + className : '')

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button

