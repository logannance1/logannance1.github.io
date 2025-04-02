const themes = ['light', 'dark', 'crazy'];
let currentTheme;

window.addEventListener('load', () => {
  const tasks = loadTasks();
  tasks.forEach(t => createTaskItem(t));
  updateTaskCounterHTML(loadSessionTaskCounter());
  let theme = loadCookie('theme');

  if (!theme) {
    theme = 'light';
  }

  updateTheme(theme);
});

function handleThemeClick() {
  currentTheme = (currentTheme + 1) % themes.length;
  const date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = `theme=${themes[currentTheme]}; expires=${date.toUTCString()}; path=/`;
  updateTheme(themes[currentTheme]);
}

function updateTheme(theme) {
  const style = document.body.style;

  switch (theme) {
    case 'dark':
      style.backgroundColor = '#09122C';
      style.color = 'white';
      currentTheme = 1
      break;
    case 'crazy':
      style.backgroundColor = '#A94A4A';
      style.color = 'black';
      currentTheme = 2
      break;
    default:
      style.backgroundColor = 'white';
      style.color = 'black';
      currentTheme = 0
  }

  document.getElementById('currentTheme').textContent = theme;
}

function loadCookie(name) {
  const cookies = document.cookie.split('; ');

  for (let cookie of cookies) {
    const crumbs = cookie.split('=');
    if (crumbs[0] === name) return crumbs[1];
  }

  return null;
}

function createTaskItem(text) {
  const item = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';

  removeBtn.addEventListener('click', () => {
    const tasks = loadTasks();
    tasks.splice(tasks.indexOf(text), 1);
    updateTasks(tasks);
    item.remove();
  });

  item.appendChild(span);
  item.appendChild(removeBtn);
  document.getElementById('tasks').appendChild(item);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (!tasks) {
    console.log('No tasks loaded');
    return [];
  }

  return tasks;
}

function updateTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(tasks);
}

function loadSessionTaskCounter() {
  const taskCounter = JSON.parse(sessionStorage.getItem('taskCounter'));
  if (!taskCounter) return 0;
  return taskCounter;
}

function updateTaskCounterHTML(taskCounter) {
  document.getElementById('taskCounter').textContent = taskCounter;
}

function incrementSessionTaskCounter() {
  const taskCounter = loadSessionTaskCounter() + 1;
  sessionStorage.setItem('taskCounter', JSON.stringify(taskCounter));
  updateTaskCounterHTML(taskCounter);
}

function handleAddTask(event) {
  event.preventDefault();
  const task = document.getElementById('addTask').value;
  document.getElementById('addTask').value = '';
  const tasks = loadTasks();
  createTaskItem(task, tasks, tasks.length);
  tasks.push(task);
  updateTasks(tasks);
  incrementSessionTaskCounter();
}