function echo<T>(args: T): T {
  return args
}

const result = echo('str'); // 传入string 返回string

function swap<T, U>(tuple: [T, U]): [U, T] { // 传入T,U 返回U, T
  return [tuple[1], tuple[0]]
}

// 约束泛型
interface IWithLength {
  length: number;
}

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)

  return arg
}

function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)

  return arg
}



class Queue<T> {
  private data = [];

  push(item: T) {
    return this.data.push(item);
  }

  pop(): T {
    return this.data.shift()
  }
}

const queue = new Queue<number>();

queue.push(1)
console.log(queue.pop().toFixed())

const queue2 = new Queue<string>();

queue2.push("str")
console.log(queue2.pop())

interface KeyPair<T, U> {
  key: T;
  value: U
}
let kp1: KeyPair<number, string> = { key: 1, value: "str" }