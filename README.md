Item	Description
Module Title:	Programming for Information Systems
Module Code:	B9IS123_2425_TMD1S
Module Lecturer (s):	Paul Laird
Programme/Cohort:	MSc Information Systems with Computing
Method of Assessment:	 Project/Report
Percentage (%) Weighting:	 70%
Individual/Group:	 Individual
Submission Date:	 12 December, 2024
Feedback Date:	Week 14
Feedback Strategy :	Moodle


Name: Muhammad Abrar
Student Id:20037095
Travel Planner Project Documentation
Overview
The Travel Planner is a web-based application designed to manage travel destinations. Users can add, update, mark as visited, and delete travel destinations. The project uses HTML and CSS for the frontend and Node.js with Express for the backend. A JSON file is used as the database.
Features
1. Frontend:
- Input fields for `Destination`, `Continent`, `Budget`, and `Must-see Places`.
- A form to add destinations.
- Buttons to mark destinations as visited, update, or delete them.
- Filter dropdown for continents.
2. Backend (Node.js & Express):
- GET: Retrieve all destinations.
- POST: Add a new destination.
- PUT: Update an existing destination.
- DELETE: Remove a destination.
3. Database: JSON file (`destinations.json`) is used to store and manipulate data.
Backend Code Explanation
Key Components
1. Dependencies:
- `express`: Handles HTTP requests and routing.
- `fs`: Reads and writes to the JSON database.
- `cors`: Enables cross-origin requests.
- `path`: Manages file paths.
2. File Helpers:
- `readFile(file)`: Reads and parses JSON data.
- `writeFile(file, data)`: Updates the JSON file with formatted data.
API Endpoints
- GET /destinations
  - Retrieves the list of destinations.
  - Response: Array of destinations in JSON format.
-POST /destinations
  Adds a new destination with a unique ID and default `visited: false`.
  Body: `{ destination, continent, budget, mustSeePlaces }`.
  Response: Newly added destination.
- PUT /destinations/:id
  - Updates a destination by ID.
  - Body: `{ updated fields }`.
  - Response: Updated destination.
- DELETE /destinations/:id:
  - Deletes a destination by ID.
  - Response: No content (204).
Example JSON Database Structure
{
  "id": 1695916583000,
  "destination": "Paris",
  "continent": "Europe",
  "budget": 1500,
  "mustSeePlaces": "Eiffel Tower",
  "visited": false
}
Running the Project
1. Frontend:
   - Open the HTML file in a browser.
2. Backend:
   - Install dependencies: `npm install `.
   - Start the server: `node server.js`.
   - Access the API at `http://localhost:3000`.
3. Database:
   - Ensure `destinations.json` is in the project directory.
Notes
- All CRUD operations are implemented for seamless data manipulation.
- The app is designed for simplicity and scalability.
