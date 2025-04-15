const jsonData = `
  [
    "let", "const", "innerHTML", "array", "JSON", "string", "boolean", "null", "NuN", "object", "function", "return", "stringfy", "sort", "length", "push", "random", "floor", "while", "switch", "try", "catch", "finally", "throw", "arrow"
  ]
`
const hangmanStages = [`
   -----
   |   |
   |   
   |  
   |   
   |  
  -------`, `
  ------ 
   |   |
   |   O
   |
   |   
   |  
  -------`, `
  ------
   |   |
   |   O
   |   |
   |
   |  
  -------`, `
  ------
   |   |
   |   O
   |  /|
   |
   |  
  -------`, `
  ------
   |   |
   |   O
   |  /|\\
   |
   |
  -------`, `
   -----
   |   |
   |   O
   |  /|\\
   |  /
   |
  -------`, `
  ------
   |   |
   |   O
   |  /|\\
   |  / \\
   |
  -------`
];

window.addEventListener('load', () => {
  generateHangman();
  generateLetterButtons();
});

function generateHangman() {
  const hangmanDiv = document.getElementById('hangman');
  let hangmanStage = JSON.parse(sessionStorage.getItem('hangmanStage'));

  if (!hangmanStage) {
    hangmanStage = 4;
  }

  hangmanDiv.textContent = hangmanStages[hangmanStage];
}

function generateLetterButtons() {
  const lettersDiv = document.getElementById('letters');
  
  for (let i = 0; i < 26; ++i) {
    const letterBtn = document.createElement('button');
    letterBtn.textContent = String.fromCharCode(65 + i);
    lettersDiv.appendChild(letterBtn);
  }
}

function getRandomWord() {
    let i = Math.floor(Math.random() * jsonData.length);
    let randomWord = jsonData[i];
    console.log(randomWord);
}

getRandomWord();