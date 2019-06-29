# ES6 常用点和重点


### 模板字符串
+ 模板字符串的基本用法
```js
    var s1 = `abc`;
```

+ 模板字符串的优势
```js
    var obj = {name:"", age:25};
    var s1 = "我叫：" + obj.name + "， 今年：" + obj.age + "岁。"
```


### 解构赋值
+ 对象的解构赋值
```js
    var obj = {name:"张三", age:18};

    var {name, age} = obj;
    // 生成2个变量：
    //    name值来自于obj.name
    //    age值来自于obj.age

    var {name:title} = obj;
    // 生成一个新变量title，值=obj.name
```

+ 函数参数的解构赋值
```js
    function f1(obj) {
        console.log(obj.age);
        console.log(obj.height);
    }
    // 等价于
    function f1({ age, height }) {
        console.log(age);
        console.log(height);
    }

    f1({age:5, height:170});
```

+ 补充：属性的简写
```js
    var a = 3;
    var c = 10;
    var b = { a, c }; 
    // b对象有一个a属性，a属性的值，来自于a变量，
    // 还有一个c属性，c属性的值来自于c变量
    console.log(b);
```


### 函数的扩展
### rest参数
+ 使用背景：es6
+ 优点：arguments是伪数组，而rest参数是真数组
```js
    function fn(...args) {
        console.log(args);  // 数组：[1,2,3,4,5]
    }

    fn(1,2,3,4,5);
```


### 箭头函数
+ 场景：用于替换匿名函数
+ 基本用法：
```js
    div.onclick = () => {
        console.log("嘿嘿");
    }
```

+ 有1个参数的箭头函数
```js
    var f = name => {
        console.log(name);
    }
```

+ 有2个参数的箭头函数
```js
    var f = (a, b, c) => {
        console.log(`${a} ${b} ${c}`);
    }
```

+ 箭头函数和普通的匿名函数有哪些不同？
    - 函数内的this对象，就是定义时所在的对象，不是使用时所在的对象。
    - 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出错误。
    - 不可以使用arguments对象，该对象在函数内不存在。如果要用，可以用rest参数代替。
    - （不常用）不可以使用yield命令，因此箭头函数不能用作 Generator 函数
        - generator函数现在用async替代
    - 普通的匿名函数，或者说有名函数，都能决定函数内部的this的值，而箭头函数不能决定内部this的值


### babel兼容es代码
+ babel：https://www.babeljs.cn/  （将新版本的es代码转换为旧版本的es代码）
+ vue-cli内置了babel，若需要可以修改兼容版本


### 补充：判断数据类型
+ typeof
    - typeof只能判断：数字、字符串、Boolean、undefined、函数
+ `Object.prototype.toString.call()`
    - 5  '[object Number]'
    - "abc"  '[object String]'
    - true  '[object Boolean]'
    - null  '[object Null]'
    - undefined  '[object Undefined]'
    - [1,2,3]  '[object Array]'
    - function(){}  '[object Function]'
    - new Date()  '[object Date]'
    - /abc/  '[object RegExp]'


### this指向window实例的
```js
    $.ajax({
        success : function() {
            console.log(this); // this 指向window
        }
    })
```

```js
    [1,2,3].map( function() {
        console.log(this); // this 也指向window
    } )
```


### 对象的扩展
+ Object.assign：实现拷贝继承
+ 对象扩展运算符
```js
    var obj1 = { age:5, gender:"男"};
    var obj2 = { ...obj1 };
    var obj3 = { ...obj1, age:100 };
```



### Promise（es6及以上支持）
+ Promise：解决回调地狱的问题

### 回调地狱
```js
    // 跟以前的 if 条件地狱类似
    // if(){
    //     if(){
    //         if(){
    //             if(){
    //                 if(){
    //                     if(){

    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    $.get("/getUser", function(res){
        $.get("/getUserDetail", function(){
            $.get("/getCart", function(){
                $.get("/getBooks", function(){
                    // ...
                })
            })
        })
    })
```

### Promise的基本用法
```js
    var promise = new Promise( (resolve, reject) => {
        // 把异步操作放在这里
        $.get("/getUser", res => {
            // 返回的数据通过resolve()告诉外界
            // 要执行的下一步操作，写在then()的回调函数中
            resolve(res);
        });
    } );

    promise.then( res => {
        console.log(res);
    } );
```



### async
+ async其实是Promise的语法糖
+ async是es8的内容

```js
    async function get() {
        console.log("开始执行");
        var res = await timer();
        console.log("执行结束", res);
    }

    function timer() {
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                resolve("你好");
            }, 1000)
        })
    }

    get();
```

+ await可以执行异步操作，但await必须在async函数内部执行
+ await操作可以有返回值，这个返回值表示Promise操作成功的返回值
+ 如果await里面执行的异步操作发生了reject，或者发生了错误，只能使用try...catch...进行错误处理



### class

### 定义一个类
```js
    class Student {
        // 构造函数
        constructor(name) {
            this.name = name; 
        }
    }
    // ---> 相当于
    function Student(name) {
        this.name = name;
    }

```


### 添加实例方法
```js
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        // 定义方法
        say() {
            console.log(`我叫：${this.name}，今年${this.age}岁`);
        }

        travel() {
            console.log("去旅行");
        }
    }
```


### 添加静态方法
+ 静态成员：静态属性和静态方法
+ 静态属性：通过类本身来访问的：Person.maxAge
+ 静态方法：通过类本身来访问的一个方法：Person.born()

```js
    class Animal {
        constructor() {

        }

        // 声明一个静态方法
        static born() {
            console.log("小动物出生了");
        }
    }

    // 访问静态方法
    Animal.born();
```


### 类的继承
```js
    class Person {
        constructor(name) {
            this.name = name;
        }
    }

    // Student类继承自Person类
    class Student extends Person {
        // 构造方法
        constructor(name, grade) {
            // 规定：必须调用父类构造方法，如果不调用则报错
            // 调用父类构造方法，从而给子类的实例添加name属性
            super(name);
            this.grade = grade;
        }
    }
```



```js
    [1,3,5].map(function(value, index) {

    })


    [1,3,5].map( (value, index) => {

    })

    // 以前变量和字符串拼接，现在用模板字符串
```



### module























