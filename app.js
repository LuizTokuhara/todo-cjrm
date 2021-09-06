const form = document.querySelector("form");
const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchTodo = document.querySelector(".form-search input");
const todosContainer = document.querySelector(".todos-container");

const addTodo = (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();
  const todoIndex = Array.from(todosContainer.children).length + 1;

  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-index="${todoIndex}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete" data-index="${todoIndex}"></i>
    </li>
    `;

    event.target.reset();
  }
};

const removeTodo = (event) => {
  const clickedElement = event.target;
  const isDeleteClicked = Array.from(clickedElement.classList).includes(
    "delete"
  );

  if (isDeleteClicked) {
    const clickedElementIndex = clickedElement.dataset.index;
    const todoWithSameIndex = Array.from(todosContainer.children).filter(
      (todo) => todo.dataset.index === clickedElementIndex
    );

    todoWithSameIndex[0].remove();
  }
};

const hideTodo = (elements) => {
  elements.forEach((todo) => {
    todo.classList.remove("d-flex");
    todo.classList.add("hidden");
  });
};

const showTodo = (elements) => {
  elements.forEach((todo) => {
    todo.classList.remove("hidden");
    todo.classList.add("d-flex");
  });
};

const searchTodos = (inputValue) => {
  const todosArray = Array.from(todosContainer.children);
  const todoElements = todosArray.filter(
    (todo) => !todo.textContent.toLowerCase().includes(inputValue)
  );
  todoElements.length !== 0 ? hideTodo(todoElements) : showTodo(todosArray);
};

const filterTodos = (event) => {
  const inputValue = event.target.value.toLowerCase().trim();
  searchTodos(inputValue);
};

form.addEventListener("submit", (event) => event.preventDefault());
formAddTodo.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", removeTodo);
inputSearchTodo.addEventListener("input", filterTodos);
