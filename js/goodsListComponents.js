Vue.component('goods-list', {
    props: ['goods'],
    template: `<section class="hide goods-list">
                    <connect-error v-if="goods.lenght < 1"></connect-error>
                    <goods-item v-else v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
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