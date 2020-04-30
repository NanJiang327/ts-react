// 类
class Animal {
  public name: string; // 所有人都可以访问
  private privateName: string; // 自由自身可以访问
  protected protectedName: string; // 子类可以访问
  readonly readOnlyName: string; // 只读属性
  static categoies: string[] = ['mammal', 'bird']
  static isAnimal(a) {
    return a instanceof Animal;
  }

  constructor(name: string) {
    this.name = name;
  };
  run() {
    return `${this.name} is running`;
  };
};

const snake = new Animal("lily");
console.log(snake.run());

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}

const xiaobao = new Dog("xiaobao")
console.log(xiaobao.run(), xiaobao.bark())

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }

  run() {
    return `Meow, ` + super.run();
  }
}

const mao = new Cat("mao");
console.log(mao.run());

console.log(Animal.categoies);