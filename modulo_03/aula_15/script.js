const form = document.getElementById('taskForm');
const ul = document.getElementById('taskList');
const filterInput = document.getElementById('filterTask');

const storedTasks = [];
let filteredTasks = [];

// Criar tarefas
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = new FormData(form);
  const taskName = data.get('taskName');

  const task = document.createElement('li');
  task.className = 'task';
  task.innerHTML = `${taskName}`;
  storedTasks.push(task);
  refreshList(storedTasks);
});

// Filtrar tarefas
filterInput.addEventListener('input', () => {
  const filter = filterInput.value;
  const regex = RegExp(filter, 'i');

  if (filter === "") {
    filteredTasks = storedTasks;
    refreshList(filteredTasks);
    return;
  }

  filteredTasks = storedTasks.filter(t => regex.test(t.innerText));

  refreshList(filteredTasks);
});


// Atualizar lista
function refreshList(tasks) {
  ul.innerHTML = ``;
  tasks.forEach(task => {
    ul.append(task);
  });
}