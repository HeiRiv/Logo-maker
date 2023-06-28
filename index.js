const readline = require("readline");
const svgCaptcha = require("svg-captcha");
const svg2png = require("svg2png");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question("Enter the text for your logo: ", (text) => {
    rl.question(
      "Select a color for your logo (red/blue/green/yellow): ",
      (color) => {
        rl.question(
          "Select a shape for your logo (circle/square/triangle): ",
          (shape) => {
            generateLogo(text, color, shape);
            rl.close();
          }
        );
      }
    );
  });
}

function generateLogo(text, color, shape) {
  const captcha = svgCaptcha.create({ text, size: 4 });
  const svg = captcha.data;
  let newShape = "";

  if (shape == "circle") {
    newShape = `<circle cx="100" cy="100" r="100" fill="${color}"/> `;
  } else if (shape == "square") {
    newShape = `<rect x="100" y="100" width="200" height="200" fill="${color}"/>`;
  } else if (shape == "triangle") {
    newShape = `<polygon points="200,10 250,190 160,210" fill="${color}"/>`;
  }

  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      ${newShape} <text x="125" y="125"> ${text} </text>
    </svg>`;

  const fileName = `${text.toLowerCase().replace(/ /g, "_")}.svg`;
  const pngFileName = `${text.toLowerCase().replace(/ /g, "_")}.png`;

  fs.writeFileSync(fileName, logo);
  svg2png.sync(fs.readFileSync(fileName), pngFileName);

  console.log(`Logo saved as ${fileName} and ${pngFileName}!`);
}

promptUser();
