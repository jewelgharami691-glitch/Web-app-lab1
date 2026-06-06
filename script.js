// 1. Element Selectors
const projectForm = document.getElementById('projectForm');
const projectNameInput = document.getElementById('projectName');
const projectTechSelect = document.getElementById('projectTech');
const tableBody = document.getElementById('tableBody');

// Error Selectors
const nameError = document.getElementById('nameError');
const techError = document.getElementById('techError');

// 2. Event Listener for Form Submission
projectForm.addEventListener('submit', function (event) {
    // Prevent the default browser page refresh behavior
    event.preventDefault();

    // Fetch values and clear whitespace trailing ends
    const nameValue = projectNameInput.value.trim();
    const techValue = projectTechSelect.value;

    let isValid = true;

    // 3. Form Validation Logic
    if (nameValue === '') {
        nameError.textContent = 'Project Title is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    if (techValue === '') {
        techError.textContent = 'Please select a core technology platform.';
        isValid = false;
    } else {
        techError.textContent = '';
    }

    // 4. DOM Manipulation: If Valid, Add to Table View
    if (isValid) {
        addProjectToTable(nameValue, techValue);
        
        // Form Reset utility
        projectForm.reset();
    }
});

// 5. Function to dynamically build and insert structural elements
function addProjectToTable(name, tech) {
    // Create container row element
    const row = document.createElement('tr');

    // Create custom structural columns
    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const techCell = document.createElement('td');
    techCell.textContent = tech;

    const statusCell = document.createElement('td');
    statusCell.innerHTML = `<span class="status-badge">Active</span>`;

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Dismiss';
    deleteBtn.className = 'action-btn';
    
    // Attach click cleanup listener instance straight to item row target
    deleteBtn.addEventListener('click', function () {
        row.remove();
    });

    actionCell.appendChild(deleteBtn);

    // Append table record elements explicitly to the wrapper row container
    row.appendChild(nameCell);
    row.appendChild(techCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    // Inject row sequence element records into active UI body view
    tableBody.appendChild(row);
}