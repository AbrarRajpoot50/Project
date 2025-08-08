import React from 'react';

const FilterSection = ({ filters, onFilterChange, onApplyFilters }) => {
  const continents = [
    'Asia',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Australia',
    'Antarctica'
  ];

  const handleSearchChange = (e) => {
    const newFilters = { ...filters, search: e.target.value };
    onFilterChange(newFilters);
  };

  const handleContinentChange = (e) => {
    const newFilters = { ...filters, continent: e.target.value };
    onFilterChange(newFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onApplyFilters();
    }
  };

  const clearFilters = () => {
    onFilterChange({ search: '', continent: '' });
    setTimeout(onApplyFilters, 0);
  };

  return (
    <div className="card">
      <h2 className="section-title">🔍 Filter Destinations</h2>
      <div className="filter-section">
        <div className="form-group">
          <label htmlFor="search">Search by Name</label>
          <input
            type="text"
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="form-control"
            placeholder="Search destinations..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="continent-filter">Filter by Continent</label>
          <select
            id="continent-filter"
            value={filters.continent}
            onChange={handleContinentChange}
            className="form-control"
          >
            <option value="">All Continents</option>
            {continents.map(continent => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', gap: '10px', marginTop: '32px' }}>
            <button 
              type="button" 
              onClick={onApplyFilters}
              className="btn btn-primary"
            >
              🔍 Apply Filters
            </button>
            <button 
              type="button" 
              onClick={clearFilters}
              className="btn btn-warning"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
