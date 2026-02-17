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
        if (!contractText.trim()) {
          alert('Please paste a contract or upload a file first')
          return
        }

        setLoading(true)
        
        try {
          const response = await fetch('https://contract-protection-ai-worker.ngwuemeka222.workers.dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contract: contractText })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to analyze')
          }

          const data = await response.json()
          setAnalysis(data)
        } catch (error) {
          console.error('Error:', error)
          alert('Failed to analyze contract. Make sure the Worker is running at http://localhost:8787')
        } finally {
          setLoading(false)
        }
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