import displayController from './displayController.js'

const projectHandler = (() => {
    let projectObj = {
        Today: [],
        Upcoming: [],
        Inbox: [
            {
                title: 'Welcome to Todo',
                description: 'This is a default description, edit me!',
            },
            {
                title: 'What can you do with Todo?',
                description: 'This is another default description.',
            }
        ],
    }

    let listObj = {
        Tasks: [],
    }

    let _currentProjectName = 'Inbox';
    let _currentProject = projectObj[`${_currentProjectName}`];

    function task(title, description, due, priority, completion) {
        const task = {};
        if (title) task.title = title;
        task.description = description;
        task.due = due;
        task.priority = priority;
        task.completion = completion;
        return task;
    }

    function newTask() {
        let project = projectObj[`${_currentProjectName}`];
        const input = document.getElementById('task-input');
        if (!input.value) return;
        project.push(task(input.value));
        console.table(project);
        displayController.addTask();
        displayController.showLastItem();
    }

    function createDefaultInbox() {
        let project = projectObj['Inbox'];
        project.push(task('Welcome to Todo', `This is a default description. Edit me!`));
        project.push(task('What can you do with Todo?', `This is another default description.`));
    }

    function switchProject(event) {
        let target = event.target;

        _currentProject = projectObj[`${target.textContent}`];

        _currentProjectName = target.textContent;

        console.log('Switched to: ' + _currentProjectName);
        console.table(_currentProject);

        displayController.switchProject(target);
    }

    function saveDescription() {
        let descriptionPane = document.querySelector('.description');
        let arrayIndex = descriptionPane.getAttribute('data-index-array');
        let content = document.querySelector('textarea');
        if (!arrayIndex) return;
        _currentProject[arrayIndex].description = content.value;
    }

    function saveTitle() {
        let index = document.querySelector('.description').getAttribute('data-index-array');
        let title = document.querySelector('.description-title > input').value;
        displayController.editTitle(index, title);
        _currentProject[index].title = title;
    }

    function getCurrentProject() {
        return _currentProjectName;
    }

    function getItem(position) {
        let project = projectObj[`${_currentProjectName}`];
        let thisItem = project[position];
        return thisItem;
    }

    function getProjectArrayLength() {
        let projectArrayLength = projectObj[`${_currentProjectName}`].length;
        return projectArrayLength;
    }

    return { newTask,
            switchProject, 
            getCurrentProject, 
            getItem, 
            getProjectArrayLength,
            createDefaultInbox,
            saveDescription,
            saveTitle,
        }
})();

export default projectHandler