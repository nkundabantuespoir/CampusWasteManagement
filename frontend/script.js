
/* ==========================================
   CAMPUS WASTE MANAGEMENT SYSTEM
   JAVASCRIPT NAVIGATION
   ========================================== */


/* 1. Select all navigation links from the sidebar */
const navigationLinks = document.querySelectorAll(".nav-link");


/* 2. Select the main page heading */
const pageTitle = document.getElementById("pageTitle");


/* 3. Select the main welcome content area */
const welcomeMessage = document.querySelector(".welcome-message");


/* 4. Store the content for each dashboard section */
const pages = {

    // Dashboard welcome page
    dashboard: {
        title: "Welcome to the Dashboard",

        content: `
            <h3>Welcome to Campus Waste Management</h3>

            <p>
                This system helps manage campus users, locations,
                waste collection schedules and waste reports in one place.
            </p>

            <p>
                Use the navigation menu on the left to access
                the different management sections.
            </p>
        `
    },


    
        
// Users management page
users: {
    title: "User Management",

    content: `
        <!-- Main users management container -->
        <div class="management-section">

            <!-- Page introduction -->
            <div class="management-header">
                <div>
                    <h3>Manage Campus Users</h3>
                    <p>View and manage registered campus users.</p>
                </div>

                <!-- Button for adding a new user -->
                <button id="addUserBtn" class="primary-btn">
                    + Add New User
                </button>
            </div>

            <!-- Users data table -->
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <!-- JavaScript will insert MongoDB records here -->
                    <tbody id="usersTableBody">
                        <tr>
                            <td colspan="5">Loading users...</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    `
},



    // Campus locations page
    
locations: {

    // Page title displayed when Locations is selected
    title: "Location Management",

    // HTML content displayed inside the main dashboard
    content: `

        <!-- Main locations management section -->
        <div class="management-section">

            <!-- Heading and introduction -->
            <div class="management-header">
                <div>
                    <h3>Manage Campus Locations</h3>
                    <p>View and manage registered campus locations.</p>
                </div>

                <!-- Button for registering a new location -->
                <button id="addLocationBtn" class="primary-btn">
                    + Add New Location
                </button>
            </div>

            <!-- Container for the locations table -->
            <div class="table-container">

                <table>

                    <!-- Table headings -->
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Name</th>
                            <th>Building Type</th>
                            <th>Waste Bin Count</th>
                            <th>Area</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <!-- JavaScript will insert MongoDB records here -->
                    <tbody id="locationsTableBody">

                        <tr>
                            <td colspan="6">Loading locations...</td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    `
},



    // Collection schedules page
   
    // Collection schedules page
    schedules: {
        title: "Collection Schedules",

        content: `
            <!-- Main schedules management container -->
            <div class="management-section">

                <!-- Page heading and introduction -->
                <div class="management-header">
                    <div>
                        <h3>Manage Collection Schedules</h3>
                        <p>View and manage campus waste collection schedules.</p>
                    </div>

                    <!-- Button for adding a new schedule -->
                    <button id="addScheduleBtn" class="primary-btn">
                        + Add New Schedule
                    </button>
                </div>

                <!-- Collection schedules data table -->
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Schedule ID</th>
                                <th>Location ID</th>
                                <th>Assigned Staff</th>
                                <th>Collection Date</th>
                                <th>Collection Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <!-- JavaScript will insert MongoDB records here -->
                        <tbody id="schedulesTableBody">
                            <tr>
                                <td colspan="7">Loading schedules...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        `
    },



   
    // Waste Reports page
    reports: {
        title: "Waste Reports",

        content: `
            <div class="management-section">

                <div class="management-header">
                    <div>
                        <h3>Manage Waste Reports</h3>
                        <p>View and manage campus waste reports.</p>
                    </div>

                    <button id="addReportBtn" class="primary-btn">
                        + Add New Report
                    </button>
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Reported By</th>
                                <th>Location ID</th>
                                <th>Waste Type</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Date Reported</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody id="reportsTableBody">
                            <tr>
                                <td colspan="8">
                                    Loading waste reports...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        `
    },


};


/* ==========================================
   LOAD USERS FROM MONGODB
   ========================================== */

// This function retrieves users from our backend
async function loadUsers() {

    // Find the table body where users will appear
    const tableBody = document.getElementById("usersTableBody");

    try {

        // Send a GET request to the backend
        const response = await fetch(
            "https://campus-waste-management-api-bro7.onrender.com/api/users"
        );

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error("Failed to retrieve users");
        }

        // Convert the response into JavaScript data
        const users = await response.json();

        // Clear the loading message
        tableBody.innerHTML = "";

        // Check whether any users were returned
        if (users.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5">No users found.</td>
                </tr>
            `;
            return;
        }

        // Display each user in the table
        users.forEach(user => {

            const row = document.createElement("tr");

            // Add the user's information
            [user.user_id, user.name, user.role, user.contact]
                .forEach(value => {

                    const cell = document.createElement("td");
                    cell.textContent = value ?? "";
                    row.appendChild(cell);

                });

           
// Create the Actions column
const actionsCell = document.createElement("td");

// Create the Edit button
const editButton = document.createElement("button");

editButton.textContent = "Edit";
editButton.className = "edit-btn";

// Open the editing form when clicked
editButton.addEventListener("click", function() {
    showEditUserForm(user);
});

// Create the Delete button
const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";
deleteButton.className = "delete-btn";


// ==========================================
// DELETE USER FROM MONGODB
// ==========================================

// Run this code when the Delete button is clicked
deleteButton.addEventListener("click", async function() {

    // Ask the administrator to confirm deletion
    const confirmDelete = confirm(
        `Are you sure you want to delete ${user.name}?`
    );

    // Stop if the administrator selects Cancel
    if (!confirmDelete) {
        return;
    }

    try {

        // Send the DELETE request to our backend
        const response = await fetch(
            `https://campus-waste-management-api-bro7.onrender.com/api/users/${user._id}`,
            {
                method: "DELETE"
            }
        );

        // Read the server response
        const result = await response.json();

        // Check for errors
        if (!response.ok) {
            throw new Error(result.message || "Unable to delete user");
        }

        // Show success message
        alert("User deleted successfully!");

        // Refresh the users table from MongoDB
        loadUsers();

    } catch (error) {

        // Display any errors
        alert("Error: " + error.message);

        console.error("Delete user error:", error);

    }

});



// ==========================================
// DELETE USER FROM MONGODB
// ==========================================

// Handle the Delete button click
deleteButton.addEventListener("click", async function() {

    // Ask for confirmation before deleting the user
    const confirmDelete = confirm(
        `Are you sure you want to delete ${user.name}?`
    );

    // Stop if the administrator cancels
    if (!confirmDelete) {
        return;
    }

    try {

        // Send a DELETE request to the backend
        const response = await fetch(
            `https://campus-waste-management-api-bro7.onrender.com/api/users/${user._id}`,
            {
                method: "DELETE"
            }
        );

        // Read the backend response
        const result = await response.json();

        // Check whether deletion was successful
        if (!response.ok) {
            throw new Error(result.message || "Unable to delete user");
        }

        // Inform the administrator
        alert("User deleted successfully!");

        // Reload users from MongoDB
        loadUsers();

    } catch (error) {

        // Display any errors
        alert("Error: " + error.message);

        console.error("Delete user error:", error);

    }

});


// Add both buttons to the Actions column
actionsCell.appendChild(editButton);
actionsCell.appendChild(document.createTextNode(" "));
actionsCell.appendChild(deleteButton);

// Add the Actions column to the row
row.appendChild(actionsCell);


            // Add the row to the table
            tableBody.appendChild(row);

        });

    } catch (error) {

        // Display errors in the browser console
        console.error("Users loading error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load users.
                </td>
            </tr>
        `;
    }
}


// ==========================================
// LOAD LOCATIONS FROM MONGODB
// ==========================================

// This function retrieves all campus locations
async function loadLocations() {

    // Find the table body where locations will appear
    const tableBody = document.getElementById("locationsTableBody");

    // Stop if the Locations table is not currently displayed
    if (!tableBody) {
        return;
    }

    // Display a loading message while retrieving records
    tableBody.innerHTML = `
        <tr>
            <td colspan="6">Loading locations...</td>
        </tr>
    `;

    try {

        // Send a GET request to retrieve locations from MongoDB
        const response = await fetch(
            "https://campus-waste-management-api-bro7.onrender.com/api/locations"
        );

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error("Unable to retrieve locations");
        }

        // Convert the server response into JavaScript data
        const locations = await response.json();

        // Clear the loading message
        tableBody.innerHTML = "";

        // Check whether any locations were returned
        if (locations.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6">No locations found.</td>
                </tr>
            `;

            return;
        }

        // Loop through every location returned by MongoDB
        locations.forEach(location => {

            // Create a new table row
            const row = document.createElement("tr");

            // These are the five location fields to display
            const locationValues = [
                location.location_id,
                location.name,
                location.building_type,
                location.waste_bin_count,
                location.area
            ];

            // Insert each location value into its own table cell
            locationValues.forEach(value => {

                const cell = document.createElement("td");

                cell.textContent = value ?? "";

                row.appendChild(cell);

            });

           
// ==========================================
// CREATE EDIT AND DELETE BUTTONS
// ==========================================

// Create the Actions column
const actionsCell = document.createElement("td");

// Create the Edit button
const editButton = document.createElement("button");

editButton.textContent = "Edit";
editButton.className = "edit-btn";

// Open the location editing form when clicked
editButton.addEventListener("click", function() {

    // Pass the selected location to the editing function
    showEditLocationForm(location);

});

// Create the Delete button
const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";
deleteButton.className = "delete-btn";

// Delete the selected location when clicked
deleteButton.addEventListener("click", async function() {

    // Ask for confirmation before deleting
    const confirmDelete = confirm(
        `Are you sure you want to delete ${location.name}?`
    );

    // Stop if the administrator selects Cancel
    if (!confirmDelete) {
        return;
    }

    try {

        // Send a DELETE request to the backend
        const response = await fetch(
            `https://campus-waste-management-api-bro7.onrender.com/api/locations/${location._id}`,
            {
                method: "DELETE"
            }
        );

        // Read the server response
        const result = await response.json();

        // Check whether deletion was successful
        if (!response.ok) {
            throw new Error(
                result.message || "Unable to delete location"
            );
        }

        // Inform the administrator
        alert("Location deleted successfully!");

        // Reload the locations table
        loadLocations();

    } catch (error) {

        // Display any errors
        alert("Error: " + error.message);

        console.error("Delete location error:", error);

    }

});

// Add both buttons to the Actions column
actionsCell.appendChild(editButton);

actionsCell.appendChild(
    document.createTextNode(" | ")
);

actionsCell.appendChild(deleteButton);

// Add the Actions column to the row
row.appendChild(actionsCell);


            // Add the completed row to the Locations table
            tableBody.appendChild(row);

        });

    } catch (error) {

        // Display errors in the browser console
        console.error("Locations loading error:", error);

        // Inform the administrator if locations cannot be loaded
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">Unable to load locations.</td>
            </tr>
        `;

    }

}



// ==========================================
// LOAD COLLECTION SCHEDULES FROM MONGODB
// ==========================================

// This function retrieves all campus collection schedules
async function loadSchedules() {

    // Find the schedules table body
    const tableBody = document.getElementById("schedulesTableBody");

    // Stop if the schedules table does not exist
    if (!tableBody) {
        return;
    }

    // Display a loading message
    tableBody.innerHTML = `
        <tr>
            <td colspan="7">Loading schedules...</td>
        </tr>
    `;

    try {

        // Request all schedules from the backend
        const response = await fetch(
            "https://campus-waste-management-api-bro7.onrender.com/api/schedules"
        );

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error("Unable to retrieve collection schedules.");
        }

        // Convert the response into JavaScript data
        const schedules = await response.json();

        // Clear the loading message
        tableBody.innerHTML = "";

        // Check whether any schedules exist
        if (!Array.isArray(schedules) || schedules.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7">No collection schedules found.</td>
                </tr>
            `;

            return;
        }

        // Display every schedule in the table
        schedules.forEach(schedule => {

            // Create a new table row
            const row = document.createElement("tr");

            // Prepare the collection date for display
            const collectionDate = schedule.collection_date
                ? new Date(schedule.collection_date).toLocaleDateString()
                : "";

            // Collect the schedule information
            const values = [
                schedule.schedule_id,
                schedule.location_id,
                schedule.assigned_to,
                collectionDate,
                schedule.collection_time,
                schedule.status
            ];

            // Create a table cell for each schedule field
            values.forEach(value => {

                const cell = document.createElement("td");

                cell.textContent = value ?? "";

                row.appendChild(cell);

            });

            // Create the Actions column
            const actionsCell = document.createElement("td");

            // Temporary placeholder for Edit and Delete
            
// ==========================================
// CREATE EDIT BUTTON FOR SCHEDULE
// ==========================================

const editButton = document.createElement("button");

editButton.textContent = "Edit";

editButton.className = "edit-btn";

// Open the editing form when clicked
editButton.addEventListener("click", function() {

    // Pass the selected schedule to the editing function
    showEditScheduleForm(schedule);

});

// Add the Edit button to the Actions column
actionsCell.appendChild(editButton);


// ==========================================
// CREATE DELETE BUTTON FOR SCHEDULE
// ==========================================

const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";

deleteButton.className = "delete-btn";

// Delete the selected schedule when clicked
deleteButton.addEventListener("click", async function() {

    // Ask the administrator for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete this collection schedule?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        // Send DELETE request to MongoDB backend
        const response = await fetch(
            `https://campus-waste-management-api-bro7.onrender.com/api/schedules/${schedule._id}`,
            {
                method: "DELETE"
            }
        );

        // Read the server response
        const result = await response.json();

        // Check whether deletion was successful
        if (!response.ok) {
            throw new Error(
                result.message || "Unable to delete schedule"
            );
        }

        // Inform the administrator
        alert("Collection schedule deleted successfully!");

        // Reload schedules from MongoDB
        loadSchedules();

    } catch (error) {

        alert("Error: " + error.message);

        console.error("Schedule deletion error:", error);

    }

});

// Add Delete button to the Actions column
actionsCell.appendChild(deleteButton);



            row.appendChild(actionsCell);

            // Add the completed row to the schedules table
            tableBody.appendChild(row);

        });

    } catch (error) {

        // Display errors in the browser console
        console.error("Schedules loading error:", error);

        // Inform the administrator
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Unable to load collection schedules.</td>
            </tr>
        `;

    }

}


// ==========================================
// LOAD WASTE REPORTS FROM MONGODB
// ==========================================

async function loadReports() {

    const tableBody = document.getElementById("reportsTableBody");

    if (!tableBody) {
        console.error("Reports table body not found!");
        return;
    }

    try {

        // Retrieve reports from MongoDB
        const response = await fetch(
            "https://campus-waste-management-api-bro7.onrender.com/api/reports"
        );

        if (!response.ok) {
            throw new Error("Unable to load waste reports");
        }

        const reports = await response.json();

        // Clear existing table rows
        tableBody.innerHTML = "";

        if (reports.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8">No waste reports found.</td>
                </tr>
            `;

            return;
        }

        // Display each waste report
        reports.forEach(report => {

            const row = document.createElement("tr");

            const values = [
                report.report_id,
                report.reported_by,
                report.location_id,
                report.waste_type,
                report.description,
                report.status,
                report.date_reported
                    ? new Date(report.date_reported).toLocaleDateString()
                    : ""
            ];

            values.forEach(value => {

                const cell = document.createElement("td");

                cell.textContent = value ?? "";

                row.appendChild(cell);

            });

            // Create Actions column
            const actionsCell = document.createElement("td");

            
            // Create Edit button
            const editButton = document.createElement("button");

            editButton.textContent = "Edit";
            editButton.className = "edit-btn";

            editButton.addEventListener("click", function() {
                showEditReportForm(report);
            });

            // Create Delete button
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", async function() {

                const confirmDelete = confirm(
                    "Are you sure you want to delete this waste report?"
                );

                if (!confirmDelete) {
                    return;
                }

                try {

                    const response = await fetch(
`https://campus-waste-management-api-bro7.onrender.com/api/reports/${report._id}`,                        {
                            method: "DELETE"
                        }
                    );

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result.message || "Unable to delete report"
                        );
                    }

                    alert("Waste report deleted successfully!");

                    loadReports();

                } catch (error) {

                    alert("Error: " + error.message);

                    console.error("Report deletion error:", error);

                }

            });

            // Add buttons to Actions column
            actionsCell.appendChild(editButton);

            actionsCell.appendChild(
                document.createTextNode(" ")
            );

            actionsCell.appendChild(deleteButton);

            // Add Actions column to row
            row.appendChild(actionsCell);


            tableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Reports loading error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">Unable to load waste reports.</td>
            </tr>
        `;

    }

}



// ==========================================
// ADD NEW COLLECTION SCHEDULE TO MONGODB
// ==========================================

// This function displays the schedule registration form
function showAddScheduleForm() {

    // Display the schedule registration form
    welcomeMessage.innerHTML = `

        <div class="management-section">

            <h3>Register New Collection Schedule</h3>

            <!-- Form for registering a new schedule -->
            <form id="addScheduleForm">

                <!-- Schedule ID -->
                <label>Schedule ID</label>
                <input
                    type="text"
                    id="scheduleId"
                    placeholder="Example: S006"
                    required
                >

                <!-- Campus Location ID -->
                <label>Location ID</label>
                <input
                    type="text"
                    id="scheduleLocationId"
                    placeholder="Example: L001"
                    required
                >

                <!-- Assigned staff member -->
                <label>Assigned Staff</label>
                <input
                    type="text"
                    id="assignedStaff"
                    placeholder="Enter staff name"
                    required
                >

                <!-- Collection date -->
                <label>Collection Date</label>
                <input
                    type="date"
                    id="collectionDate"
                    required
                >

                <!-- Collection time -->
                <label>Collection Time</label>
                <input
                    type="time"
                    id="collectionTime"
                    required
                >

                <!-- Collection status -->
                <label>Status</label>
                <select id="scheduleStatus" required>
                    <option value="">Select status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <!-- Form buttons -->
                <button type="submit" class="primary-btn">
                    Save Schedule
                </button>

                <button type="button" id="cancelScheduleBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Find the schedule registration form
    const form = document.getElementById("addScheduleForm");

    // Handle schedule form submission
    form.addEventListener("submit", async function(event) {

        // Prevent the browser from refreshing
        event.preventDefault();

        // Collect the schedule information
        const newSchedule = {

            schedule_id:
                document.getElementById("scheduleId").value,

            location_id:
                document.getElementById("scheduleLocationId").value,

            assigned_to:
                document.getElementById("assignedStaff").value,

            collection_date:
                document.getElementById("collectionDate").value,

            collection_time:
                document.getElementById("collectionTime").value,

            status:
                document.getElementById("scheduleStatus").value

        };

        try {

            // Send the new schedule to the backend
            const response = await fetch(
                "https://campus-waste-management-api-bro7.onrender.com/api/schedules",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(newSchedule)
                }
            );

            // Read the server response
            const result = await response.json();

            // Check whether the schedule was saved
            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to save schedule"
                );
            }

            // Inform the administrator
            alert("Collection schedule saved successfully!");

            // Return to the schedules management page
            welcomeMessage.innerHTML = pages.schedules.content;

            // Reload schedules from MongoDB
            loadSchedules();

        } catch (error) {

            // Display errors
            alert("Error: " + error.message);

            console.error("Schedule registration error:", error);

        }

    });

    // Return to schedules when Cancel is clicked
    document.getElementById("cancelScheduleBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.schedules.content;

            loadSchedules();

        });

}


// ==========================================
// EDIT EXISTING COLLECTION SCHEDULE
// ==========================================

// This function displays the schedule editing form
function showEditScheduleForm(schedule) {

    // Display the selected schedule's editing form
    welcomeMessage.innerHTML = `

        <div class="management-section">

            <h3>Edit Collection Schedule</h3>

            <!-- Form for updating collection schedule -->
            <form id="editScheduleForm">

                <label>Schedule ID</label>
                <input type="text" id="editScheduleId" required>

                <label>Location ID</label>
                <input type="text" id="editScheduleLocationId" required>

                <label>Assigned Staff</label>
                <input type="text" id="editAssignedStaff" required>

                <label>Collection Date</label>
                <input type="date" id="editCollectionDate" required>

                <label>Collection Time</label>
                <input type="time" id="editCollectionTime" required>

                <label>Status</label>
                <select id="editScheduleStatus" required>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <!-- Buttons for updating or cancelling -->
                <button type="submit" class="primary-btn">
                    Update Schedule
                </button>

                <button type="button" id="cancelEditScheduleBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Fill the form with existing schedule information
    document.getElementById("editScheduleId").value =
        schedule.schedule_id || "";

    document.getElementById("editScheduleLocationId").value =
        schedule.location_id || "";

    document.getElementById("editAssignedStaff").value =
        schedule.assigned_to || "";

    // Format the existing collection date for the date input
    if (schedule.collection_date) {

        const date = new Date(schedule.collection_date);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        document.getElementById("editCollectionDate").value =
            `${year}-${month}-${day}`;

    }

    document.getElementById("editCollectionTime").value =
        schedule.collection_time || "";

    document.getElementById("editScheduleStatus").value =
        schedule.status || "Scheduled";

    // Find the editing form
    const form = document.getElementById("editScheduleForm");

    // Handle the form submission
    form.addEventListener("submit", async function(event) {

        // Prevent the browser from refreshing
        event.preventDefault();

        // Collect the updated schedule information
        const updatedSchedule = {

            schedule_id:
                document.getElementById("editScheduleId").value,

            location_id:
                document.getElementById("editScheduleLocationId").value,

            assigned_to:
                document.getElementById("editAssignedStaff").value,

            collection_date:
                document.getElementById("editCollectionDate").value,

            collection_time:
                document.getElementById("editCollectionTime").value,

            status:
                document.getElementById("editScheduleStatus").value

        };

        try {

            // Send the updated schedule to the backend
            const response = await fetch(
                `https://campus-waste-management-api-bro7.onrender.com/api/schedules/${schedule._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedSchedule)
                }
            );

            // Read the server response
            const result = await response.json();

            // Check whether the update was successful
            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to update schedule"
                );
            }

            // Inform the administrator
            alert("Collection schedule updated successfully!");

            // Return to the schedules page
            welcomeMessage.innerHTML = pages.schedules.content;

            // Reload schedules from MongoDB
            loadSchedules();

        } catch (error) {

            // Display errors
            alert("Error: " + error.message);

            console.error("Schedule update error:", error);

        }

    });

    // Return to schedules when Cancel is clicked
    document.getElementById("cancelEditScheduleBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.schedules.content;

            loadSchedules();

        });

}


// ==========================================
// ADD NEW WASTE REPORT TO MONGODB
// ==========================================

function showAddReportForm() {

    welcomeMessage.innerHTML = `
        <div class="management-section">
            <h3>Register New Waste Report</h3>

            <form id="addReportForm">

                <label>Report ID</label>
                <input type="text" id="reportId"
                    placeholder="Example: WR006" required>

                <label>Reported By (User ID)</label>
                <input type="text" id="reportedBy"
                    placeholder="Example: U001" required>

                <label>Location ID</label>
                <input type="text" id="reportLocationId"
                    placeholder="Example: L001" required>

                <label>Waste Type</label>
                <input type="text" id="wasteType"
                    placeholder="Example: Plastic" required>

                <label>Description</label>
                <textarea id="reportDescription"
                    required></textarea>

                <label>Status</label>
                <select id="reportStatus" required>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>

                <label>Date Reported</label>
                <input type="date" id="dateReported" required>

                <button type="submit" class="primary-btn">
                    Save Report
                </button>

                <button type="button" id="cancelReportBtn">
                    Cancel
                </button>

            </form>
        </div>
    `;

    const form = document.getElementById("addReportForm");

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const newReport = {
            report_id: document.getElementById("reportId").value,
            reported_by: document.getElementById("reportedBy").value,
            location_id: document.getElementById("reportLocationId").value,
            waste_type: document.getElementById("wasteType").value,
            description: document.getElementById("reportDescription").value,
            status: document.getElementById("reportStatus").value,
            date_reported: document.getElementById("dateReported").value
        };

        try {

            const response = await fetch(
                "https://campus-waste-management-api-bro7.onrender.com/api/reports",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newReport)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to save report");
            }

            alert("Waste report saved successfully!");

            welcomeMessage.innerHTML = pages.reports.content;

            loadReports();

        } catch (error) {

            alert("Error: " + error.message);

            console.error("Report registration error:", error);

        }

    });

    document.getElementById("cancelReportBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.reports.content;

            loadReports();

        });

}



 // ==========================================
 // EDIT EXISTING WASTE REPORT
 // ==========================================

function showEditReportForm(report) {

    welcomeMessage.innerHTML = `
        <div class="management-section">

            <h3>Edit Waste Report</h3>

            <form id="editReportForm">

                <label>Report ID</label>
                <input type="text" id="editReportId"
                    value="${report.report_id}" readonly>

                <label>Reported By</label>
                <input type="text" id="editReportedBy"
                    value="${report.reported_by}" required>

                <label>Location ID</label>
                <input type="text" id="editReportLocation"
                    value="${report.location_id}" required>

                <label>Waste Type</label>
                <input type="text" id="editWasteType"
                    value="${report.waste_type}" required>

                <label>Description</label>
                <textarea id="editReportDescription"
                    required>${report.description}</textarea>

                <label>Status</label>
                <select id="editReportStatus" required>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Under Review">Under Review</option>
                </select>

                <label>Date Reported</label>
                <input type="date" id="editDateReported" required>

                <br><br>

                <button type="submit" class="primary-btn">
                    Update Report
                </button>

                <button type="button" id="cancelEditReportBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Set existing status and date
    document.getElementById("editReportStatus").value =
        report.status;

    document.getElementById("editDateReported").value =
        report.date_reported
            ? new Date(report.date_reported).toISOString().split("T")[0]
            : "";

    // Handle report update
    document.getElementById("editReportForm")
        .addEventListener("submit", async function(event) {

        event.preventDefault();

        const reportData = {
            reported_by: document.getElementById("editReportedBy").value.trim(),
            location_id: document.getElementById("editReportLocation").value.trim(),
            waste_type: document.getElementById("editWasteType").value.trim(),
            description: document.getElementById("editReportDescription").value.trim(),
            status: document.getElementById("editReportStatus").value,
            date_reported: document.getElementById("editDateReported").value
        };

        try {

            const response = await fetch(
                `https://campus-waste-management-api-bro7.onrender.com/api/reports/${report._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reportData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to update report");
            }

            alert("Waste report updated successfully!");

            welcomeMessage.innerHTML = pages.reports.content;

            loadReports();

        } catch (error) {

            alert("Error: " + error.message);

            console.error("Report update error:", error);

        }

    });

    // Cancel editing
    document.getElementById("cancelEditReportBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.reports.content;

            loadReports();

        });

}



// ==========================================
// ADD NEW LOCATION TO MONGODB
// ==========================================

// This function displays a form for registering a location
function showAddLocationForm() {

    // Display the location registration form
    welcomeMessage.innerHTML = `
        <div class="management-section">

            <h3>Register New Campus Location</h3>

            <!-- Form for entering location information -->
            <form id="addLocationForm">

                <label>Location ID</label>
                <input type="text" name="location_id"
                    placeholder="Example: L006" required>

                <label>Location Name</label>
                <input type="text" name="name"
                    placeholder="Enter location name" required>

                <label>Building Type</label>
                <input type="text" name="building_type"
                    placeholder="Example: Library" required>

                <label>Waste Bin Count</label>
                <input type="number" name="waste_bin_count"
                    min="0" placeholder="Enter number of bins" required>

                <label>Area</label>
                <input type="text" name="area"
                    placeholder="Example: Central Campus" required>

                <!-- Save and Cancel buttons -->
                <button type="submit" class="primary-btn">
                    Save Location
                </button>

                <button type="button" id="cancelLocationBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Select the newly created form
    const form = document.getElementById("addLocationForm");

    // Handle form submission
    form.addEventListener("submit", async function(event) {

        // Prevent the browser from refreshing
        event.preventDefault();

        // Collect information entered by the administrator
        const formData = new FormData(form);

        const locationData = Object.fromEntries(formData.entries());

        // Convert the waste bin count into a number
        locationData.waste_bin_count =
            Number(locationData.waste_bin_count);

        try {

            // Send the new location to the backend
            const response = await fetch(
                "https://campus-waste-management-api-bro7.onrender.com/api/locations",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(locationData)
                }
            );

            // Read the server response
            const result = await response.json();

            // Check whether the location was created
            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to create location"
                );
            }

            // Inform the administrator
            alert("Location created successfully!");

            // Return to the Locations page
            welcomeMessage.innerHTML = pages.locations.content;

            // Reload locations from MongoDB
            loadLocations();

        } catch (error) {

            // Display any errors
            alert("Error: " + error.message);

            console.error("Create location error:", error);

        }

    });

    // Return to Locations when Cancel is clicked
    document.getElementById("cancelLocationBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.locations.content;

            loadLocations();

        });

}



// ==========================================
// EDIT EXISTING CAMPUS LOCATION
// ==========================================

// This function displays the editing form
function showEditLocationForm(location) {

    // Display the form with the selected location
    welcomeMessage.innerHTML = `

        <div class="management-section">

            <h3>Edit Campus Location</h3>

            <!-- Form for updating location information -->
            <form id="editLocationForm">

                <label>Location ID</label>
                <input type="text" id="editLocationId" required>

                <label>Location Name</label>
                <input type="text" id="editLocationName" required>

                <label>Building Type</label>
                <input type="text" id="editBuildingType" required>

                <label>Waste Bin Count</label>
                <input type="number" id="editWasteBinCount"
                    min="0" required>

                <label>Area</label>
                <input type="text" id="editLocationArea" required>

                <!-- Save changes and Cancel buttons -->
                <button type="submit" class="primary-btn">
                    Update Location
                </button>

                <button type="button" id="cancelEditLocationBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Fill the form with the existing location information
    document.getElementById("editLocationId").value =
        location.location_id || "";

    document.getElementById("editLocationName").value =
        location.name || "";

    document.getElementById("editBuildingType").value =
        location.building_type || "";

    document.getElementById("editWasteBinCount").value =
        location.waste_bin_count ?? 0;

    document.getElementById("editLocationArea").value =
        location.area || "";

    // Find the editing form
    const form = document.getElementById("editLocationForm");

    // Handle the form submission
    form.addEventListener("submit", async function(event) {

        // Prevent the browser from refreshing
        event.preventDefault();

        // Collect the updated location information
        const updatedLocation = {
            location_id: document.getElementById("editLocationId").value,
            name: document.getElementById("editLocationName").value,
            building_type: document.getElementById("editBuildingType").value,
            waste_bin_count: Number(
                document.getElementById("editWasteBinCount").value
            ),
            area: document.getElementById("editLocationArea").value
        };

        try {

            // Send the updated information to MongoDB through Express
            const response = await fetch(
                `https://campus-waste-management-api-bro7.onrender.com/api/locations/${location._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedLocation)
                }
            );

            // Read the server response
            const result = await response.json();

            // Check whether the update was successful
            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to update location"
                );
            }

            // Display a success message
            alert("Location updated successfully!");

            // Return to the Locations management page
            welcomeMessage.innerHTML = pages.locations.content;

            // Reload the updated records from MongoDB
            loadLocations();

        } catch (error) {

            // Display any errors
            alert("Error: " + error.message);

            console.error("Update location error:", error);

        }

    });

    // Return to Locations when Cancel is clicked
    document.getElementById("cancelEditLocationBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.locations.content;

            loadLocations();

        });

}


// ==========================================
// ADD NEW USER TO MONGODB
// ==========================================

// This function displays a form for registering a new user
function showAddUserForm() {

    // Display the user registration form
    welcomeMessage.innerHTML = `
        <div class="management-section">

            <h3>Register New Campus User</h3>

            <!-- Form for entering new user information -->
            <form id="addUserForm">

                <label>User ID</label>
                <input type="text" name="user_id"
                       placeholder="Example: U006" required>

                <label>Full Name</label>
                <input type="text" name="name"
                       placeholder="Enter full name" required>

                <label>Role</label>
                <select name="role" required>
                    <option value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Sanitation Staff">Sanitation Staff</option>
                </select>

                <label>Contact / Email</label>
                <input type="email" name="contact"
                       placeholder="Enter email address" required>

                <!-- Submit and cancel buttons -->
                <button type="submit" class="primary-btn">
                    Save User
                </button>

                <button type="button" id="cancelUserBtn">
                    Cancel
                </button>

            </form>

        </div>
    `;

    // Select the form we have just created
    const form = document.getElementById("addUserForm");

    // Handle submission of the new user form
    form.addEventListener("submit", async function(event) {

        // Prevent the browser from refreshing the page
        event.preventDefault();

        // Collect the values entered into the form
        const formData = new FormData(form);

        const userData = Object.fromEntries(formData.entries());

        try {

            // Send the new user information to the backend
            const response = await fetch(
                "https://campus-waste-management-api-bro7.onrender.com/api/users",
                {
                    method: "POST",

                    // Tell Express that we are sending JSON
                    headers: {
                        "Content-Type": "application/json"
                    },

                    // Convert the user information into JSON
                    body: JSON.stringify(userData)
                }
            );

            // Read the response from the backend
            const result = await response.json();

            // Check whether the user was successfully created
            if (!response.ok) {
                throw new Error(result.message || "Unable to create user");
            }

            // Inform the administrator of success
            alert("User created successfully!");

            // Return to the Users page and reload database records
            pageTitle.textContent = "User Management";

            welcomeMessage.innerHTML = pages.users.content;

            loadUsers();

        } catch (error) {

            // Display an error if registration fails
            alert("Error: " + error.message);

            console.error("Create user error:", error);

        }

    });

    // Return to the Users page when Cancel is clicked
    document.getElementById("cancelUserBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.users.content;

            loadUsers();

        });

}

// ==========================================
// EDIT EXISTING USER
// ==========================================

// This function displays the editing form
function showEditUserForm(user) {

    // Display the selected user's current information
    welcomeMessage.innerHTML = `
        <div class="management-section">

            <h3>Edit Campus User</h3>

            <!-- Form containing the existing user details -->
            <form id="editUserForm">

                <label>User ID</label>
                <input type="text" value="${user.user_id}" disabled>

                <label>Full Name</label>
                <input type="text" name="name"
                    value="${user.name}" required>

                <label>Role</label>
                <select name="role" required>
                    <option value="Student"
                        ${user.role === "Student" ? "selected" : ""}>
                        Student
                    </option>

                    <option value="Supervisor"
                        ${user.role === "Supervisor" ? "selected" : ""}>
                        Supervisor
                    </option>

                    <option value="Sanitation Staff"
                        ${user.role === "Sanitation Staff" ? "selected" : ""}>
                        Sanitation Staff
                    </option>
                </select>

                <label>Contact / Email</label>
                <input type="email" name="contact"
                    value="${user.contact}" required>

                <button type="submit" class="primary-btn">
                    Update User
                </button>

                <button type="button" id="cancelEditBtn">
                    Cancel
                </button>

            </form>
        </div>
    `;

    // Select the editing form
    const form = document.getElementById("editUserForm");

    // Handle the form submission
    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        // Collect the updated information
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        try {

            // Send updated information to the backend
            const response = await fetch(
                `https://campus-waste-management-api-bro7.onrender.com/api/users/${user._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Update failed");
            }

            alert("User updated successfully!");

            // Return to the Users table
            welcomeMessage.innerHTML = pages.users.content;
            pageTitle.textContent = "User Management";

            // Reload the latest database records
            loadUsers();

        } catch (error) {

            alert("Error: " + error.message);
            console.error("Update user error:", error);

        }

    });

    // Cancel editing and return to the Users table
    document.getElementById("cancelEditBtn")
        .addEventListener("click", function() {

            welcomeMessage.innerHTML = pages.users.content;
            loadUsers();

        });

}


/* 5. Add a click event to every sidebar navigation link */
navigationLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        // Prevent the browser from reloading the page
        event.preventDefault();

        // Get the name of the selected page
        const selectedPage = this.dataset.page;

        // Find the content belonging to that page
        const page = pages[selectedPage];

        // Stop if the requested page does not exist
        if (!page) {
            return;
        }

        // Change the main heading
        pageTitle.textContent = page.title;

        // Display the selected page content
        welcomeMessage.innerHTML = page.content;
// Load MongoDB users when the Users menu is clicked
if (selectedPage === "users") {
    loadUsers();
}


// Load MongoDB locations when the Locations menu is clicked
if (selectedPage === "locations") {

    // Retrieve and display locations from MongoDB
    loadLocations();

    // Connect the Add New Location button to its form
const addLocationButton =
    document.getElementById("addLocationBtn");

// Open the registration form when clicked
if (addLocationButton) {
    addLocationButton.addEventListener("click", showAddLocationForm);
}

}


// ==========================================
// LOAD COLLECTION SCHEDULES FROM MONGODB
// ==========================================

// Check whether the administrator selected Schedules

// ==========================================
// LOAD AND CONNECT COLLECTION SCHEDULES
// ==========================================

// Check whether the administrator selected Schedules
if (selectedPage === "schedules") {

    // Retrieve and display schedules from MongoDB
    loadSchedules();

    // Find the Add New Schedule button
    const addScheduleButton =
        document.getElementById("addScheduleBtn");

    // Connect the button to the registration form
    if (addScheduleButton) {

        addScheduleButton.addEventListener("click", function() {

            // Display the new schedule registration form
            showAddScheduleForm();

        });

    }

}

// Load MongoDB waste reports
if (selectedPage === "reports") {
    loadReports();
}


    // Connect the Add New Report button
    if (selectedPage === "reports") {

        const addReportButton =
            document.getElementById("addReportBtn");

        if (addReportButton) {

            addReportButton.addEventListener("click", function() {

                showAddReportForm();

            });

        }
    }



// Connect the Add New User button to its form
if (selectedPage === "users") {

    const addButton = document.getElementById("addUserBtn");

    addButton.addEventListener("click", showAddUserForm);

}


    // Connect the Add New Report button
    if (selectedPage === "reports") {

        const addReportButton =
            document.getElementById("addReportBtn");

        if (addReportButton) {

            addReportButton.addEventListener(
                "click",
                showAddReportForm
            );

        }
    }


        // Remove the active highlight from all menu links
        navigationLinks.forEach(item => {
            item.classList.remove("active");
        });

        // Highlight the currently selected menu link
        this.classList.add("active");

    });

});
