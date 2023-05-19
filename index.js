// Get the input element and attach an event listener for input changes
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', filterEmployees);

// Get the select element and attach an event listener for changes
const designationFilter = document.getElementById('designationFilter');
designationFilter.addEventListener('change', filterEmployees);

function filterEmployees() {
    const searchQuery = searchInput.value.toLowerCase();
    const designationValue = designationFilter.value.toLowerCase();
    const employeeCards = document.querySelectorAll('.employee-card');

    employeeCards.forEach(card => {
        const employeeName = card.querySelector('.employee-name').textContent.toLowerCase();
        const employeeDesignation = card.querySelector('.designation').textContent.toLowerCase();

        const isNameMatch = employeeName.includes(searchQuery);
        const isDesignationMatch = designationValue === '' || employeeDesignation.includes(designationValue);

        if (isNameMatch && isDesignationMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to fetch data from the API
function fetchData() {
    fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.log(error));
}

// Function to display the fetched data
function displayData(data) {
    var employees = data.employees;

    employees.forEach(function (employee) {
        var employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';
        console.log(employee.length)

        var employeeName = document.createElement('div');
        employeeName.className = 'employee-name';
        employeeName.textContent = 'Employee Name: ' + employee.name;

        var designation = document.createElement('div');
        designation.className = 'designation';
        designation.textContent = 'Designation: ' + employee.designation;

        var skills = document.createElement('div');
        skills.className = 'skills';
        skills.textContent = 'Skills: ' + employee.skills.join(', ');

        employeeCard.appendChild(employeeName);
        employeeCard.appendChild(designation);
        employeeCard.appendChild(skills);

        var projectsContainer = document.createElement('div');
        projectsContainer.className = 'projects-container';

        employee.projects.forEach(function (project) {
            var projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            var projectName = document.createElement('div');
            projectName.className = 'project-name';
            projectName.textContent = 'Project Name: ' + project.name;

            var projectDescription = document.createElement('div');
            projectDescription.className = 'project-description';
            projectDescription.textContent = 'Description: ' + project.description;

            var teamMembers = document.createElement('ul');
            teamMembers.className = 'team-members';

            project.team.forEach(function (teamMember) {
                var teamMemberItem = document.createElement('li');
                teamMemberItem.className = 'team-member';

                var teamMemberName = document.createElement('div');
                teamMemberName.className = 'team-member-name';
                teamMemberName.textContent = 'Name: ' + (teamMember.name || 'Unknown');

                var teamMemberRole = document.createElement('div');
                teamMemberRole.className = 'team-member-role';
                teamMemberRole.textContent = 'Role: ' + teamMember.role;

                teamMemberItem.appendChild(teamMemberName);
                teamMemberItem.appendChild(teamMemberRole);
                teamMembers.appendChild(teamMemberItem);
            });

            var tasksList = document.createElement('ul');
            tasksList.className = 'task-list';

            project.tasks.forEach(function (task) {
                var taskItem = document.createElement('li');
                taskItem.className = 'task-item';

                var taskName = document.createElement('div');
                taskName.className = 'task-name';
                taskName.textContent = 'Task: ' + task.name;

                var taskStatus = document.createElement('div');
                taskStatus.className = 'task-status';
                taskStatus.textContent = 'Status: ' + (task.status || 'Not available');

                taskItem.appendChild(taskName);
                taskItem.appendChild(taskStatus);
                tasksList.appendChild(taskItem);
            });

            projectCard.appendChild(projectName);
            projectCard.appendChild(projectDescription);
            projectCard.appendChild(teamMembers);
            projectCard.appendChild(tasksList);

            projectsContainer.appendChild(projectCard);
        });

        employeeCard.appendChild(projectsContainer);

        document.getElementById('employee-container').appendChild(employeeCard);
    });
}

// Call the fetchData function when the page loads
document.addEventListener('DOMContentLoaded', fetchData);