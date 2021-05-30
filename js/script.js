class GoodsItem {
    constructor(title, price, img = 'nophoto.png') {
        this.title = title;
        this.price = price;
        this.img = img
    }
    render() {
        return `<div class="goods-item">
                <img class="goods-item-pic" src="img/${this.img} "width="120" height="100">
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
}

const list = new GoodsList();
list.fetchGoods();
list.render();
