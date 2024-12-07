const API_URL = "http://localhost:3000";

// DOM Elements
const destinationForm = document.getElementById("destination-form");
const destinationList = document.getElementById("destination-list");
const filterContinent = document.getElementById("filter-continent");

// Fetch and display destinations
async function loadDestinations() {
  const filter = filterContinent.value;
  const destinations = await fetch(`${API_URL}/destinations`).then((res) =>
    res.json()
  );
  const filteredDestinations = filter
    ? destinations.filter((d) => d.continent === filter)
    : destinations;

  destinationList.innerHTML = filteredDestinations
    .map(
      (d) => `
        <li class="${d.visited ? "visited" : ""}">
            <div>
                <strong>${d.name}</strong> (${d.continent})<br />
                Budget: $${d.budget || "N/A"}<br />
                Must-see: ${d.mustSee || "N/A"}
            </div>
            <div>
                <button class="mark-visited" onclick="markVisited(${d.id})">${
        d.visited ? "Visited" : "Mark Visited"
      }</button>
          <button onclick="updateDestination(${d.id})">Update</button>
                <button onclick="deleteDestination(${d.id})">Delete</button>
            </div>
        </li>
    `
    )
    .join("");
}

// Add a new destination
destinationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("destination-name").value;
  const continent = document.getElementById("continent").value;
  const budget = document.getElementById("budget").value;
  const mustSee = document.getElementById("must-see").value;

  await fetch(`${API_URL}/destinations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, continent, budget, mustSee }),
  });

  destinationForm.reset();
  loadDestinations();
});

let currentUpdateId = null;

// Open the modal with pre-filled data
function openModal(destination) {
  document.getElementById("update-name").value = destination.name;
  document.getElementById("update-budget").value = destination.budget || "";
  document.getElementById("update-must-see").value = destination.mustSee || "";
  document.getElementById("update-notes").value = destination.notes || "";
  currentUpdateId = destination.id;
  document.getElementById("update-modal").style.display = "flex";
}

// Close the modal
function closeModal() {
  document.getElementById("update-modal").style.display = "none";
}

// Handle update form submission
document.getElementById("update-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedDetails = {
    name: document.getElementById("update-name").value,
    budget: document.getElementById("update-budget").value,
    mustSee: document.getElementById("update-must-see").value,
    notes: document.getElementById("update-notes").value,
  };

  await fetch(`${API_URL}/destinations/${currentUpdateId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedDetails),
  });

  closeModal();
  loadDestinations();
});

// Trigger update functionality
async function updateDestination(id) {
  const destinations = await fetch(`${API_URL}/destinations`).then((res) =>
    res.json()
  );
  const destination = destinations.find((d) => d.id === id);
  openModal(destination);
}
// Mark a destination as visited
async function markVisited(id) {
  await fetch(`${API_URL}/destinations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visited: true }),
  });
  loadDestinations();
}

// Delete a destination
async function deleteDestination(id) {
  if (confirm("Are you sure you want to delete this destination?")) {
    await fetch(`${API_URL}/destinations/${id}`, { method: "DELETE" });
    loadDestinations();
  }
}

// Filter by continent
filterContinent.addEventListener("change", loadDestinations);

// Initial load
loadDestinations();
