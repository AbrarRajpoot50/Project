import React, { useState } from 'react';

const DestinationForm = ({ onAddDestination, loading }) => {
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
      await onAddDestination({
        ...formData,
        budget: parseFloat(formData.budget)
      });
      // Reset form on success
      setFormData({
        destination: '',
        continent: '',
        budget: '',
        mustSeePlaces: ''
      });
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">✈️ Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">Destination Name *</label>
          <input
            type="text"
            id="destination"
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
          <label htmlFor="continent">Continent *</label>
          <select
            id="continent"
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
          <label htmlFor="budget">Budget (USD) *</label>
          <input
            type="number"
            id="budget"
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
          <label htmlFor="mustSeePlaces">Must-See Places</label>
          <textarea
            id="mustSeePlaces"
            name="mustSeePlaces"
            value={formData.mustSeePlaces}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="e.g., Eiffel Tower, Louvre Museum, Notre-Dame"
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting || loading}
        >
          {isSubmitting ? 'Adding...' : '🌟 Add Destination'}
        </button>
      </form>
    </div>
  );
};

export default DestinationForm;
