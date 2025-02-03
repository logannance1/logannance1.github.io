let dataset = [];

function updateHtml() {  
  document.getElementById('dataset').innerHTML = makeDatasetStr();
  document.getElementById('mean').innerHTML = mean();
}

function readInpt() {
  let value = Number(document.getElementById('numInpt').value);

  if (isNaN(value)) {
    alert('Input must be a number. Please try again');
  }

  return value;
}

function addValue() {
  let inpt = readInpt();
  if (isNaN(inpt)) return;
  dataset.push(inpt);
  updateHtml();
}

function removeValue() {
  let inpt = readInpt();
  if (isNaN(inpt)) return;
  let i = dataset.indexOf(inpt);
  
  if (i === -1) {
    alert('Cannot remove input which is not in the dataset. Please try again');
    return;
  }

  dataset.splice(i, 1);
  updateHtml();
}

function mean() {
  let mean = '';

  if (dataset.length > 0) {
    let sum = 0;

    for (num of dataset) {
      sum += num;
    }
  
    mean = sum / dataset.length;
  }

  return mean;
}

function makeDatasetStr() {
  let txt = '';

  if (dataset.length > 0) {
    txt = dataset[0];

    for (let i = 1; i < dataset.length; ++i) {
      txt += `, ${dataset[i]}`;
    }
  }
  
  return txt;
}