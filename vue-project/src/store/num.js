
export default {
    state: {
        num: 0,
    },

    getters: {
        getNum(state) {
            return state.num;
        }
    },

    mutations: {
        addNum(state, data) {
            state.num += data;
        },

        changeNum(state, data) {
            state.num = data;
        }
    },

    // 异步操作
    actions: {
        addNumByAction({commit}, data) {
            commit('addNum', data);
        },

        changeNumByAction({commit}, data) {
            commit('changeNum', data);
        }
    }
};







