function TextInput({ value, onChange }) {
  return (
    <textarea
      className="contract-input"
      rows="8"
      placeholder="PASTE CONTRACT HERE..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default TextInput