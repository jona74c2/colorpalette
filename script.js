"use strict";

window.addEventListener("DOMContentLoaded", start);

window.addEventListener("click", setColor);

let colorArray = [];
let HTML = {};
function start() {
  HTML.colorSquare = document.querySelectorAll(".color_square");
  HTML.color = document.querySelector("#color_input");
  HTML.colorBox = document.querySelectorAll(".current_color");
  HTML.hex = document.querySelectorAll(".hex");
  HTML.rgb = document.querySelectorAll(".rgb");
  HTML.hsl = document.querySelectorAll(".hsl");
}

function setColor() {
  HTML.colorSquare.forEach(square => {
    square.querySelector(".current_color").style.setProperty("--color", HTML.color.value);

    square.querySelector(".hex").textContent = `Hex: ${HTML.color.value}`;
    let rgbObject = hexToRGB(HTML.color.value);
    square.querySelector(".rgb").textContent = `rgb(${rgbObject.r},${rgbObject.g},${rgbObject.b})`;
    let hslObject = hexToHSL(HTML.color.value);
    square.querySelector(".hsl").textContent = `hsl:(${hslObject.h.toFixed(1)},${hslObject.s.toFixed(1)},${hslObject.l.toFixed(1)})`;
  });
  HTML.colorBox.forEach(colorBox => {
    // colorBox.style.setProperty("--color", HTML.color.value);
  });
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
  s *= 100;
  // l is already in rgb, so it is changed to percent
  l = l / 2.55;
  console.log("L: " + l);
  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  //return `H: ${h.toFixed(2)} S: ${s.toFixed(2)}% L: ${l.toFixed(2)}%`;
  return { h, s, l };
}
