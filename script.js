"use strict";

window.addEventListener("DOMContentLoaded", start);

window.addEventListener("click", setColor);

let colorArray = ["", "", "", "", ""];
//not sure why, but I cant return a html button value i an function, so a global is needed
let colorPaletteChoice;

let HTML = {};
function start() {
  HTML.colorSquare = document.querySelectorAll(".color_square");
  HTML.color = document.querySelector("#color_input");
  /*   HTML.colorBox = document.querySelectorAll(".current_color");
  HTML.hex = document.querySelectorAll(".hex");
  HTML.rgb = document.querySelectorAll(".rgb");
  HTML.hsl = document.querySelectorAll(".hsl"); */
  HTML.radio = document.querySelectorAll(".radio_button");
}

function setColor() {
  //window[button.value]();
  let hslObject = hexToHSL(HTML.color.value);
  /*   let colorPaletteChoice = checkRadio();
  console.log("Palett " + colorPaletteChoice);
  console.log("Palett " + checkRadio()); */
  checkRadio();
  //call function that matches selection
  window[colorPaletteChoice](hslObject);
  console.log(colorArray);
  //analogous(hslObject);
  HTML.colorSquare.forEach((square, index) => {
    console.log("ColorArray: " + colorArray[index]);
    let hslColor = `hsl(${colorArray[index].h.toFixed(1)},${colorArray[index].s.toFixed(1)}\%,${colorArray[index].l.toFixed(1)}\%)`;
    console.log("hslColor: " + hslColor);
    square.querySelector(".current_color").style.setProperty("--color", hslColor);

    square.querySelector(".hex").textContent = `Hex: ${HTML.color.value}`;
    let rgbObject = hexToRGB(HTML.color.value);
    square.querySelector(".rgb").textContent = `rgb(${rgbObject.r},${rgbObject.g},${rgbObject.b})`;
    //let hslObject = hexToHSL(HTML.color.value);
    square.querySelector(".hsl").textContent = hslColor;
  });
  /* HTML.colorBox.forEach(colorBox => {
    // colorBox.style.setProperty("--color", HTML.color.value);
  }); */
  console.log(colorArray);
}

function hexToRGB(hex) {
  let r;
  let g;
  let b;
  r = parseInt(hex.substring(1, 3), 16);
  g = parseInt(hex.substring(3, 5), 16);
  b = parseInt(hex.substring(5, 7), 16);
  //return `R: ${red} G: ${green} B: ${blue}`;
  return { r, g, b };
}

function hexToHSL(hex) {
  let r, g, b;
  console.log(r, g, b);
  r = parseInt(hex.substring(1, 3), 16);
  g = parseInt(hex.substring(3, 5), 16);
  b = parseInt(hex.substring(5, 7), 16);
  console.log(r, g, b);
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  console.log("L: " + l);
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  //s is multiplied by -100 to give a postive value
  s *= -100;
  // l is already in rgb, so it is changed to percent
  l = l / 2.55;
  // console.log("L: " + l);
  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  //return `H: ${h.toFixed(2)} S: ${s.toFixed(2)}% L: ${l.toFixed(2)}%`;
  return { h, s, l };
}

function analogous(hsl) {
  let analogousArray = ["-40", "-20", "0", "20", "40"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].h = Number(hsl.h) + Number(analogousArray[i]);

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
    console.log("colorArray: " + colorArray[i]);
    console.log("h values: " + colorArray[i].h);
  }
}

/* function analogous(hsl) {
  let analogousArray = [-40, -20, 20, 40];
  const colorArray = [];
  for (let i = 0; i < analogous.length; i++) {
    colorArray.push(hsl);
    colorArray[i].h = hsl.h + analogousArray[i];

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
    console.log(colorArray[i]);
  }
  console.log(colorArray);
  return colorArray;
} */

function checkRadio() {
  HTML.radio.forEach(button => {
    if (button.checked == true) {
      console.log("button value " + button.value);
      colorPaletteChoice = button.value;
      //return "" + value;
    }
  });
}
