Vue.component('basket', {
    props: ['items'],
    template: `
            <div class="basket">
                <div v-if="items.length < 1" class="basket-item">
                    Корзина пуста
                </div>
                <div v-else>
                    <basket-items v-for="item of items" :key="item.id_product" :item="item"></basket-items>
                    <div class="basket-item totalText">Итого: {{ $root.formatPrice($root.totalBasketAmount()) }}</div>
                </div>
            </div>
            `
});

Vue.component('basket-items', {
    props: ['item'],
    template: `
                <div class="basket-item">
                    <span>{{ item.product_name }}</span>
                    <span>{{ item.quantity }}</span>
                    <span>{{ $root.formatPrice(item.price) }}</span>
                    <span>
                        <strong>Итого: {{ $root.formatPrice(item.price * item.quantity) }}</strong>
                    </span>
                    <button class="basket-item-btn plus" @click="$root.addProduct(item)"> + </button>
                    <button class="basket-item-btn minus" @click="$root.delProduct(item)"> - </button>
                </div>
                `
})