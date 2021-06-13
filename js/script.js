const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        basketItems: []
    },
    methods: {
        makeGETRequest(url) {
            return fetch(url)
                    .then(text => text.json())
                    .catch(error => console.log(error));
        },
        FilterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        totalBasketAmount() {
            return this.basketItems.reduce((summ, el) => summ += (el.price * el.quantity), 0);
        },
        addProduct(item) {
            let search = this.basketItems.find(elem => elem.id_product == item.id_product);
            if(search) {
                search.quantity++;
            } else {
                //Добавить в item свойство quantity: 1, которого нет в этом объекте
                const unit = Object.assign({quantity: 1}, item);
                this.basketItems.push(unit);
            }
        },
        delProduct(item) {
            let search = this.basketItems.find(elem => elem.id_product == item.id_product);
            if(search.quantity > 1) {
                search.quantity--;
            } else {
                this.basketItems.splice(this.basketItems.indexOf(search), 1);
            }
        }
    },                                                                              
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then(data => {
                this.goods = [...data];
                this.filteredGoods = [...data];
            });
        this.makeGETRequest(`${API_URL}/getBasket.json`)
            .then(data => {
                this.basketItems = [...data.contents];
            });
    }
})

// class GoodsItem {
//     constructor(title, price, img = 'nophoto.png') {
//         this.product_name = title;
//         this.price = price;
//         this.img = img
//     }
//     render() {
//         return `<div class="goods-item">
//                     <img class="goods-item-pic" src="img/${this.img}" alt="${this.img}" width="120" height="100">
//                     <h3 class="goods-item-title">${this.product_name}</h3>
//                     <p class="goods-item-price">${this.price}</p>
//                     <button type="button" class="goods-item-btn"
//                     data-name="${this.product_name}" data-price="${this.price}">
//                         Добавить
//                     </button>
//                 </div>`;
//     }
// }

// class GoodsList {
//     constructor() {
//         this.goods = [];
//         this.bask = bask;
//         this.selector = '.goods-list';
//         this.filteredGoods = [];
//     }
//     fetchGoods() {
//         makeGETRequest(`${API_URL}/catalogData.json`)
//             .then(data => {
//                 this.goods = [...data];
//                 this.filteredGoods = [...data];
//                 this.render();
//                 this.sumAllGoods();
//             });
//     }
//     render() {
//         let listHtml = '';
//         this.filteredGoods.forEach(good => {
//             const goodItem = new GoodsItem(good.product_name, good.price);
//             listHtml += goodItem.render();
//         });
//         document.querySelector(this.selector).innerHTML = listHtml;

//         document.querySelector(this.selector).addEventListener('click', el => {
//             if(el.target.classList.contains('goods-item-btn')) {
//                 let {name, price} = el.target.dataset;
//                 let item = new ItemInBasket(name, price);
//                 this.bask.addItem(item);
//             }
//         })
//     }
//     sumAllGoods() {
//         let sum = this.goods.reduce((summ, el) => summ += el.price, 0);
//         const totalPrice = `<div class="goods-total">Итого: ${sum} руб</div>`;
//         document.querySelector(this.selector).insertAdjacentHTML('afterend', totalPrice);
//     }
//     filterGoods(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
//         this.render();
//     }
// }

// class Basket {
//     constructor() {
//         this.items = [];
//         this.init();
//         this.fetchItems();
//     }
//     fetchItems() {
//         makeGETRequest(`${API_URL}/getBasket.json`)
//             .then(data => {
//                 const outerbasket = [...data.contents];
//                 outerbasket.forEach(el => this.addItem(el));
//             });
//     }
//     init() {
//         document.querySelector('.cart-button').addEventListener('click', function() {
//             if(!document.querySelector('.modal-window')) {
//                 const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 511.76 511.76" class="modal-close">
//                         <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z" data-original="#000000" style="" class=""/>
//                     </svg>`;
//                 document.querySelector('body').insertAdjacentHTML('afterBegin', `<div class="modal-window">${svg}</div>`);
//                 bask.render();
//             }
//             document.querySelector('.modal-close').addEventListener('click', function() {
//                 document.querySelector('.modal-window').remove();
//             })
//         })
//     }
//     addItem(el) {
//         let search = this.items.find(elem => elem.product_name == el.product_name);
//         if(search) {
//             search.quantity++;
//             this.renderItems('.basket');
//         } else {
//             this.items.push(el);
//         }
//     }
//     delItem(el) {
//         let search = this.items.find(elem => elem.product_name == el.product_name);
//         if(search.quantity > 1) {
//             search.quantity--;
//             this.renderItems('.basket');
//         } else {
//             this.items.splice(this.items.indexOf(search), 1);
//             this.renderItems('.basket');
//         }
//     }
//     render() {
//         let listHtml = '<div class="basket"></div>';
//         document.querySelector('.modal-window').insertAdjacentHTML('beforeEnd', listHtml);

//         this.renderItems('.basket');

//         document.querySelector('.basket').addEventListener('click', el => {
//             if(el.target.classList.contains('plus')) {
//                 let {name, price} = el.target.dataset;
//                 let item = new ItemInBasket(name, price);
//                 this.addItem(item);
//             }
//             if(el.target.classList.contains('minus')) {
//                 let {name, price} = el.target.dataset;
//                 let item = new ItemInBasket(name, price);
//                 this.delItem(item);
//             }
//         })
//     }
//     renderItems(selector) {
//         let rej = '';
//         this.items.forEach(item => {
//             const goodItem = new ItemInBasket(item.product_name, item.price, item.quantity);
//             rej += goodItem.render();
//         });
//         const block = document.querySelector(selector);
//         if(block) {
//             block.innerHTML = rej;
//         }
//         this.totalPrice('.basket');
//     }
//     totalPrice(sel) {
//         let res = this.items.reduce((sum, cur) => sum + cur.price * cur.quantity, 0);
        
//         let listHt = `Итого: ${res} руб`;
//         const bas = document.querySelector(sel);
//         if(bas) {
//             const tot = document.createElement('div');
//             tot.classList.add('basket-item');
//             bas.appendChild(tot);
//             tot.innerHTML = listHt;
//         }
//     }
// }

// class ItemInBasket {
//     constructor(title, price, count = 1) {
//         this.product_name = title;
//         this.price = price;
//         this.quantity = count;
//     }
//     render() {
//         return `<div class="basket-item">
//                     <span>${this.product_name}</span>
//                     <span>${this.quantity}</span>
//                     <span>${this.price}</span>
//                     <button class="basket-item-btn plus" 
//                     data-name="${this.product_name}" data-price="${this.price}"> + </button>
//                     <button class="basket-item-btn minus" 
//                     data-name="${this.product_name}" data-price="${this.price}"> - </button>
//                 </div>`;
//     }
// }

// bask = new Basket();
// const list = new GoodsList(bask);
// list.fetchGoods();

// function makeGETRequest(url) {
//     return fetch(url)
//             .then(text => text.json());
// }

// document.querySelector('.goods-search').addEventListener('input', (e) => {
//     list.filterGoods(e.target.value);
// });

