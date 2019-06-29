

+ 基本数据类型——值类型：
    数字、字符串、boolean、undefined、null

+ 复杂数据类型——引用类型：
    对象、数组、函数、Date、正则表达式 等


### 创建对象
```js
    var student = {
        name : "哈哈",
        grade : "初一"
        say : function() {
            console.log("你好");
        },
        run : function(speed) {
            console.log(speed + "米/秒");
        }

    }
```

### 对象的属性操作
```js
        student.name  // 获取属性值
        stduent.say   // 获取函数
```

```js
        student["name"]  // 等价于 student.name
        stduent["say"]   // 等价于 student.say
```

+ .语法和[]语法差异
    - .后面不能使用js中的关键字，如 class、this、function等
    - .后面不能使用数字

```js
        var obj = {}
        obj.this = 5; // 语法错误
        obj.1 = 10; // 语法错误
```

+ []语法使用更广泛
    - obj["变量name"]
    - ["class"] ["this"]都可以随意使用 `obj["this"] = 10`
    - [0]、[1]、[2]也可以用
        - `obj[3]=50 等价于 obj["3"]=50`
    - 可以这样用：["{abc}"]
        - 给对象添加了{abc}属性


### 设置属性
+ `student["gender"]="男"` 等价于 `student.gender='男'`
    - 有gender属性，设置gender属性值为"男"
    - 没有gender属性，添加gender属性，值为"男"

```js
        student.toShangHai = function() {
            console.log("去上海");
        }
```


### 删除属性
+ delete student["gender"]  等价于  delete student.gender


### 用构造函数创建对象
+ var h = new Object()
+ var now = new Date()
+ var arr = new Array(1, 2, 3)


### 构造函数的概念
+ 任何函数都可以当成构造函数
    ` function createFunc() {} `
+ 只要把一个函数通过new的方式来调用，我们就把这次函数的调用称为构造函数的调用
    - new createFunc();  -- 构造函数的调用
    - createFunc(); -- 普通函数的调用


### 关于 new Object()
+ new Object()等同于对象字面量{}
+ 一个函数通过new调用，或者不通过new调用，会有截然不同的返回值


### 构造函数的执行过程
`var p = new Person()`
+ 1、创建一个对象_p （Person构造函数实例）
+ 2、创建一个内部对象，`this`，将this指向该实例_p
+ 3、执行函数内的代码，this的部分就是操作实例_p
+ 4、返回值：
    - a、构造函数没有返回值（没有return语句），默认返回实例_p
    - b、返回基本数据类型的值，则构造函数的返回值是该实例_p
    ```js
        function fn() {
            
        }
        var f1 = new fn(); // f1就是fn()的实例

        function fn2() {
            return "abc";
        }
        var f2 = new fn2(); // f2是fn2()的实例
    ```
    - c、返回复杂数据类型的值，则本次构造函数的返回值就是该值
    ```js
        function fn3() {
            return [1, 2, 3]; // 数组是一个复杂数据类型，构造函数的返回值就是该数组
        }
        var f3 = new fn3(); // f3是数组对象，值为[1,2,3]，f3不再是fn3()的实例
    ```
+ 5、如何分辨一个对象到底是不是某个构造函数的实例？
    ```js
        function Person() {

        }
        var p1 = new Person();
        consolo.log(p1 instanceof Person); // true，是Person的实例


        function Student() {
            return 100;
        }
        var s1 = new Student();
        console.log(s1 instanceof Student); // true, 是Student的实例


        function Programmer() {
            return [1,2,3];
        }
        var pro = new Programmer(); // pro并不是programmer的实例
        console.log(pro instanceof Programmer); // false
        console.log(pro instanceof Array); // true
    ```
+ 6、typeof运算符
    - typeof只能判断：数字、字符串、boolean、undefined
    - typeof null === "object"
    - typeof {} === "object"
    - typeof [] === "object"
    - typeof function(){} === "function"
    - 不要使用typeof运算符来判断对象的构造函数


### 继承
+ 通过【某种方式】让一个对象可以访问到另一个对象中的属性和方法，将这种方法称为继承，并不是 `xxx extends yyy`
+ 所有的对象最终都继承自Object，但并不是Object直接创建的


### 继承的第一种方式：原型链继承1
```js
    Person.prototype.run = function() {
        console.log("speed is 50km/h");
    }
```
+ 缺点：添加1、2个方法无所谓，若方法过多，会导致代码冗余


### 继承的第二种方式：原型链继承2
```js
    Person.prototype = {
        constructor: Person, // 切记：constructor属性不能忘记！
        say: function() {
            console.log("说话");
        }
    }
```
+ 注意点：
    - a、一般情况下，先改变原型，再创建对象
    - b、一般情况下，对于新原型，会添加一个constructor属性，从而不破坏原有的原型对象结构


### 继承的第三种方式：拷贝继承（混入继承）
+ 使用场景：有时候要使用某个对象的属性，但又不能直接修改它，于是可以创建一个该对象的拷贝
+ 实际运用：
    - jquery: $.extend，编写jquery插件的必须
        - 基于jquery封装一个表格控件

```js
    var o1 = {age : 2};
    var o2 = o1;
    o2.age = 18;
    // 修改了o2对象的age属性
    // 由于o2对象跟o1是同一个对象
    // 此时，o1的age属性也被修改为18
```
```js
    var o3 = {gender:"男", grade:"初三", name:"张三"};
    var o4 = {gender:"男", grade:"初三", name:"李四"};
    // 上述代码，可以使用拷贝继承对代码进行优化

    // 实现拷贝继承
    // 1、已经拥有了o3对象
    // 2、创建一个o3对象的拷贝（克隆）：for ... in 循环
    // 3、修改克隆对象，把该对象的name属性改为"李四"
```

+ 浅拷贝和深拷贝
    - 浅拷贝只是拷贝一层属性，没有内部对象
    - 深拷贝利用递归，将对象的若干层属性拷贝出来
    ```js
        var students = {
            {name : "", age : ""},
            {name : "", age : ""}
        }
    ```

+ es6中有 <对象扩展运算符> ，为拷贝继承设计的：
    - 优点：非常简单
```js
    var source = {name:"张三", age:15};
    // 让新对象target，同时拥有了name、age属性
    var target = { ...source }

    var target2 = { ...source, age:20 } // 拷贝继承的同时，修改新对象target2的属性age为20
```

+ Object.assign()也是一种拷贝继承的实现方式（浅拷贝）


### 继承的第四种方式：原型式继承
+ 场景：
    - a、创建一个纯洁的对象：对象什么属性都没有
    - b、创建一个继承自某个父对象的子对象
        ```js
            var parent = {age:18, gender:"男"};
            var student = Object.create(parent);
            // student.__proto__ == parent
        ```
+ 使用方式：
    - 空对象：Object.create(null)
    - 
        ```js
            var o1 = { say : function(){} };
            var o2 = Object.create(o1);
        ```


### 继承的第五种方式：借用构造函数实现继承
+ 场景：适用于2种构造函数之间逻辑有相似的情况
+ 原理：使用了函数的call、apply调用方式

```js
    function Animal(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    function Person(name, age, gender, say) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.say = say;
    }
```

+ 局限性：Animal（父类构造函数）的代码必须完全适用于Person（子类构造函数）

+ 以上代码借用构造函数实现
```js
    function Animal(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    function Person(name, age, gender, say) {
        Animal.call(this, name, age, gender);
        this.say = say;
    }
```

+ 寄生继承、寄生组合继承


### 原型链（家族族谱）
+ 概念：JS里面的对象可能有父对象，父对象还有父对象。。。。。。祖先

+ 根本：继承
    - 属性：对象中几乎都有一个__proto__属性，该属性指向它的父对象
    - 意义：可以让该对象访问到父对象中的相关属性

+ 根对象：Object.prototype
    - var arr = [1,2,3]
    - arr.__proto__： Array.prototype
    - arr.__proto__.__proto__：根对象

    ```js
        function Animal() { }
        var cat = new Animal()
        cat.__proto__ === Animal.prototype
        cat.__proto__.__proto__ === Object.prototype
    ```

+ 错误的理解：万物继承自Object？
    - 应该继承自 Object.prototype


### 闭包

### 变量作用域
+ 概念：一个变量可以使用的范围
+ JS中首先有一个最外层的作用域：全局作用域
+ JS中能通过函数创建一个独立的作用域，函数可以嵌套，作用域也可以嵌套
+ 若声明了一个全局变量，这个全局变量自然而然变成了window对象上的属性

```js
    var age = 18; // 全局变量

    function f1() {
        console.log(name); // 可以访问到name变量

        var name = "哈哈"; // name是f1()内部声明的变量，name的作用域是f1()函数内部

        console.log(name); // 也可以访问到name变量

        console.log(age); // age是全局作用域中声明的，age可以访问
    }

    console.log(age); // age也可以访问
```

```js
    /* 多级作用域 */

    // 1级作用域
    var gender = "男"; 

    function ff() {
        // 2级作用域

        // gender可以访问，age可以访问，height不能访问

        return function() {
            // 3级作用域

            // gender可以访问，age可以访问，height可以访问
            console.log(gender); // 通过一级一级作用域的查找，发现gender是全局作用域中声明的变量

            var height = 100;
        }

        var age = 5;
    }
```


### 作用域链
+ 作用域相对变量而言的，若存在多级作用域，变量又来自于哪里？变量的查找过程称为变量的作用域链
+ 作用域链的意义：查找变量（确定变量来自于哪里，确定变量是否可以访问）
+ 作用域链可以用以下几句话概括：
    - 查看当前作用域，若当前作用域声明了变量，则确定结果
    - 查找当前作用域的上级作用域，即当前函数的上级函数，看是否声明
    - 递归向上，直到全局作用域为止
    - 若全局作用域中也没有，则该变量未声明（xxx is not defined）

+ 举例1：
```js
    var name = "张三";
    function f1() {
        var name = "abc";
        console.log(name);
    }

    f1();
```

+ 举例2：
```js
    var name = "张三";
    function f1() {
        console.log(name);
        var name = "abc";
    }

    f1();
```

+ 举例3：
```js
    var name = "张三";
    function f1() {
        return function() {
            console.log(name);
        }
        var name = "abc";
    }

    var fn = f1();
    fn();
```

+ 举例4：
```js
    var name = "张三";
    function f1() {
        return {
            say : function() {
                console.log(name);
                var name = "abc";
            }
        }
    }

    var fn = f1();
```


### 闭包的问题
```js
    function fn() {
        var a = 5;
        return function() {
            a++;
            console.log(a);
        }
    }

    var f1 = fn();
    f1();
    f1();
    f1();
```


### 闭包问题的产生原因
+ 函数执行完毕后，作用域中保留了最新的a变量的值


### 闭包的应用场景
+ 模块化
+ 防止变量被破坏


### 函数的4种调用方式
+ 在`ES6之前`，函数内部的this是由该函数的调用方式决定的
    - 函数内部的this跟大小写、书写位置无关

+ 1、函数调用
```js
    var age = 18;
    var p = {
        age : 15,
        say : function() {
            console.log(this.age);
        }
    }

    var s1 = p.say();
    s1(); // 函数调用, this指向window，window.age = 18
```

+ 2、方法调用
```js
    var age = 18;
    var p = {
        age : 15,
        say : function() {
            console.log(this.age);
        }
    }

    p.say(); // 方法调用, this指向p实例，p.age = 18
```
+ window对象中的属性都是全局变量，window中的方法都是全局函数

+ 3、new调用（构造函数）
```js
    var age = 18;
    var p = {
        age : 15,
        say : function() {
            console.log(this.age);
        }
    }

    new p.say(); // new调用（构造函数调用）
    // ---> 相当于
    var s1 = p.say
    new s1(); // say()构造函数的实例中并没有age属性，this.age值为undefined，打印出undefined
```

+ 4、上下文方式（call、apply、bind）
```js
    var len = 21;
    function f1() {
        console.log(this.len);
    }

    f1.call([1,2,3]); // 打印出3
    f1.apply(this);   // this 指向 window实例，window.len=21，打印出21
    f1.call(5);       // 打印出 undefined
```

+ 在ES6的箭头函数出现之前，要判断一个函数内部的this指向谁，就根据上面的四种方式来决定



### ES6内容划重点
+ 解构赋值
+ 函数的rest参数
+ 箭头函数
    - 箭头函数和普通函数有哪些不同？(4点)
+ 对象的Object.assign()
+ Promise
+ Generator
+ async
+ class
+ module


### 原型
+ 原型很多人开发用不到？
    - 用es6/7/8开发，原型用的比较少
    - 若用es5之前的版本开发（IE8、IE7...），可能天天都要写原型
    - 理解了原型，才是理解了JS面向对象的核心，没有理解原型，就没有理解面向对象的核心
+ 类继承，本质上还是用原型继承来实现的


### 对象的属性查找规则
  ---> 1、首先查看本身有没有length属性
  ---> 2、如果本身没有该属性，就去它的原型对象中查找
  ---> 3、如果原型对象中没有，就去原型对象的原型对象中查找，最终一直找到根对象 (Object.prototype)
  ---> 4、最终都没有找到的话，则该对象并没有该属性，值为 undefined


### global和window的区别
+ global是es中全局作用域中的根对象
    - 但在nodejs中，global全是全局变量的载体
    - 浏览器端的js里，全局变量都放在了window中，浏览器中不存在global对象






























