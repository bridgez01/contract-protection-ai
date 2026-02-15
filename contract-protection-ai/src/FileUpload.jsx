function FileUpload({ onFileUpload, fileName }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      onFileUpload({
        name: file.name,
        content: event.target.result
      })
    }
    reader.readAsText(file)
  }

  return (
    <div className="upload-area">
      <label className="file-label">
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="file-input"
        />
        <span className="file-button">CHOOSE FILE</span>
      </label>
      {fileName && (
        <span className="file-name">{fileName}</span>
      )}
    </div>
  )
}

export default FileUpload