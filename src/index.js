console.log('Todo App');

import projectHandler from './projectHandler.js'

// Event Listeners
document.getElementById('add-task-btn').addEventListener('click', () => projectHandler.newTask());

let projectBtns = document.querySelectorAll('.project');
projectBtns.forEach((item) => {
    item.addEventListener('click', (event) => projectHandler.switchProject(event));
});

projectHandler.createDefaultInbox();