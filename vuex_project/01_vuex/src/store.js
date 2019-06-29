import Vue from 'vue';
import Vuex from 'vuex';

// 安装Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        num: 1
    },

    // 获取器，获取state中的变量
    getters: {
        getNum(state) {
            return state.num;
        },

        getText(state) {
            return `[[${state.num}]]`;
        },

        getName(state) {
            return state.name;
        }
    },

    // 修改器，更新state中的变量，传入state对象
    mutations: {
        addNum(state) {
            state.num += 1;
        }, 

        // 接收参数 (state, data)，但只能接收1个参数，可以是对象、数组、数字等
        addByNum(state, data) {
            state.num += data;
        },

        // mutations修改state的变量只能是同步操作，异步操作会出问题
        // addByNumAsync(state, data) {
        //     // 尝试异步操作
        //     setTimeout(() => {
        //         state.num += data;
        //     }, 1000);
        // }

        addProps(state, data) {
            // state.name = data; // 直接添加不行，需要进行数据的响应式双向绑定

            Vue.set(state, 'name', data); // 动态添加name属性，并进行数据的双向绑定
        }
    },

    // actions中传入的是store实例对象
    actions: {
        // $store.getters || commit || state
        addByNumAsync(store, data) {
            // 异步操作在action中完成，调用mutations中的函数
            setTimeout(() => {
                store.commit('addByNum', data);
            }, 1000);
        },

        addProps({commit}, data) { // commit是解构赋值
            commit('addProps', data);
        }
    }
})















