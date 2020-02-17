"use strict";

window.addEventListener("DOMContentLoaded", start);

window.addEventListener("click", setColor);

let HTML = {};
function start() {
  HTML.color = document.querySelector("input");
  HTML.colorBox = document.querySelector("#current_color");
  HTML.hex = document.querySelector("#hex");
  HTML.rgb = document.querySelector("#rgb");
  HTML.hsl = document.querySelector("#hsl");
}

function setColor() {
  HTML.colorBox.style.setProperty("--color", HTML.color.value);
  console.log(HTML.color.value);
  HTML.hex.textContent = `Hex: ${HTML.color.value}`;
  HTML.rgb.textContent = hexToRGB(HTML.color.value);
  HTML.hsl.textContent = hexToHSL(HTML.color.value);
}

function hexToRGB(hex) {
  let red;
  let green;
  let blue;
  red = parseInt(hex.substring(1, 3), 16);
  green = parseInt(hex.substring(3, 5), 16);
  blue = parseInt(hex.substring(5, 7), 16);
  return `R: ${red} G: ${green} B: ${blue}`;
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
  return `H: ${h.toFixed(2)} S: ${s.toFixed(2)}% L: ${l.toFixed(2)}%`;
}
