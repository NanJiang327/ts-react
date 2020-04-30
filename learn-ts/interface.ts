// interface
/*
* 对对象的形状进行描述, 对类进行抽象
*/
interface IPerson {
  readonly id: number;
  name: string;
  age: number;
  gender?: string;
};

var Aaron: IPerson = {
  id: 111,
  name: "Aaron",
  age: 20
};

interface Radio {
  switchRadio(): void;
}

interface Battery {
  checkBatteryStatus();
}

interface RadioWithBattery extends Radio {
  checkBatteryStatus();
}

class Car implements Radio {
  switchRadio() {

  }
}

class Cellphone implements RadioWithBattery {
  switchRadio() {

  }

  checkBatteryStatus() {

  }
}