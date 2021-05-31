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
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        })
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
console.log(list.sumAllGoods());
