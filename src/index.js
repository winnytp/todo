console.log("Todo App");

import projectHandler from "./projectHandler.js";
import displayController from "./displayController.js";

// Event Listeners
document
  .getElementById("add-task-btn")
  .addEventListener("click", () => projectHandler.newTask());
document.getElementById("task-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    projectHandler.newTask();
  }
});

let projectBtns = document.querySelectorAll(".project");
projectBtns.forEach((item) => {
  item.addEventListener("click", (event) =>
    projectHandler.switchProject(event)
  );
});

document
  .querySelector("textarea")
  .addEventListener("change", projectHandler.saveDescription);
document
  .querySelector(".description-title > input")
  .addEventListener("change", projectHandler.saveTitle);
document
  .querySelector("input[type=date]")
  .addEventListener("change", projectHandler.saveDate);
document.getElementById("new-list").addEventListener("click", () => {
  const listInput = document.getElementById("new-list-input");
  listInput.classList.toggle("hidden");
  const newList = document.getElementById("new-list");
  newList.classList.toggle("add-list-focus");
});

document.getElementById("new-list-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    projectHandler.addProject();
  }
});

displayController.createProject("Example List");
displayController.drawAllTasks();

/* import format from '../node_modules/date-fns/format'
//today's date
const today = format(new Date(),'dd.MM.yyyy');
console.log(today); */
