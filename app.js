const container = document.getElementById("container");
const inputAdd = document.getElementById("input");
const submit = document.getElementById("add-btn");

const added = document.createElement("div");
added.classList.add("added");

const addedList = document.createElement("ul");
addedList.classList.add("added__list");
added.style.display = "none";
added.append(addedList);
container.append(added);

let editingItem = null; 
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function loadTodos() {
  addedList.innerHTML = "";
  if (todos.length > 0) added.style.display = "block";

  todos.forEach((todo) => {
    addTodoToDOM(todo);
  });
}


function addTodoToDOM(todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("added__item");

  listItem.innerHTML = `
        <p class="value">${todo}</p>
        <div class="added__icons">
            <img src="./pencil.png" class="pencil edit" alt="Edit">
            <img src="./delete.png" class="pencil delete" alt="Delete">
        </div>
    `;

  addedList.appendChild(listItem);

  listItem.querySelector(".delete").addEventListener("click", () => {
    todos = todos.filter((item) => item !== todo);
    saveTodos();
    listItem.remove();
    if (todos.length === 0) added.style.display = "none";
  });

  listItem.querySelector(".edit").addEventListener("click", () => {
    inputAdd.value = todo;
    editingItem = listItem;
  });
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputAdd.value.trim();
  if (!inputValue) return;

  added.style.display = "block";

  if (editingItem) {
    let oldValue = editingItem.querySelector(".value").textContent;
    todos = todos.map((todo) => (todo === oldValue ? inputValue : todo));
    editingItem.querySelector(".value").textContent = inputValue;
    editingItem = null;
  } else {
    todos.push(inputValue);
    addTodoToDOM(inputValue);
  }

  saveTodos();
  inputAdd.value = "";
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

loadTodos();
