import { useState } from 'react'
import './App.css'

function App() {
  const [contractText, setContractText] = useState('')
  const [fileName, setFileName] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    
    const reader = new FileReader()
    reader.onload = (event) => {
      setContractText(event.target.result)
    }
    reader.readAsText(file)
  }

  const handleAnalyze = async () => {
    if (!contractText.trim()) {
      alert('Please paste a contract or upload a file first')
      return
    }

    setLoading(true)
    
    // Mock analysis for now
    setTimeout(() => {
      setLoading(false)
      setAnalysis({
        summary: "12-month subscription agreement with automatic renewal.",
        redFlags: [
          "Auto-renews unless you cancel 60 days before",
          "They can change pricing with 30 days notice",
          "No refunds even if service is down"
        ],
        verdict: "⚠️ NEGOTIATE - Remove auto-renewal clause"
      })
    }, 2000)
  }

  const clearAll = () => {
    setContractText('')
    setFileName('')
    setAnalysis(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>CONTRACT PROTECTION</h1>
        <p className="subtitle">READS THE FINE PRINT SO YOU DON'T HAVE TO</p>
      </header>

      <main>
        <div className="input-section">
          <div className="upload-area">
            <label className="file-label">
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="file-input"
              />
              <span className="file-button">CHOOSE FILE</span>
            </label>
            {fileName && (
              <span className="file-name">{fileName}</span>
            )}
          </div>

          <div className="or-divider">OR</div>

          <textarea
            className="contract-input"
            rows="8"
            placeholder="PASTE CONTRACT OR T&C HERE"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
          />
          
          <div className="button-group">
            <button 
              className="analyze-btn"
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? 'ANALYZING...' : 'ANALYZE'}
            </button>
            
            {contractText && (
              <button 
                className="clear-btn"
                onClick={clearAll}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {analysis && (
          <div className="results-section">
            <h2>RESULTS</h2>
            
            <div className="result-block">
              <h3>SUMMARY</h3>
              <p>{analysis.summary}</p>
            </div>

            <div className="result-block">
              <h3>RED FLAGS</h3>
              <ul>
                {analysis.redFlags.map((flag, index) => (
                  <li key={index}>→ {flag}</li>
                ))}
              </ul>
            </div>

            <div className="result-block verdict">
              <h3>VERDICT</h3>
              <p>{analysis.verdict}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App