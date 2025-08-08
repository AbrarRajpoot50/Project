import React, { useState, useEffect } from 'react';
import './App.css';
import DestinationForm from './components/DestinationForm';
import DestinationList from './components/DestinationList';
import FilterSection from './components/FilterSection';
import ReportSection from './components/ReportSection';
import UpdateModal from './components/UpdateModal';
import { destinationService } from './services/api';

function App() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [destinationToUpdate, setDestinationToUpdate] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    continent: ''
  });

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await destinationService.getDestinations(filters.search, filters.continent);
      setDestinations(data);
      setFilteredDestinations(data);
    } catch (err) {
      setError('Failed to fetch destinations. Please try again.');
      console.error('Error fetching destinations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch report
  const fetchReport = async () => {
    try {
      const reportData = await destinationService.getReport();
      setReport(reportData);
    } catch (err) {
      console.error('Error fetching report:', err);
    }
  };

  // Add destination
  const handleAddDestination = async (newDestination) => {
    try {
      setError('');
      await destinationService.addDestination(newDestination);
      await fetchDestinations();
      await fetchReport();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Destination already exists. Please choose a different name.');
      } else {
        setError('Failed to add destination. Please try again.');
      }
      throw err;
    }
  };

  // Update destination
  const handleUpdateDestination = async (id, updates) => {
    try {
      setError('');
      await destinationService.updateDestination(id, updates);
      await fetchDestinations();
      await fetchReport();
      setUpdateModalOpen(false);
      setDestinationToUpdate(null);
    } catch (err) {
      setError('Failed to update destination. Please try again.');
      throw err;
    }
  };

  // Delete destination
  const handleDeleteDestination = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        setError('');
        await destinationService.deleteDestination(id);
        await fetchDestinations();
        await fetchReport();
      } catch (err) {
        setError('Failed to delete destination. Please try again.');
      }
    }
  };

  // Mark as visited
  const handleMarkVisited = async (id) => {
    try {
      setError('');
      await destinationService.updateDestination(id, { visited: true });
      await fetchDestinations();
      await fetchReport();
    } catch (err) {
      setError('Failed to mark destination as visited. Please try again.');
    }
  };

  // Open update modal
  const handleEditDestination = (destination) => {
    setDestinationToUpdate(destination);
    setUpdateModalOpen(true);
  };

  // Handle filters
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters
  const applyFilters = () => {
    fetchDestinations();
  };

  // Initial load
  useEffect(() => {
    fetchDestinations();
    fetchReport();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>🌍 Travel Planner</h1>
          <p>Plan and manage your travel destinations</p>
        </header>

        {error && <div className="error-message">{error}</div>}

        <DestinationForm 
          onAddDestination={handleAddDestination}
          loading={loading}
        />

        <FilterSection 
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
        />

        <ReportSection report={report} />

        {loading ? (
          <div className="loading">Loading destinations...</div>
        ) : (
          <DestinationList
            destinations={filteredDestinations}
            onEdit={handleEditDestination}
            onDelete={handleDeleteDestination}
            onMarkVisited={handleMarkVisited}
          />
        )}

        {updateModalOpen && (
          <UpdateModal
            destination={destinationToUpdate}
            onUpdate={handleUpdateDestination}
            onClose={() => {
              setUpdateModalOpen(false);
              setDestinationToUpdate(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
