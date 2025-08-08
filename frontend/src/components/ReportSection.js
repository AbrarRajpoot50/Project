import React from 'react';

const ReportSection = ({ report }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="card">
      <h2 className="section-title">📊 Travel Statistics</h2>
      <div className="report-grid">
        <div className="report-item">
          <div className="report-number">{report.totalDestinations || 0}</div>
          <div className="report-label">Total Destinations</div>
        </div>
        
        <div className="report-item">
          <div className="report-number">{report.visited || 0}</div>
          <div className="report-label">Visited</div>
        </div>
        
        <div className="report-item">
          <div className="report-number">{report.unvisited || 0}</div>
          <div className="report-label">Not Visited</div>
        </div>
        
        <div className="report-item">
          <div className="report-number">{formatCurrency(report.budgetSummary)}</div>
          <div className="report-label">Total Budget</div>
        </div>
        
        {report.averageBudget > 0 && (
          <div className="report-item">
            <div className="report-number">{formatCurrency(report.averageBudget)}</div>
            <div className="report-label">Average Budget</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportSection;
