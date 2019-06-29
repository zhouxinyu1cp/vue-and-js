

### 模块化

### 若不用模块化编写，会产生以下问题：
+ 代码杂乱，不便于维护，不便于复用
+ 代码重复、逻辑重复
+ 全局变量污染
+ 不方便保护私有数据 (闭包)


### 模块化的基本实现：闭包的自调用函数
```js
    // 日期控件
    var DatePicker = (function() {
        return {
            init: function() {

            }
        }
    })();

    var ktv = (function() {

        return {
            pay: function() {

            },

            use: function() {

            }
        }
    })();
```


### AMD模块化 --> requireJS
+ AMD：async module define，异步模块定义
+ AMD就是requireJS实现的模块化解决方案


### 其他模块化解决方案
+ CommonJS：Node中使用的模块化解决方案
+ CMD(common module define)：seajs中提出的模块化解决方案
    - CMD可以认为是CommonJS的前端实现
    - seajs由阿里编写
    - seajs在2、3年前很火，去年开始已经停更
        - vue、angular、react已经集成了各自的模块化
        - es6模块化
        - webpack也有模块化的解决方案


### vue、angular、react已经将模块化思想植入框架里面


### node中的模块化
+ require("http").createServer()
+ require("fs").readFile()
+ require("common/type").doSth()


### 前端路由的意义
+ 1、通过路由将各个功能从url上就分辨出来了
    - /user/list
    - /user/3
    - /user/edit/3

+ 2、路由还可以进行前进、后退等导航操作


### 前端路由的实现方式
+ 1、监听window对象的hashchange事件
    - hash值：通过location.hash获取，获取的值以`#`开头
    - 也可以通过location.hash来设置hash值，设置的新hash值也要以`#`开头

+ 2、history对象：popState/pushState



### es6模块化

### 浏览器调试
```html
    <script type = "module">
        // 导入模块
    </script>
```

### 基本用法
```js

    // cart.js
    export default {
        name : "张三",
        age : 20
    }

    // index.js     
    import cart from "./cart.js"
    cart.name
    cart.age

```

### 导出模块
```js
    
    // cart.js
    export const age = 18;
    export function f1() {
        console.log("f1()");
    }
    // 默认返回值
    export default {
        init: function() {
            console.log("初始化");
        }
    }

    // index.js
    import cart, {age, f1} from "./cart.js"
    cart.init();
    age;
    f1();

```


### 导入模块
```js
    
    // index.js
    import cart as cartIndex from "./cart.js"
    import {age as AGE} from "./product.js"

    // 使用变量：cartIndex
    // 使用变量：AGE

```






















