import projectHandler from "./projectHandler";

const displayController = (() => {
    function addTask(project) {
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

    function switchProjectView() {
        const projectTitleText = document.getElementById('project-name');
        projectTitleText.textContent = projectHandler.getCurrentProject();
        _drawAllTasksInProject();
    }

    function switchProject(target) {
        let currentproject = document.querySelector('.selected');
        currentproject.classList.remove('selected');
        target.classList.add('selected');
        switchProjectView();
    }

    function _drawAllTasksInProject() {
        const taskContainer = document.getElementById('tasks-container');
        taskContainer.innerHTML = '';

        let arrayLength = projectHandler.getProjectArrayLength();

        if (!arrayLength) return;

        for (let i = 0; i < arrayLength; i++) {
            const taskContainer = document.getElementById('tasks-container');
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('task-item');
            itemDiv.setAttribute('data-index', i);

            let inputCheckbox = document.createElement('input');
            inputCheckbox.setAttribute('type', 'checkbox');

            // Testing
            inputCheckbox.addEventListener('click', (e) => {e.target.setAttribute('style', 'display: none;')});

            let pTitle = document.createElement('p');
            pTitle.textContent = projectHandler.getItem(i).title;
            pTitle.setAttribute('data-index', i);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'fas fa-ellipsis-h');

            itemDiv.appendChild(inputCheckbox);
            itemDiv.appendChild(pTitle);
            itemDiv.appendChild(icon);

            itemDiv.addEventListener('click', (e) => switchDescription(e));

            taskContainer.appendChild(itemDiv);
        }
    }

    function switchDescription(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'I') return;
        let index = event.target.getAttribute('data-index');
        alert(projectHandler.getItem(index).description);
    }

    function switchItem(item) {
        
    }

    return { addTask, switchProjectView, switchProject }
})();

export default displayController