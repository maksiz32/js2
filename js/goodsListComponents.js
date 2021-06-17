Vue.component('goods-list', {
    props: ['goods', 'error-text'],
    template: `<section class="hide goods-list">
                    <goods-item v-if="$parent.isConnect" v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
                    <connect-error v-else :error-text="errorText"></connect-error>
                </section>`,
    // mounted() {
    //     console.log($parent.isConnect);
    // }
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
                <div class="goods-item">
                    <img class="goods-item-pic" v-if="good.img" :src="img/good.img" alt="good.img" width="120" height="100">
                    <img v-else class="goods-item-pic" src="img/nophoto.png" alt="nophoto.png" width="120" height="100">
                    <h3>{{good.product_name}}</h3>
                    <p>{{$root.formatPrice(good.price)}}</p>
                    <button type="button" class="goods-item-btn" @click="$root.addProduct(good)">
                        Купить
                    </button>
                </div>
                `
});