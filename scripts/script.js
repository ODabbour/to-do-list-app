const toDoList = JSON.parse(localStorage.getItem('todo-list')) || [];

renderToDoList();

function renderToDoList() {
  let toDoListHTML = '';

  toDoList.forEach((toDoObject, index) => {
    const { name, dueDate } = toDoObject;

    if (name === '') {
      return;
    }
    
    const html = `
      <div class="todo-name">${name}</div>
      <div class="todo-date">${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">
        <img src="images/delete.png" class="delete-image"></img>
      </button> 
    `;
    toDoListHTML += html;
  });
  
  document.querySelector('.js-todo-list').innerHTML = toDoListHTML;
  
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      toDoList.splice(index, 1);
      renderToDoList();
      localStorage.setItem('todo-list', JSON.stringify(toDoList));
    })
  });
}

function checkEnter(event) {
  if (event.key === 'Enter') {
    addToDo();
  }
}

function clearList() {
  length = toDoList.length;
  toDoList.splice(0, length);
  
  console.log(toDoList);
  renderToDoList();
  localStorage.setItem('todo-list', JSON.stringify(toDoList));
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addToDo();
  });

function addToDo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;


  toDoList.push({
    name,
    dueDate
  });
  console.log(toDoList);

  inputElement.value = '';

  localStorage.setItem('todo-list', JSON.stringify(toDoList));

  renderToDoList();
}