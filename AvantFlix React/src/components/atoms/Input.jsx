function Input({
  type = 'text',
  name,
  value,
  onChange,
  onKeyDown,
  label,
  placeholder = '',
  className = '',
  error,
  disabled = false,
  required = false
}) {
  const errorMessage = typeof error === 'string' ? error : (error && error.message ? error.message : '')
  const hasError = Boolean(errorMessage)
  const inputClass = 'form-control ' + (hasError ? 'is-invalid ' : '') + className

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        name={name}
        value={value !== undefined ? value : ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={inputClass.trim()}
        disabled={disabled}
        required={required}
      />
      {hasError && (
        <div className="invalid-feedback d-block">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Input

