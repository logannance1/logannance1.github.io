const themes = [
  {name: 'light', icon: 'fa-sun', backgroundColor: 'white', color: 'black', fontFamily: 'initial'},
  {name: 'dark', icon: 'fa-moon', backgroundColor: '#09122C', color: 'white', fontFamily: 'initial'},
  {name: 'crazy', icon: 'fa-face-grin-wink', backgroundColor: '#A94A4A', color: 'black', fontFamily: 'Henny Penny'}
];

let currentThemeNum = 0;

window.addEventListener('load', () => {
  switch (loadCookie('theme')) {
    case 'dark':
      currentThemeNum = 1;
      break;
    case 'crazy':
      currentThemeNum = 2;
      break;
    default:
      currentThemeNum = 0;
      break;
  }

  changeThemeables(themes[currentThemeNum]);
  changeIcon(themes[currentThemeNum]);
});

function loadCookie(name) {
  const cookies = document.cookie.split('; ');

  for (let cookie of cookies) {
    const crumbs = cookie.split('=');
    if (crumbs[0] === name) return crumbs[1];
  }

  return null;
}

function changeTheme() {
  const nextThemeNum = (currentThemeNum + 1) % 3;
  const nextTheme = themes[nextThemeNum];
  changeThemeables(nextTheme);
  changeIcon(nextTheme);
  currentThemeNum = nextThemeNum;
  let date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  document.cookie = `theme=${nextTheme.name}; expires=${date.toUTCString()}; path=/`;
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