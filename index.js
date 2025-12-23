const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedChores = localStorage.getItem("tasks");
  if (savedChores !== null) {
    return JSON.parse(savedChores);
  } else {
    return [...items];
  }
}

let currentTasks = loadTasks();

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;

  deleteButton.addEventListener("click", function() {
    clone.remove();                 
    currentTasks = getTasksFromDOM();    
    saveTasks(currentTasks);                 
  });

  duplicateButton.addEventListener("click", function() {
    const itemText = textElement.textContent;           
    const newItem = createItem(itemText);               
    listElement.prepend(newItem);                       
    currentTasks = getTasksFromDOM();                         
    saveTasks(currentTasks);                                  
  });

  editButton.addEventListener("click", function() {
    textElement.contentEditable = true;
    textElement.focus();
  });

  textElement.addEventListener("blur", function() {
    textElement.contentEditable = false;
    currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });
  
  return clone;
}

function getTasksFromDOM() {
  const choreNames = document.querySelectorAll(".to-do__item-text");
  const chores = [];
  choreNames.forEach(function(element) {
    chores.push(element.textContent);
  });
  return chores;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

currentTasks.forEach(function(thing) {
  const Element = createItem(thing);
  listElement.append(Element);
});

formElement.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const textThingy = inputElement.value;
  const newElement = createItem(textThingy);
  listElement.prepend(newElement);
  currentTasks = getTasksFromDOM(); 
  saveTasks(currentTasks);
  formElement.reset();
});