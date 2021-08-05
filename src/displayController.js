import projectHandler from "./projectHandler";

const displayController = (() => {
    function addTask() {
        const input = document.getElementById('task-input');
        if (!input.value) return;
        _drawAllTasksInProject();
        input.value = '';
        showLastItem();
    }

    function switchProject(target) {
        let currentproject = document.querySelector('.selected');
        const projectTitleText = document.getElementById('project-name');
        currentproject.classList.remove('selected');
        target.classList.add('selected');
        projectTitleText.textContent = projectHandler.getCurrentProject();

        descriptionContainer('hide');
        _drawAllTasksInProject();
    }

    // Erases old tasks, then draws all the tasks in the selected project
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
            inputCheckbox.setAttribute('data-index', i);

            inputCheckbox.addEventListener('click', (e) => {
                let index = e.target.getAttribute('data-index');
                let taskItem = document.querySelector(`div[data-index='${index}']`);
                taskItem.classList.toggle('complete-task');
            });

            let pTitle = document.createElement('p');
            pTitle.textContent = projectHandler.getItem(i).title;
            pTitle.setAttribute('data-index', i);

            let icon = document.createElement('i');
            icon.setAttribute('class', 'fas fa-ellipsis-h');

            itemDiv.appendChild(inputCheckbox);
            itemDiv.appendChild(pTitle);
            itemDiv.appendChild(icon);

            itemDiv.addEventListener('click', (e) => switchDescription(e));
            itemDiv.addEventListener('click', () => {
                // let oldHighlight = document.querySelector('.highlight-task');
                // oldHighlight.classList.remove('highlight-task');
                // itemDiv.classList.toggle('highlight-task');
            })

            taskContainer.appendChild(itemDiv);
        }
    }

    function descriptionContainer(action, index) {
        let descriptionPane = document.querySelector('.description');
        let defaultNoTaskView = document.getElementById('no-task-default-view');
        if (action === 'hide') {
            descriptionPane.classList.add('hidden');
            defaultNoTaskView.classList.remove('hidden');
        }
        if (action === 'show') {
            descriptionPane.classList.remove('hidden');
            descriptionPane.setAttribute('data-index-array', `${index}`);
            defaultNoTaskView.classList.add('hidden');
        }
    }

    function switchDescription(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'I') return;
        let index = event.target.getAttribute('data-index');
        let textArea = document.querySelector('textarea');
        let titleText = document.querySelector('.description-title > input');
        titleText.value = projectHandler.getItem(index).title;
        descriptionContainer('show', index);
        if (!projectHandler.getItem(index).description) return textArea.value = '';
        textArea.value = projectHandler.getItem(index).description;
    }

    function showLastItem() {
        let index = projectHandler.getProjectArrayLength() - 1;
        let textArea = document.querySelector('textarea');
        let titleText = document.querySelector('.description-title > input');
        titleText.value = projectHandler.getItem(index).title;
        descriptionContainer('show', index);
        if (!projectHandler.getItem(index).description) return textArea.value = '';
        textArea.value = projectHandler.getItem(index).description;
    }

    function editTitle(index, value) {
        let title = document.querySelector(`p[data-index='${index}']`);
        title.innerText = String(value);
    }

    function drawAllTasks() {
        _drawAllTasksInProject();
    }

    return { addTask, switchProject, drawAllTasks, editTitle, showLastItem, }
})();

export default displayController