function TextArea({
  name,
  value,
  onChange,
  label,
  placeholder = '',
  rows = 3,
  className = '',
  error,
  disabled = false,
  required = false
}) {
  const errorMessage = typeof error === 'string' ? error : (error && error.message ? error.message : '')
  const hasError = Boolean(errorMessage)
  const textareaClass = 'form-control ' + (hasError ? 'is-invalid ' : '') + className

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <textarea
        name={name}
        value={value !== undefined ? value : ''}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={textareaClass.trim()}
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

export default TextArea

