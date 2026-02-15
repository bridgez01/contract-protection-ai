function AnalyzeButton({ 
  onAnalyze, 
  onClear, 
  loading, 
  showClear, 
  contractText 
}) {
  return (
    <>
      <div className="button-group">
        <button 
          className="analyze-btn"
          onClick={onAnalyze}
          disabled={loading || !contractText.trim()}
        >
          {loading ? 'ANALYZING...' : 'ANALYZE'}
        </button>
        
        {showClear && (
          <button 
            className="clear-btn"
            onClick={onClear}
          >
            CLEAR
          </button>
        )}
      </div>
    </>
  )
}

export default AnalyzeButton