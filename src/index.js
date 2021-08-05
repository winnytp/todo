console.log('Todo App');

import projectHandler from './projectHandler.js'
import displayController from './displayController.js'

// Event Listeners
document.getElementById('add-task-btn').addEventListener('click', () => projectHandler.newTask());
document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        projectHandler.newTask();
    }
});

let projectBtns = document.querySelectorAll('.project');
projectBtns.forEach((item) => {
    item.addEventListener('click', (event) => projectHandler.switchProject(event));
});

document.querySelector('textarea').addEventListener('change', projectHandler.saveDescription);
document.querySelector('.description-title > input').addEventListener('change', projectHandler.saveTitle);

displayController.drawAllTasks();

// projectHandler.createDefaultInbox();