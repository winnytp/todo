console.log('Todo App');

import genHTML from './genHTML.js'

const display = (() => {
    function createTask(project) {
        const input = document.getElementById('task-input');
        if (!input.value) return;

        const inputValue = input.value;

        const taskContainer = document.getElementById('tasks-container');
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('task-item');
        taskContainer.appendChild(itemDiv);

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        let text = document.createElement('p');
        text.textContent = inputValue;

        let icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-ellipsis-h');

        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(text);
        itemDiv.appendChild(icon);

        input.value = '';
    }

    function switchTask(task) {
        
    }

    return { createTask }
})();

const project = (() => {
    let projectObj = {
        Today: [],
        Upcoming: [],
        Inbox: [],
    }

    let listObj = {
        Tasks: [],
    }

    let currentProject = projectObj['Inbox'];

    function task(title, description, due, priority) {
        const task = {};
        task.title = title;
        task.description = description;
        task.due = due;
        task.priority = priority;
        return task;
    }

    function newTask(project) {
        project = currentProject;
        const input = document.getElementById('task-input');

        project.push(task(input.value));
        console.table(project);
        display.createTask();
    }

    function switchProject(event) {
        let selectedProject = event.target;
        console.log(selectedProject.textContent);

        currentProject = projectObj[`${selectedProject.textContent}`];
        console.log(currentProject);

        let currentSelectedProject = document.querySelector('.selected');
        currentSelectedProject.classList.remove('selected');

        selectedProject.classList.add('selected');
    }

    return { newTask, switchProject }
})();


// Event Listeners
document.getElementById('add-task-btn').addEventListener('click', () => project.newTask());

let projectBtns = document.querySelectorAll('.project');
projectBtns.forEach((item) => {
    item.addEventListener('click', (event) => project.switchProject(event));
});