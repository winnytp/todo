import projectHandler from "./projectHandler";

const displayController = (() => {
  function addTask() {
    const input = document.getElementById("task-input");
    if (!input.value) return;
    _drawAllTasksInProject();
    input.value = "";
    showLastItem();
    _resetDate();
  }

  function switchProject(target) {
    let currentProject = document.querySelector(".selected");
    const projectTitleText = document.getElementById("project-name");
    if (currentProject) currentProject.classList.remove("selected");
    target.classList.add("selected");
    projectTitleText.textContent = projectHandler.getCurrentProject();
    descriptionContainer("hide");
    _drawAllTasksInProject();
    _resetDate();
  }

  function createProject(name) {
    const listColumn = document.querySelector("#lists-view > ul");

    const list = document.createElement("li");
    list.classList.add("project");
    list.innerText = name;
    list.setAttribute("data-name", name);
    list.addEventListener("click", (e) => projectHandler.switchProject(e));

    const span = document.createElement("span");
    span.classList.add("remove-list");
    span.setAttribute("data-name", name);
    span.addEventListener("click", removeProject);

    const removeListIcon = document.createElement("i");
    removeListIcon.setAttribute("class", "fas fa-times-circle");

    const input = document.getElementById("new-list-input");
    input.value = "";
    input.classList.toggle("hidden");

    const addListBtn = document.getElementById("new-list");
    addListBtn.classList.toggle("add-list-focus");

    span.appendChild(removeListIcon);
    list.appendChild(span);

    listColumn.appendChild(list);
  }

  function removeProject() {
    let projectName = this.getAttribute("data-name");
    let listToRemove = document.querySelector(`li[data-name='${projectName}']`);
    listToRemove.remove();
  }

  // Erases old tasks, then draws all the tasks in the selected project
  function _drawAllTasksInProject() {
    const taskContainer = document.getElementById("tasks-container");
    taskContainer.innerHTML = "";

    let arrayLength = projectHandler.getProjectArrayLength();

    if (!arrayLength) return;

    for (let i = 0; i < arrayLength; i++) {
      const taskContainer = document.getElementById("tasks-container");
      let itemDiv = document.createElement("div");
      itemDiv.classList.add("task-item");
      itemDiv.setAttribute("data-index", i);

      let inputCheckbox = document.createElement("input");
      inputCheckbox.setAttribute("type", "checkbox");
      inputCheckbox.setAttribute("data-index", i);
      if (projectHandler.getItem(i).completed === "yes") {
        inputCheckbox.setAttribute("checked", "");
        itemDiv.classList.add("complete-task");
      }

      inputCheckbox.addEventListener("click", (e) => {
        let index = e.target.getAttribute("data-index");
        let taskItem = document.querySelector(`div[data-index='${index}']`);
        taskItem.classList.toggle("complete-task");
        if (projectHandler.getItem(index).completed === "yes") {
          projectHandler.getItem(index).completed = "no";
        } else {
          projectHandler.getItem(index).completed = "yes";
        }
        console.log(
          "Is the item completed: " + projectHandler.getItem(index).completed
        );
      });

      let pTitle = document.createElement("p");
      pTitle.textContent = projectHandler.getItem(i).title;
      pTitle.setAttribute("data-index", i);

      let icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-times");
      icon.setAttribute("data-index", i);
      icon.addEventListener("click", _removeItem);

      itemDiv.appendChild(inputCheckbox);
      itemDiv.appendChild(pTitle);
      itemDiv.appendChild(icon);

      itemDiv.addEventListener("click", (e) => setDetails(e));
      itemDiv.addEventListener("click", () => {
        let toRemove = document.querySelector(".highlight-task");
        if (toRemove) toRemove.classList.toggle("highlight-task");
        itemDiv.classList.toggle("highlight-task");
      });

      taskContainer.appendChild(itemDiv);
    }
  }

  function descriptionContainer(action, index) {
    let descriptionPane = document.querySelector(".description");
    let defaultNoTaskView = document.getElementById("no-task-default-view");
    if (action === "hide") {
      descriptionPane.classList.add("hidden");
      defaultNoTaskView.classList.remove("hidden");
    }
    if (action === "show") {
      descriptionPane.classList.remove("hidden");
      descriptionPane.setAttribute("data-index-array", `${index}`);
      defaultNoTaskView.classList.add("hidden");
    }
  }

  function setDetails(event) {
    if (event.target.tagName === "INPUT" || event.target.tagName === "I")
      return;
    let index = event.target.getAttribute("data-index");
    let textArea = document.querySelector("textarea");
    let titleText = document.querySelector(".description-title > input");
    const dateInput = document.querySelector("input[type=date]");
    titleText.value = projectHandler.getItem(index).title;
    descriptionContainer("show", index);
    dateInput.setAttribute("data-index", index);
    if (!projectHandler.getItem(index).description) textArea.value = "";
    if (projectHandler.getItem(index).description)
      textArea.value = projectHandler.getItem(index).description;
    if (!projectHandler.getItem(index).date) dateInput.value = "";
    if (projectHandler.getItem(index).date)
      dateInput.value = projectHandler.getItem(index).date;
    console.log(projectHandler.getItem(index).date);
  }

  function showLastItem() {
    let index = projectHandler.getProjectArrayLength() - 1;
    let textArea = document.querySelector("textarea");
    let titleText = document.querySelector(".description-title > input");
    let date = document.querySelector("input[type=date]");
    date.setAttribute("data-index", index);
    titleText.value = projectHandler.getItem(index).title;
    descriptionContainer("show", index);
    if (!projectHandler.getItem(index).description)
      return (textArea.value = "");
    textArea.value = projectHandler.getItem(index).description;
  }

  function editTitle(index, value) {
    let title = document.querySelector(`p[data-index='${index}']`);
    title.innerText = String(value);
  }

  function _resetDate() {
    const dateInput = document.querySelector("input[type=date]");
    dateInput.value = "";
  }

  function _removeItem() {
    const index = this.getAttribute("data-index");
    const item = document.querySelector(`.task-item[data-index='${index}']`);
    item.remove();
    projectHandler.removeItem(index);
    descriptionContainer("hide");
    _drawAllTasksInProject();
  }

  function drawAllTasks() {
    _drawAllTasksInProject();
  }

  return {
    addTask,
    switchProject,
    drawAllTasks,
    editTitle,
    showLastItem,
    createProject,
  };
})();

export default displayController;
