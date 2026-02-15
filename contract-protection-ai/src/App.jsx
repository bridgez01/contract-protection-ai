import { useState } from 'react'
import Input from './Input';

function App() {
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <header>
        <h1>📄 Contract Protector</h1>
        <p>Paste your contract below to analyze risks</p>
      </header>

      <main>
        <Input/>
        
      </main>
    </div>
  );
}

export default App