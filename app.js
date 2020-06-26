const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange")
const colors = document.getElementsByClassName("jsColor")
const mode = document.getElementById("jsFill")
const saveBtn = document.getElementById("jsSave")
const currentColor = document.getElementById("currentColor");

const CANVAS_SIZE = 500;
const INITIAL_COLOR = "#2c2c2c";
let currentColorCode = INITIAL_COLOR
console.log(currentColor.style.backgroundColor)

// Initializers
canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
let lineWidth = ctx.lineWidth = 2.5;
let painting = false;
let filling = false;


const handleColorClick = (event) => {
  console.log(event.target.style.backgroundColor)
  changeStrokeStyle(event.target.style.backgroundColor)
}

const fillCanvas = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    toggleFilling()
  }
}

const handleContextMenu = (event) => {
  event.preventDefault()
}

const toggleFilling = () => {
  if(filling) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Go and Fill Now"
  }
}

const changeStrokeStyle = (color) => {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  currentColor.style.backgroundColor= color;
}

Array.from(colors).forEach(color => {
  color.addEventListener("click", handleColorClick)
})

const rangeChanger = (event) => {
  lineWidth = ctx.lineWidth = range.value
}

const stopPainting = (event) => {
  painting = false
}

const startPainting = (event) => {
  painting = true;
}

const onMouseMove = (event) => {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY);

  }

  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
}

const onMouseDown = (event) => {
  painting = true
  console.log(event)
}

const onMouseUp = (event) => {
  stopPainting()
}

const onMouseLeave = (event) => {
  stopPainting()
}

const saveImage = () => {
  const image = canvas.toDataURL("image/jpeg")
  const link = document.createElement("a")
  link.href = image;
  link.download = "myPainting.jpg";
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", onMouseUp)
  canvas.addEventListener("mouseleave", onMouseLeave)
  range.addEventListener("change", rangeChanger)
  canvas.addEventListener("click", fillCanvas)
  mode.addEventListener("click", toggleFilling)
  saveBtn.addEventListener("click", saveImage)
  canvas.addEventListener("contextmenu", handleContextMenu)
}