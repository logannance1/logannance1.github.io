const themes = [
  {name: 'light', icon: 'fa-sun'},
  {name: 'dark', icon: 'fa-moon'},
  {name: 'crazy', icon: 'fa-face-grin-wink'}
];

let currentThemeNum = 0;

let foo = false;
console.log(typeof foo);
foo = 0;
console.log(typeof foo);

function changeTheme() {
  const currentTheme = themes[currentThemeNum];
  const nextThemeNum = (currentThemeNum + 1) % 3;
  const nextTheme = themes[nextThemeNum];
  changeThemeables(currentTheme, nextTheme);
  changeIcon(currentTheme, nextTheme);
  currentThemeNum = nextThemeNum;
}

function changeThemeables(currentTheme, nextTheme) {
  const themeables = document.querySelectorAll(`.${currentTheme.name}`);

  for (let themeable of themeables) {
    themeable.classList.replace(currentTheme.name, nextTheme.name);
  }
}

function changeIcon(currentTheme, nextTheme) {
  const themeIcon = document.getElementById('theme-icon');
  themeIcon.classList.remove(currentTheme.icon);
  themeIcon.classList.add(nextTheme.icon);
}