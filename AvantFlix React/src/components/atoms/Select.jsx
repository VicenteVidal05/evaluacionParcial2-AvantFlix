function Select({
  name,
  value,
  onChange,
  label,
  options = [],
  className = '',
  error,
  disabled = false,
  required = false
}) {
  const errorMessage = typeof error === 'string' ? error : (error && error.message ? error.message : '')
  const hasError = Boolean(errorMessage)
  const selectClass = 'form-select ' + (hasError ? 'is-invalid ' : '') + className

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select
        name={name}
        value={value !== undefined ? value : ''}
        onChange={onChange}
        className={selectClass.trim()}
        disabled={disabled}
        required={required}
      >
        <option value="">Seleccionar...</option>
        {options && options.map(function (opt) {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        })}
      </select>
      {hasError && (
        <div className="invalid-feedback d-block">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

export default Select

