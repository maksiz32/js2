Vue.component('goods-list', {
    props: ['goods', 'showOnStart'],
    computed: {
        sortedGoods() {
            if(this.goods.length > 0) {
                let goodsArray = this.goods.slice(0);
                // goodsArray.sort((a,b) => a-b);
                function compare(a,b) {
                    if(a.product_name.toLowerCase() < b.product_name.toLowerCase())
                        return -1;
                    if(a.product_name.toLowerCase() > b.product_name.toLowerCase())
                        return 1;
                    return 0;
                }
                return goodsArray.sort(compare);
            }
        }
    },
    template: `<section class="goods-list" v-bind:class="{'hide': showOnStart}">
                    <connect-error v-if="sortedGoods.lenght < 1"></connect-error>
                    <goods-item v-else v-for="good in sortedGoods" :good="good" :key="good.id_product"></goods-item>
                </section>`,
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
                <div class="goods-item">
                    <img class="goods-item-pic" v-if="good.img" :src=good.img alt="good.img" width="120" height="100">
                    <img v-else class="goods-item-pic" src="img/nophoto.png" alt="nophoto.png" width="120" height="100">
                    <h3>{{good.product_name}}</h3>
                    <p>{{$root.formatPrice(good.price)}} руб.</p>
                    <button type="button" class="goods-item-btn" @click="$root.$emit('add-product', good)">
                        Купить
                    </button>
                </div>
                `
});