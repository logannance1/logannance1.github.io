function handleUsernameInput(event) {
  const pattern = /^[a-zA-Z0-9_]+$/;
  const value = event.currentTarget.value;
  const usernameInfo = document.getElementById('usernameInfo');
  
  if (pattern.test(value)) {
    usernameInfo.innerHTML = '&check; Username is valid';
    usernameInfo.style.color = 'green';
    event.currentTarget.setCustomValidity('');
  } else {
    usernameInfo.innerHTML = '&cross; Username is invalid';
    usernameInfo.style.color = 'red';
    event.currentTarget.setCustomValidity(' ');
  }
}

function getMissingPasswordItems(value) {
  let missing = [];

  const patterns = [
    { pattern: /.{8,}/, msg: '8 characters' },
    { pattern: /[a-z]+/, msg: 'lowercase letter' },
    { pattern: /[A-Z]+/, msg: 'uppercase letter' },
    { pattern: /\d+/, msg: 'number' },
    { pattern: /[!@#$%^&*]+/, msg: 'special character (!@#$%^&*)' },
  ];

  patterns.forEach(p => {
    if (!p.pattern.test(value)) {
      missing.push(p.msg);
    }
  });

  return missing;
}

function handlePasswordInput(event) {
  const missing = getMissingPasswordItems(event.currentTarget.value);
  let passwordInfo = document.getElementById('passwordInfo');

  if (missing.length === 0) {
    passwordInfo.style.color = 'green';
    passwordInfo.innerHTML = '&check; Password is valid';
    event.currentTarget.setCustomValidity('');
  } else {
    let output = `&cross; Password is missing:<br>${missing[0]}`;

    for (let i = 1; i < missing.length; ++i) {
      output += `<br>${missing[i]}`;
    }

    passwordInfo.style.color = 'red';
    passwordInfo.innerHTML = output;
    event.currentTarget.setCustomValidity(' ');
  }
}

function sanitize(str) {
  return str.replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/, '&quot;')
    .replace(/'/, '&apos;');
}

function handleSubmitForm(event) {
  event.preventDefault();

  const data = {
    name: sanitize(document.getElementById('name').value),
    phone: sanitize(document.getElementById('phoneNumber').value),
    email: sanitize(document.getElementById('emailAddr').value),
    comment: sanitize(document.getElementById('comment').value),
    user: sanitize(document.getElementById('username').value),
    pw: sanitize(document.getElementById('pw').value),
  };

  console.log(data);
  document.getElementById('dataHolder')
    .textContent = "Data submitted, check console";
}