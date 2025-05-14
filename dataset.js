"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Arrays
var list1 = [1, 2, 3];
var list2 = [1, 2, 3, 4];
console.log(list1[1]);
//Tuple
var tuple1;
tuple1 = [10, "hello"];
//Enum 
var Color;
(function (Color) {
    Color[Color["Blue"] = 0] = "Blue";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Red"] = 2] = "Red";
})(Color || (Color = {}));
//  let c:Color = Color.Green
var d = Color.Red;
console.log(d);
var colorName = Color[0];
console.log(colorName);
