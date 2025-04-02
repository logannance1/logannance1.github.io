// const themes = [
//   {name: 'light', icon: 'fa-sun'},
//   {name: 'dark', icon: 'fa-moon'},
//   {name: 'crazy', icon: 'fa-face-grin-wink'}
// ];

// let currentThemeNum = 0;

// let foo = false;
// console.log(typeof foo);
// foo = 0;
// console.log(typeof foo);
window.addEventListener('load', () => {
    const theme = loadTheme();
  const style = document.body.style;
  const icon = document.getElementById('theme-icon');
  const headingBlocks = document.getElementsByClassName('heading-block');

  switch (theme) {
    case 'dark':
      style.backgroundColor = '#09122C';
      style.color = 'white';
      style.fontFamily = 'initial';
      icon.className = 'fa-solid fa-moon';

      for (let headingBlock of headingBlocks) {
        headingBlock.style.backgroundColor = '#BE3144';
      }

      break;
    case 'crazy':
      style.backgroundColor = '#A94A4A';
      style.color = 'initial';
      style.fontFamily = 'Henny Penny';
      icon.className = 'fa-solid fa-face-grin-wink';

      for (let headingBlock of headingBlocks) {
        headingBlock.style.backgroundColor = '#F4D793';
      }

      break;
    default:
      style.backgroundColor = 'initial';
      style.color = 'initial';
      style.fontFamily = 'initial';
      icon.className = 'fa-solid fa-sun';

      for (let headingBlock of headingBlocks) {
        headingBlock.style.backgroundColor = 'aqua';
      }
  }
});

function loadTheme() {
  const cookies = document.cookie.split('; ');
  
  for (let cookie of cookies) {
    const crumbs = cookie.split('=');
    if (crumbs[0] === 'theme') return crumbs[1];
  }

  return 'light';
}

function changeTheme() {
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
  // const currentTheme = themes[currentThemeNum];
  // const nextThemeNum = (currentThemeNum + 1) % 3;
  // const nextTheme = themes[nextThemeNum];
  // changeThemeables(currentTheme, nextTheme);
  // changeIcon(currentTheme, nextTheme);
  // currentThemeNum = nextThemeNum;
}

function changeThemeables(currentTheme) {
  const body = document.body.style;
  body.backgroundColor = currentTheme.backgroundColor;
  body.color = currentTheme.color;
  body.fontFamily = currentTheme.fontFamily;
}

function changeIcon(currentTheme) {
  const themeIcon = document.getElementById('theme-icon');
  themeIcon.classList.remove(themes[0].icon, themes[1].icon, themes[2].icon);
  themeIcon.classList.add(currentTheme.icon);
}