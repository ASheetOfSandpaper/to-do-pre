let items = [
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
      return items;
    }
}

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
    items = getTasksFromDOM();    
    saveTasks(items);                 
	});

	duplicateButton.addEventListener("click", function() {
    const itemText = textElement.textContent;           
    const newi = createItem(itemText);               
    listElement.prepend(newi);                       
    items = getTasksFromDOM();                         
    saveTasks(items);                                  
	});

	editButton.addEventListener("click", function() {
    textElement.contentEditable = true;
    textElement.focus();
	});

  textElement.addEventListener("blur", function() {
    textElement.contentEditable = false;
    items = getTasksFromDOM();
    saveTasks(items);
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

items = loadTasks();
items.forEach(function(thing) {
	const Element = createItem(thing);
	listElement.append(Element);
});

formElement.addEventListener("submit", function(evt) {
    evt.preventDefault();
		const textThingy = inputElement.value;
		const newElement = createItem(textThingy);
		listElement.prepend(newElement);
		items = getTasksFromDOM(); 
    saveTasks(items);
		formElement.reset();
});

