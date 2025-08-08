import React, { useState, useEffect } from 'react';

const UpdateModal = ({ destination, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    destination: '',
    continent: '',
    budget: '',
    mustSeePlaces: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const continents = [
    'Asia',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Australia',
    'Antarctica'
  ];

  useEffect(() => {
    if (destination) {
      setFormData({
        destination: destination.destination || '',
        continent: destination.continent || '',
        budget: destination.budget || '',
        mustSeePlaces: destination.mustSeePlaces || ''
      });
    }
  }, [destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onUpdate(destination._id, {
        ...formData,
        budget: parseFloat(formData.budget)
      });
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!destination) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">✏️ Update Destination</h2>
          <button 
            type="button" 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="update-destination">Destination Name *</label>
            <input
              type="text"
              id="update-destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="e.g., Paris, Tokyo, New York"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-continent">Continent *</label>
            <select
              id="update-continent"
              name="continent"
              value={formData.continent}
              onChange={handleChange}
              className="form-control"
              required
              disabled={isSubmitting}
            >
              <option value="">Select a continent</option>
              {continents.map(continent => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="update-budget">Budget (USD) *</label>
            <input
              type="number"
              id="update-budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-control"
              required
              min="0"
              step="0.01"
              placeholder="e.g., 1500.00"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-mustSeePlaces">Must-See Places</label>
            <textarea
              id="update-mustSeePlaces"
              name="mustSeePlaces"
              value={formData.mustSeePlaces}
              onChange={handleChange}
              className="form-control"
              rows="3"
              placeholder="e.g., Eiffel Tower, Louvre Museum, Notre-Dame"
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-warning" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : '💾 Update Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
