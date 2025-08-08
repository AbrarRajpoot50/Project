# Travel Planner Application


Module Title: Programming for Information Systems  
Module Code: B9IS123_2425_TMD1S  
Module Lecturer: Paul Laird  
Programme/Cohort: MSc Information Systems with Computing  
Method of Assessment: Project/Report  


Name: Muhammad Abrar  
Student Id: 20037095  

## Project Overview

The Travel Planner is a modern web application designed to help users manage their travel destinations. Built with a React frontend and Express.js backend, it provides a complete CRUD (Create, Read, Update, Delete) interface for managing travel plans.

## Features

### Frontend (React)
- Modern React Interface: Built with React 18 and functional components
- Responsive Design: Mobile-first design that works on all devices
- Real-time Updates: Instant UI updates after each operation
- Interactive Forms: Add and edit destinations with validation
- Advanced Filtering: Search by name and filter by continent
- Visual Statistics: Dashboard showing travel statistics and budget summaries
- Modal Dialogs: Clean update interface with modal dialogs

### Backend (Express.js + MongoDB)
- RESTful API: Clean API endpoints for all CRUD operations
- MongoDB Integration: Robust data persistence with MongoDB
- Data Validation: Server-side validation for all inputs
- Error Handling: Comprehensive error handling with meaningful messages
- CORS Support: Cross-origin resource sharing enabled
- Reporting: Advanced reporting with budget calculations

### Key Functionalities
1. Add Destinations: Create new travel destinations with budget and must-see places
2. View Destinations: Browse all destinations with filtering capabilities
3. Update Destinations: Edit existing destination details
4. Mark as Visited: Track which destinations have been visited
5. Delete Destinations: Remove destinations from the list
6. Filter & Search: Find destinations by name or continent
7. Travel Statistics: View comprehensive travel and budget reports

## Technology Stack

### Frontend
- React 18: Modern JavaScript library for building user interfaces
- Axios: HTTP client for API communication
- CSS3: Modern styling with gradients and animations
- Responsive Design: Mobile-first approach

### Backend
- Node.js: JavaScript runtime environment
- Express.js: Web application framework
- MongoDB: NoSQL database for data storage
- Mongoose: MongoDB object modeling library
- CORS: Cross-Origin Resource Sharing middleware

## Project Structure

```
Project/
├── backend/
│   ├── server.js              # Express server and API routes
│   └── destinations.json      # Legacy JSON data file
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── DestinationForm.js
│   │   │   ├── DestinationList.js
│   │   │   ├── FilterSection.js
│   │   │   ├── ReportSection.js
│   │   │   └── UpdateModal.js
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Application styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   └── package.json           # Frontend dependencies
├── package.json               # Root dependencies and scripts
└── README.md                  # Project documentation
```

## API Endpoints

### Destinations
- `GET /destinations` - Retrieve all destinations (with optional search and continent filters)
- `POST /destinations` - Add a new destination
- `PUT /destinations/:id` - Update an existing destination
- `DELETE /destinations/:id` - Delete a destination

### Reporting
- `GET /report` - Get travel statistics and budget summary

### Health Check
- `GET /health` - API health check

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Project
   ```

2. Install root dependencies
   ```bash
   npm install
   ```

3. Install frontend dependencies
   ```bash
   npm run install-client
   ```

4. Start MongoDB
   - For local MongoDB: Start the MongoDB service
   - For MongoDB Atlas: Update the connection string in `backend/server.js`

5. Run the application
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev

   # Or run separately:
   # Backend only
   npm run server

   # Frontend only (in another terminal)
   npm run client
   ```

6. Access the application
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## Usage Guide

### Adding a Destination
1. Fill in the "Add New Destination" form
2. Provide destination name, continent, budget, and must-see places
3. Click "Add Destination" to save

### Managing Destinations
- View: All destinations are displayed in a card layout
- Filter: Use the search bar or continent dropdown to filter
- Edit: Click the "Edit" button on any destination card
- Mark Visited: Click "Mark Visited" to track completed trips
- Delete: Click "Delete" to remove a destination (with confirmation)

### Viewing Statistics
The dashboard automatically shows:
- Total number of destinations
- Visited vs. unvisited destinations
- Total and average budget calculations

## Database Schema

### Destinations Collection
```javascript
{
  _id: ObjectId,
  destination: String,      // Destination name
  continent: String,        // Continent name
  budget: Number,          // Budget in USD
  mustSeePlaces: String,   // Must-see places description
  visited: Boolean,        // Visit status
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

## Development Features

### Error Handling
- Comprehensive client-side and server-side error handling
- User-friendly error messages
- Input validation on both frontend and backend

### Performance
- Efficient API calls with proper loading states
- Optimized React rendering with proper state management
- Responsive design for all screen sizes

### Code Quality
- Modern ES6+ JavaScript
- Component-based React architecture
- Clean separation of concerns
- RESTful API design patterns

## Future Enhancements

1. Authentication: User login and registration system
2. Image Upload: Photo gallery for destinations
3. Trip Planning: Detailed itinerary planning features
4. Social Features: Share destinations with friends
5. Maps Integration: Interactive maps with destination markers
6. Expense Tracking: Detailed budget breakdown and expense tracking
7. Offline Support: Progressive Web App capabilities

## Troubleshooting

### Common Issues
1. MongoDB Connection: Ensure MongoDB is running and connection string is correct
2. Port Conflicts: Default ports are 3000 (backend) and 3001 (frontend)
3. CORS Issues: Backend includes CORS middleware for development
4. Module Not Found: Run `npm install` in both root and frontend directories

### Development Commands
```bash
# Install all dependencies
npm install && npm run install-client

# Start development environment
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Conclusion

This Travel Planner application demonstrates a complete full-stack web development approach using modern technologies. The React frontend provides an intuitive user interface while the Express.js backend with MongoDB ensures robust data management. The application successfully implements all CRUD operations with additional features like filtering, search, and comprehensive reporting.

The modular architecture makes it easy to extend and maintain, while the responsive design ensures accessibility across all devices. This project showcases proficiency in modern web development practices and technologies.
