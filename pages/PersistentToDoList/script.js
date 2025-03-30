window.addEventListener('load', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.forEach((t, i) => {
      const span = document.createElement('span');
      span.textContent = t;
      const button = document.createElement('button');
      button.textContent = 'Remove';

      button.addEventListener('click', () => {
        tasks.splice(i, 1); 
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload();
      });

      const li = document.createElement('li');
      li.appendChild(span);
      li.appendChild(button);
      document.getElementById('tasksList').appendChild(li);
    });
  }

  let taskCounter = JSON.parse(sessionStorage.getItem('taskCounter'));

  if (!taskCounter) {
    taskCounter = 0;
  }

  document.getElementById('taskCounter').textContent = taskCounter;
  const theme = loadTheme();
  const style = document.body.style;

  switch (theme) {
    case 'dark':
      style.backgroundColor = '#09122C';
      style.color = 'white';
      style.fontFamily = 'initial';
      break;
    case 'crazy':
      style.backgroundColor = '#A94A4A';
      style.color = 'initial';
      style.fontFamily = 'Henny Penny';
      break;
    default:
      style.backgroundColor = 'initial';
      style.color = 'initial';
      style.fontFamily = 'initial';
  }

  document.getElementById('theme').textContent = theme;
});

function loadTheme() {
  const cookies = document.cookie.split('; ');
  
  for (let cookie of cookies) {
    const crumbs = cookie.split('=');
    if (crumbs[0] === 'theme') return crumbs[1];
  }

  return 'light';
}

function handleAddTask(event) {
  event.preventDefault();
  const value = document.getElementById('addTask').value;
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  
  if (!tasks) {
    tasks = [];
  }
  
  tasks.push(value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  let taskCounter = JSON.parse(sessionStorage.getItem('taskCounter'));

  if (!taskCounter) {
    taskCounter = 0;
  }

  ++taskCounter;
  sessionStorage.setItem('taskCounter', JSON.stringify(taskCounter));
  location.reload();
}

function handleTheme() {
  let theme = loadTheme();

  switch (theme) {
    case 'dark':
      theme = 'crazy';
      break;
    case 'crazy':
      theme = 'light';
      break;
    default:
      theme = 'dark';
  }

  let date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = `theme=${theme}; expires=${date.toUTCString()} path=/`;
  location.reload();
}