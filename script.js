"use strict";

window.addEventListener("DOMContentLoaded", start);

window.addEventListener("click", setColor);

//not sure why, but I cant return a html button value in a function, so a global is used
let colorPaletteChoice;

let HTML = {};

function start() {
  HTML.colorSquare = document.querySelectorAll(".color_square");
  HTML.color = document.querySelector("#color_input");
  HTML.radio = document.querySelectorAll(".radio_button");
}

function setColor() {
  let hslObject = hexToHSL(HTML.color.value);

  //let colorPaletteChoice = checkRadio();
  checkRadio();
  //call function that matches selection
  let colorArray = window[colorPaletteChoice](hslObject);
  //console.log(colorArray);
  //analogous(hslObject);
  HTML.colorSquare.forEach((square, index) => {
    //Get current HSL color from colorArray of HSL color objects and set it in html
    let hslColor = `hsl(${colorArray[index].h.toFixed(1)},${colorArray[index].s.toFixed(1)}\%,${colorArray[index].l.toFixed(1)}\%)`;
    square.querySelector(".current_color").style.setProperty("--color", hslColor);
    square.querySelector(".hsl").textContent = hslColor;

    //Get current color as RGB object from colorArray of HSL color objects and set it in html
    let rgbColor = HSLToRGB(colorArray[index].h, colorArray[index].s, colorArray[index].l);
    square.querySelector(".rgb").textContent = `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;

    //Get current color as hex object from current RGB object and set it in html
    let hexColor = RGBToHex(rgbColor.r, rgbColor.g, rgbColor.b);
    square.querySelector(".hex").textContent = `Hex: ${hexColor}`;
  });
}

function checkRadio() {
  HTML.radio.forEach(button => {
    if (button.checked == true) {
      colorPaletteChoice = button.value;
      //return button.value; how do I get this working without a global?
    }
  });
}

function checkWithin360(value) {
  if (value < 0) {
    value += 360;
  } else if (value > 360) {
    value -= 360;
  }
  return value;
}

function checkWithin100(value) {
  if (value < 0) {
    value = 0;
  } else if (value > 100) {
    value = 100;
  }
  return value;
}

function analogous(hsl) {
  let analogousArray = [-40, -20, 0, 20, 40];
  let colorArray = [];
  for (let i = 0; i < analogousArray.length; i++) {
    colorArray.push(Object.create(hsl));

    colorArray[i].h = hsl.h + analogousArray[i];

    colorArray[i].h = checkWithin360(colorArray[i].h);
  }
  return colorArray;
}

function monochromatic(hsl) {
  let bool = false;
  const monochromaticArray = [-20, -20, 0, 20, 20];
  const colorArray = [];
  for (let i = 0; i < monochromaticArray.length; i++) {
    colorArray.push(Object.create(hsl));
    if (bool) {
      colorArray[i].s += monochromaticArray[i];
      bool = false;
    } else {
      colorArray[i].l += monochromaticArray[i];
      bool = true;
    }
    colorArray[i].s = checkWithin100(colorArray[i].s);
    colorArray[i].l = checkWithin100(colorArray[i].l);
  }
  return colorArray;
}

function triad(hsl) {
  let bool = false;
  const triadArray = [-120, 120, 0, -120, 120];
  const colorArray = [];
  for (let i = 0; i < triadArray.length; i++) {
    colorArray.push(Object.create(hsl));
    colorArray[i].h += triadArray[i];
    colorArray[i].h = checkWithin360(colorArray[i].h);
    if (bool) {
      colorArray[i].l += 20;
      colorArray[i].l = checkWithin100(colorArray[i].l);
      bool = false;
    } else {
      bool = true;
    }
  }
  return colorArray;
}

function complementary(hsl) {
  let bool = false;
  let complementaryArray = [180, 180, 0, 0, 0];
  const colorArray = [];
  for (let i = 0; i < complementaryArray.length; i++) {
    colorArray.push(Object.create(hsl));
    colorArray[i].h += complementaryArray[i];
    colorArray[i].h = checkWithin360(colorArray[i].h);
    if (bool) {
      colorArray[i].l += 20;
      bool = false;
      colorArray[i].l = checkWithin100(colorArray[i].l);
    } else {
      bool = true;
    }
  }
  return colorArray;
}

function compound(hsl) {
  let bool = false;
  let compoundArray = [180, 20, 0, 180, -20];
  const colorArray = [];
  for (let i = 0; i < compoundArray.length; i++) {
    colorArray.push(Object.create(hsl));
    colorArray[i].h += compoundArray[i];
    colorArray[i].h = checkWithin360(colorArray[i].h);
    if (!bool) {
      colorArray[i].l += 20;
      colorArray[i].l = checkWithin100(colorArray[i].l);
      bool = true;
    }
  }
  return colorArray;
}

function shades(hsl) {
  let shadesArray = [-30, -15, 0, 15, 30];
  const colorArray = [];
  for (let i = 0; i < shadesArray.length; i++) {
    colorArray.push(Object.create(hsl));
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].l += shadesArray[i];
    colorArray[i].l = checkWithin100(colorArray[i].l);
  }
  return colorArray;
}

// This function is taken from https://css-tricks.com/converting-color-spaces-in-javascript/
function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return { r, g, b };
  //return "rgb(" + r + "," + g + "," + b + ")";
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

// This function is taken from https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
