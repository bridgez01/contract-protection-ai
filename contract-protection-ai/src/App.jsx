import { useState } from 'react'
import './App.css'
import FileUpload from './FileUpload'
import Header from './Header'
import TextInput from './TextInput'
import AnalyzeButton from './AnalyzeButton'
import Results from './Results'
function App() {
  const [contractText, setContractText] = useState('')
  const [fileName, setFileName] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = ({ name, content }) => {
    setFileName(name)
    setContractText(content)
  }

  const handleAnalyze = async () => {
    if (!contractText.trim()) return

    setLoading(true)
    
    // Mock analysis - will replace with real API later
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
      <Header />
      
      <main>
        <div className="input-section">
          <FileUpload 
            onFileUpload={handleFileUpload} 
            fileName={fileName} 
          />

          <div className="or-divider">OR</div>

          <TextInput 
            value={contractText} 
            onChange={setContractText} 
          />
          
          <AnalyzeButton 
            onAnalyze={handleAnalyze}
            onClear={clearAll}
            loading={loading}
            showClear={!!contractText}
            contractText={contractText}
          />
        </div>

        <Results analysis={analysis} />
      </main>
    </div>
  )
}

export default App