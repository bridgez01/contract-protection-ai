function Results({ analysis }) {
  if (!analysis) return null

  return (
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
  )
}

export default Results