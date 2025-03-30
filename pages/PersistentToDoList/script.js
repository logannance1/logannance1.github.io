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
  loadQuote();
});

async function loadQuote() {
  try {
    let resp = await fetch('https://quoteslate.vercel.app/api/quotes/random');

    if (!resp.ok) {
      throw new Error();
    }

    const data = await resp.json();
    document.getElementById('quote').textContent = `"${data.quote}" - ${data.author}`;
  } catch (err) {
    document.getElementById('quote').textContent = 'Unable to load quote at this time';
  }
}

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
  document.cookie = `theme=${theme}; expires=${date.toUTCString()}; path=/`;
  location.reload();
}