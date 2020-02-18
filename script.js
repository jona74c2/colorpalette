"use strict";

window.addEventListener("DOMContentLoaded", start);

window.addEventListener("click", setColor);

let colorArray = ["", "", "", "", ""];
//not sure why, but I cant return a html button value in a function, so a global is used
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
  //console.log(colorArray);
  //analogous(hslObject);
  HTML.colorSquare.forEach((square, index) => {
    //console.log("ColorArray: " + colorArray[index]);
    let hslColor = `hsl(${colorArray[index].h.toFixed(1)},${colorArray[index].s.toFixed(1)}\%,${colorArray[index].l.toFixed(1)}\%)`;
    //console.log("hslColor: " + hslColor);
    square.querySelector(".current_color").style.setProperty("--color", hslColor);

    //let rgbObject = hexToRGB(HTML.color.value);
    let rgbColor = HSLToRGB(colorArray[index].h, colorArray[index].s, colorArray[index].l);
    square.querySelector(".rgb").textContent = `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
    //let hslObject = hexToHSL(HTML.color.value);
    square.querySelector(".hsl").textContent = hslColor;

    let hexColor = RGBToHex(rgbColor.r, rgbColor.g, rgbColor.b);
    square.querySelector(".hex").textContent = `Hex: ${hexColor}`;
  });
  /* HTML.colorBox.forEach(colorBox => {
    // colorBox.style.setProperty("--color", HTML.color.value);
  }); */
  //console.log(colorArray);
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
      //console.log("button value " + button.value);
      colorPaletteChoice = button.value;
      //return "" + value;
    }
  });
}

function analogous(hsl) {
  let analogousArray = ["-40", "-20", "0", "20", "40"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].h = Number(hsl.h) + Number(analogousArray[i]);

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
    //console.log("colorArray: " + colorArray[i]);
    //console.log("h values: " + colorArray[i].h);
  }
}

function monochromatic(hsl) {
  let bool = false;
  let analogousArray = ["-20", "-20", "0", "20", "20"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    if (bool) {
      colorArray[i].s += Number(analogousArray[i]);
      bool = false;
    } else {
      colorArray[i].l += Number(analogousArray[i]);
      bool = true;
    }

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
  }
}

function triad(hsl) {
  let bool = false;
  let analogousArray = ["-120", "120", "0", "-120", "120"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].h += Number(analogousArray[i]);
    if (bool) {
      colorArray[i].l += +20;
      bool = false;
    } else {
      bool = true;
    }

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
  }
}

function complementary(hsl) {
  let bool = false;
  let analogousArray = ["180", "180", "0", "0", "0"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].h += Number(analogousArray[i]);
    if (bool) {
      colorArray[i].l += +20;
      bool = false;
    } else {
      bool = true;
    }

    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
  }
}
function compound(hsl) {
  let bool = false;
  let analogousArray = ["180", "20", "0", "180", "-20"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].h += Number(analogousArray[i]);
    if (!bool) {
      colorArray[i].l += +20;
      bool = true;
    }
    if (colorArray[i].h < 0) {
      colorArray[i].h = colorArray[i].h + 360;
    }
  }
}
function shades(hsl) {
  let analogousArray = ["-30", "-15", "0", "15", "30"];
  for (let i = 0; i < colorArray.length; i++) {
    colorArray[i] = Object.create(hsl);
    //console.log("analogousArray[i]: " + analogousArray[i]);
    colorArray[i].l += Number(analogousArray[i]);
  }
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
