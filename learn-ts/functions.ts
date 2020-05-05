// 函数
// 函数声明
function sum(x: number, y: number, fistName?: string /* 可选参数 */, lastName: string = "J" /* 默认参数 */, ...items: any[] /* 剩余参数 */): number {
  return x + y;
};

// 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。
var mySum = function (x: number, y: number): number {
return x + y;
};
// 如果需要我们手动给 mySum 添加类型，则应该是这样：
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
var mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
return x + y;
};

type SumFunc = (x: number, y: number) => number;

var mySum3: SumFunc = function (x: number, y: number): number {
  return x + y;
  };