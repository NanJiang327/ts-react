enum Direction {
  Up,
  Down = "DOWN",
  Left = "LEft",
  Right = "RIGHT"
}
// 编译后
// (function (Direction) {
//   Direction[Direction["Up"] = 0] = "Up";
//   Direction["Down"] = "DOWN";
//   Direction["Left"] = "LEft";
//   Direction["Right"] = "RIGHT";
// })(Direction || (Direction = {}));
// const value = "Up";
// if (value === Direction.up) {
// }

// 常量枚举 - 提升性能
const enum ConstDirection {
  Up,
  Down,
  Left,
  Right
}
// const value = "Up";
// if (value === ConstDirection.up) {
// }

// 编译后
// if (value === "Up") {
// }

console.log(Direction[0]) // Up
console.log(Direction.Down) // 1