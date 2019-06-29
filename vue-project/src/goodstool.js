let shopcartInfo = {
    goodsList: {}, // 存储用户选择的购物车商品信息 {id:number}

    // 添加购物车商品信息
    addShopcart({id, num}) {
        if(this.goodsList[id]) {
            this.goodsList[id] += num; // 追加同一个商品的购买数量
        }
        else {
            this.goodsList[id] = num;
        }
    },

    // 删除购物车商品信息
    deleteShopcart() {

    }
};

window.shopcartInfo = shopcartInfo; // 保存在window对象上

export default shopcartInfo;


