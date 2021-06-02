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
                    <button type="button" class="goods-item-btn">Добавить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
      this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    sumAllGoods() {
        let sum = this.goods.reduce((summ, el) => summ + el.price, 0);
        // this.goods.forEach(good => {
        //     sum += good.price;
        // })
        const totalPrice = `<div class="goods-total">Итого: ${sum} руб</div>`;
        document.querySelector('.goods-list').insertAdjacentHTML('afterend', totalPrice);
    }
}

class Basket extends GoodsList {
    fetchGoods(prod) {
        //
    }
    render() {
        //
    }
    totalPrice() {
        //
    }
}

class ItemInBasket extends GoodsItem {
    constructor() {
        this.count = 1;
    }
    plusCount() {
        //
    }
    minusCount() {
        //
    }
    sumPriceItems() {
        //
    }
    render() {
        return `<div class="basket-item">
                    <span>${this.title}</span><span>${this.count}</span><span>${this.price}</span>
                </div>`;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
bask = new Basket;

document.querySelector('.cart-button').addEventListener('click', function() {
    if(!document.querySelector('.modal-window')) {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40" viewBox="0 0 511.76 511.76" class="modal-close">
                <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z" data-original="#000000" style="" class=""/>
            </svg>`
        document.querySelector('body').insertAdjacentHTML('afterBegin', `<div class="modal-window">${svg} ${bask.render()}</div>`);
    }
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.querySelector('.modal-window').remove();
    })
})

