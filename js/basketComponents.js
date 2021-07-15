Vue.component('basket', {
    props: ['items'],
    data() {
        return {
            countBasket: 0
        }
    },
    methods: {
        delProduct(item) {
            let search = this.items.find(elem => elem.id_product === item.id_product);
            if (search.quantity > 1) {
                this.$root.makePOSTRequest('/remoteFromCart', search)
                .then(data => {
                    if (data.result) {
                        search.quantity--;
                    }
                })
            } else {
                this.$root.makePOSTRequest('/remoteFromCart', item)
                .then(data => {
                    if (data.result) {
                        this.items.splice(this.items.indexOf(search), 1);
                    }
                })
            }
        },
        addProduct(item) {
            // let content = this.makeGETRequest(`/basketData`);
            let search = this.items.find(elem => elem.id_product === item.id_product);
            if(search) {
                this.$root.makePOSTRequest(`/addToCart`, search)
                    .then(data => {
                        if (data.result === 1) {
                            search.quantity++;
                        }
                    })
            } else {
                //Добавить в item свойство quantity: 1, которого нет в этом объекте
                const unit = Object.assign({quantity: 1}, item);
                
                this.$root.makePOSTRequest(`/addToCart`, unit)
                    .then(data => {
                        if (data.result) {
                            this.items.push(unit);
                        }
                    })
            }
        }
    },
    computed: {
        totalBasketAmount: function() {
            return this.items.reduce((summ, el) => summ += (el.price * el.quantity), 0);
        },
        totalBasketCount: function() {
            this.countBasket = this.items.reduce((sum, el) => sum += el.quantity, 0);
            this.$emit('count-basket', this.countBasket);
            return this.countBasket;
        }
    },
    mounted() {
        this.$root.$on('add-product', (item) => {
            this.addProduct(item);
        })
    },
    template: `
            <div class="basket">
                <div v-if="items.length < 1" class="basket-item">
                    Корзина пуста
                </div>
                <div v-else>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 511.76 511.76" class="modal-close" @click="$root.isVisibleCart = !$root.isVisibleCart">
                <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"></path>
            </svg>
                    <basket-items v-for="item of items" :key="item.id_product" :item="item" @add-product="addProduct" @del-product="delProduct"></basket-items>
                    <div class="basket-item totalText">Итого: {{$root.formatPrice(this.totalBasketAmount)}} руб.</div>
                    <div class="totalText totalCount">Всего товаров: {{this.totalBasketCount}} шт.</div>
                </div>
            </div>
            `
});

Vue.component('basket-items', {
    props: ['item'],
    template: `
                <div class="basket-item">
                    <span>{{ item.product_name }}</span>
                    <span>{{ item.quantity }} шт.</span>
                    <span>{{ $root.formatPrice(item.price) }} руб.</span>
                    <span>
                        <strong>Итого: {{ $root.formatPrice(item.price * item.quantity) }} руб.</strong>
                    </span>
                    <button class="basket-item-btn plus" @click="$emit('add-product', item)"> + </button>
                    <button class="basket-item-btn minus" @click="$emit('del-product', item)"> - </button>
                </div>
                `
})