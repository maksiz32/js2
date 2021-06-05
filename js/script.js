const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(title, price, img = 'nophoto.png') {
        this.title = title;
        this.price = price;
        this.img = img
    }
    render() {
        return `<div class="goods-item">
                    <img class="goods-item-pic" src="img/${this.img}" alt="${this.img}" width="120" height="100">
                    <h3 class="goods-item-title">${this.title}</h3>
                    <p class="goods-item-price">${this.price}</p>
                    <button type="button" class="goods-item-btn"
                    data-name="${this.title}" data-price="${this.price}">
                        Добавить
                    </button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.selector = '.goods-list';
    }
    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`)
            .then(data => {
                this.goods = [...data];
                this.render();
                this.sumAllGoods();
            });
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector(this.selector).innerHTML = listHtml;

        document.querySelector(this.selector).addEventListener('click', el => {
            if(el.target.classList.contains('goods-item-btn')) {
                let item = new ItemInBasket(el.target.dataset['name'], el.target.dataset['price']);
                this.addItem(item);
            }
        })
    }
    addItem(el) {
        //
    }
    sumAllGoods() {
        let sum = this.goods.reduce((summ, el) => summ += el.price, 0);
        const totalPrice = `<div class="goods-total">Итого: ${sum} руб</div>`;
        document.querySelector(this.selector).insertAdjacentHTML('afterend', totalPrice);
    }
}

class Basket {
    constructor() {
        this.amount = 0;
        this.count = 0;
        this.items = [];
        this.init();
    }
    fetchItems() {
        makeGETRequest(`${API_URL}/getBasket.json`)
            .then(data => {
                this.amount = data.amount;
                this.count = data.countGoods;
                this.items = [...data.contents];
                this.render();
            });
    }
    init() {
        document.querySelector('.cart-button').addEventListener('click', function() {
            if(!document.querySelector('.modal-window')) {
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 511.76 511.76" class="modal-close">
                        <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z" data-original="#000000" style="" class=""/>
                    </svg>`;
                bask.fetchItems();
                document.querySelector('body').insertAdjacentHTML('afterBegin', `<div class="modal-window">${svg}</div>`);
            }
            document.querySelector('.modal-close').addEventListener('click', function() {
                document.querySelector('.modal-window').remove();
            })
        })
    }
    addItem(el) {
        let search = this.items.find(elem => elem.product_name == el.title);
        if(search) {
            search.quantity++;
            this.renderItems('.basket');
        } else {
            item = new ItemInBasket(el.product_name, el.price);
            this.amount = item.count;
            this.count = item.count;
            this.items = [...data.contents];
            this.render();
        }
    }
    delItem(el) {
        let search = this.items.find(elem => elem.product_name == el.title);
        if(search.quantity > 1) {
            search.quantity--;
            console.log(this.items);
            this.renderItems('.basket');
        } else {
            this.items.splice(this.items.indexOf(el), 1);
            this.renderItems('.basket');
        }
    }
    render() {
        let listHtml = '<div class="basket"></div>';
        document.querySelector('.modal-window').insertAdjacentHTML('beforeEnd', listHtml);

        this.renderItems('.basket');

        document.querySelector('.basket').addEventListener('click', el => {
            if(el.target.classList.contains('plus')) {
                let item = new ItemInBasket(el.target.dataset['name'], el.target.dataset['price']);
                this.addItem(item);
            }
            if(el.target.classList.contains('minus')) {
                let item = new ItemInBasket(el.target.dataset['name'], el.target.dataset['price']);
                this.delItem(item);
            }
        })
    }
    renderItems(selector) {
        let rej = '';
        this.items.forEach(item => {
            const goodItem = new ItemInBasket(item.product_name, item.price, item.quantity);
            rej += goodItem.render();
        });
        document.querySelector(selector).innerHTML = rej;
        this.totalPrice('.basket');
    }
    totalPrice(sel) {
        let res = this.items.reduce((sum, cur) => sum + cur.price * cur.quantity, 0);
        
        let listHt = `Итого: ${res} руб`;
        const bas = document.querySelector(sel);
        const tot = document.createElement('div');
        tot.classList.add('basket-item');
        bas.appendChild(tot);
        tot.innerHTML = listHt;
    }
}

class ItemInBasket {
    constructor(title, price, count = 1) {
        this.title = title;
        this.price = price;
        this.count = count;
    }
    render() {
        return `<div class="basket-item">
                    <span>${this.title}</span>
                    <span>${this.count}</span>
                    <span>${this.price}</span>
                    <button class="basket-item-btn plus" 
                    data-name="${this.title}" data-price="${this.price}"> + </button>
                    <button class="basket-item-btn minus" 
                    data-name="${this.title}" data-price="${this.price}"> - </button>
                </div>`;
    }
}

const list = new GoodsList();
list.fetchGoods();
bask = new Basket;

function makeGETRequest(url) {
    return fetch(url)
            .then(text => text.json());
}
  