function calcPerimeter() {
    a = Number(document.getElementById("side-a").value);
    b = Number(document.getElementById("side-b").value);
    c = Number(document.getElementById("side-c").value);
    perimeter = a + b + c;
    document.getElementById("perimeter").innerHTML =
      `Triangle Perimeter: ${perimeter}`;
}

function calcArea() {
  b = Number(document.getElementById("base").value);
  h = Number(document.getElementById("height-t").value);
  area = b * h / 2;
  document.getElementById("area").innerHTML =
    `Triangle Area: ${area}`;
}

function calcVolume() {
  l = Number(document.getElementById("length").value);
  w = Number(document.getElementById("width").value);
  h = Number(document.getElementById("height-p").value);
  volume = l * w * h / 3;
  document.getElementById("volume").innerHTML =
    `Pyramid Volume: ${volume}`;
}