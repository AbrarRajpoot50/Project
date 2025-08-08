import React from 'react';

const DestinationList = ({ destinations, onEdit, onDelete, onMarkVisited }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  if (!destinations || destinations.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>🌍 No Destinations Found</h3>
          <p>Start planning your next adventure by adding a destination above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="section-title">🗺️ Your Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div 
            key={destination._id} 
            className={`destination-card ${destination.visited ? 'visited' : ''}`}
          >
            <div className="destination-header">
              <div>
                <h3 className="destination-title">{destination.destination}</h3>
                <span className="destination-continent">{destination.continent}</span>
              </div>
              {destination.visited && (
                <div className="visited-badge">
                  ✅ Visited
                </div>
              )}
            </div>

            <div className="destination-info">
              <div className="destination-budget">
                💰 Budget: {formatCurrency(destination.budget)}
              </div>
              {destination.mustSeePlaces && (
                <div className="destination-places">
                  <strong>📍 Must-see places:</strong><br />
                  {destination.mustSeePlaces}
                </div>
              )}
            </div>

            <div className="destination-actions">
              {!destination.visited && (
                <button
                  onClick={() => onMarkVisited(destination._id)}
                  className="btn btn-success btn-sm"
                  title="Mark as visited"
                >
                  ✅ Mark Visited
                </button>
              )}
              <button
                onClick={() => onEdit(destination)}
                className="btn btn-warning btn-sm"
                title="Edit destination"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete(destination._id)}
                className="btn btn-danger btn-sm"
                title="Delete destination"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationList;
