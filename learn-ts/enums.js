var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEft";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
console.log(Direction[0]); // Up
console.log(Direction.Down); // 1
