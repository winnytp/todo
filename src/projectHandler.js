import displayController from "./displayController.js";

const projectHandler = (() => {
  let projectObj = {
    Inbox: [
      {
        title: "Welcome to Todo",
        description: "This is a default description, edit me!",
      },
      {
        title: "What can you do with Todo?",
        description: "This is another default description.",
      },
      {
        title: "Check out my Github",
        description: "Find me @winnytp",
      },
    ],

    "Example List": [
      {
        title: "This is an example title",
        description: "This is an example description",
      },
    ],
  };

  let _currentProjectName = "Inbox";
  let _currentProject = projectObj[`${_currentProjectName}`];

  function task(title, description, date, priority, completed) {
    const task = {};
    if (title) task.title = title;
    task.description = description;
    task.date = date;
    task.priority = priority;
    task.completed = completed;
    return task;
  }

  function newTask() {
    let project = projectObj[`${_currentProjectName}`];
    const input = document.getElementById("task-input");
    if (!input.value) return;
    project.push(task(input.value));
    console.table(project);
    displayController.addTask();
  }

  function addProject() {
    const input = document.getElementById("new-list-input");
    let name = input.value;
    projectObj[`${name}`] = [];
    console.log(projectObj[`${name}`]);
    displayController.createProject(name);
  }

  function createDefaultInbox() {
    let project = projectObj["Inbox"];
    project.push(
      task("Welcome to Todo", `This is a default description. Edit me!`)
    );
    project.push(
      task("What can you do with Todo?", `This is another default description.`)
    );
  }

  function switchProject(event) {
    let target = event.target;

    _currentProject = projectObj[`${target.textContent}`];

    if (!_currentProject) return;

    _currentProjectName = target.textContent;

    console.log("Switched to: " + _currentProjectName);
    console.table(_currentProject);

    displayController.switchProject(target);
  }

  function saveDescription() {
    let descriptionPane = document.querySelector(".description");
    let arrayIndex = descriptionPane.getAttribute("data-index-array");
    let content = document.querySelector("textarea");
    if (!arrayIndex) return;
    _currentProject[arrayIndex].description = content.value;
  }

  function saveTitle() {
    let index = document
      .querySelector(".description")
      .getAttribute("data-index-array");
    let title = document.querySelector(".description-title > input").value;
    displayController.editTitle(index, title);
    _currentProject[index].title = title;
  }

  function saveDate() {
    let index = this.getAttribute("data-index");
    const dateInput = document.querySelector("input[type=date]");
    _currentProject[index].date = dateInput.value;
    console.log(
      dateInput.value +
        " was saved in " +
        _currentProjectName +
        " (index: " +
        index +
        ")"
    );
  }

  function getCurrentProject() {
    return _currentProjectName;
  }

  function getItem(position) {
    let project = projectObj[`${_currentProjectName}`];
    let thisItem = project[position];
    return thisItem;
  }

  function removeItem(i) {
    _currentProject.splice(i, 1);
  }

  function getProjectArrayLength() {
    let projectArrayLength = projectObj[`${_currentProjectName}`].length;
    return projectArrayLength;
  }

  return {
    newTask,
    switchProject,
    addProject,
    getCurrentProject,
    getItem,
    getProjectArrayLength,
    createDefaultInbox,
    saveDescription,
    saveTitle,
    saveDate,
    removeItem,
  };
})();

export default projectHandler;
