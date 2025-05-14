export {}

//Arrays
let list1:number[] = [1,2,3]
let list2:Array<number> = [1,2,3,4]

console.log(list1[1])

//Tuple
  let tuple1:[number,string]
  tuple1 = [10,"hello"];

 //Enum 
 enum Color {Blue,Green,Red}
//  let c:Color = Color.Green
 let d:Color = Color.Red
console.log(d)
let colorName:string =Color[0]
console.log(colorName)

//UnKnown
let notSure:unknown = 4;

//Any
let anyVal: any

anyVal=10
anyVal = false

//Void
function myFun():void{
    console.log('No return of this funcion')
}

//Union Types
let peopleAllowed:number | boolean;
peopleAllowed =10;
peopleAllowed = true