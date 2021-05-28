const goods = [
    { title: 'Shirt', price: 150, img: 'nophoto.png' },
    { title: 'Socks', price: 50, img: 'nophoto.png' },
    { title: 'Jacket', price: 350, img: 'nophoto.png' },
    { title: 'Shoes', price: 250, img: 'nophoto.png' },
];
// const model = [
//     {type: 'img', class: 'goods-item-pic', options: 'src="img/'+goods.img+'"' },
//     {type: 'h3', class: 'goods-item-title', value: goods.title},
//     {type: 'p', class: 'goods-item-price', value: goods.price},
//     {type: 'button', class: 'goods-item-price', value: 'Добавить', options: 'type="button"'}
// ];

function renderGoodsItem(item) {
    return `<div class="goods-item">
                <img class="goods-item-pic" src="img/${item.img} "width="120" height="100">
                <h3 class="goods-item-title">${item.title}</h3>
                <p class="goods-item-price">${item.price}</p>
                <button type="button" class="goods-item-btn">Добавить</button>
            </div>`;
};

function renderGoodsList(list) {
    let goodsList = list.map(renderGoodsItem).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);
  