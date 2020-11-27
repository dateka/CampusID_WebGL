// lien couleur : https://thebookofshaders.com/02/ 

import * as Line from "./webgl-line.js";
// ligne.default.line();

import * as Circle from "./webgl-circle.js";
// circle.default.drawCircle();

import * as RainbowSquare from "./webgl-rainbow-square.js";
// RainbowSquare.default.rainbowSquare();

import * as Rectangle from "./webgl-rectangle.js";
// Rectangle.default.drawRectangle();

import * as Square from "./webgl-square.js";
// Square.default.drawSquare();

import * as Triangle from "./webgl-triangle.js";
//Triangle.default.drawTriangle();

const form = 'Circle';


switch (form) {
  case 'Circle':

    var colorRGB = [0.004, 0.036, 0.128, 1.0];

    var positions = [50,50,45]; //x , y , r 

    Circle.default.drawCircle(positions,colorRGB);

    break;

  case 'Line':

    var vertices = [
      -0.7,-0.1,0,
      -0.3,0.6,0,
      -0.3,-0.3,0,
      0.2,0.6,0,
      0.3,-0.3,0,
      0.7,0.6,0
     ];

    var colorRGB = [0.0, 0.0, 0.0, 0.1];
    Line.default.line(vertices,colorRGB);

    break;

  case 'Square':
    var positions = [
      1.0,  1.0,
     -1.0,  1.0,
      1.0, -1.0,
     -1.0, -1.0,
   ];

   var colorRGB = [100.0, 25.0, 5.0, 1.0];

    Square.default.drawSquare(positions,colorRGB);

    break;


  case 'Rainbow Square':
    RainbowSquare.default.rainbowSquare();
    break;

  case 'Rectangle':

    var positions = [
      1,  0.5,
     -1,  0.5,
      1, -0.5,
     -1., -0.5,
   ]; 

    var colorRGB =[0.042, 0.128, .004, 1.0];

    Rectangle.default.drawRectangle(positions,colorRGB);

    break;


  case 'Triangle':
    var vertices = [
      0.0, 1.0, 0,
      -1.0, 0.0, 0,
      1.0, 0.0, 0
    ]

     var colorRGB =[255.0, 62.0, 135.0, 0.1]
    Triangle.default.drawTriangle(vertices,colorRGB);

    break;


  default:
    console.log(`Excuse-moi on ne connais pas la forme ${expr}.`);
}