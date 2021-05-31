class Hamburger {
    constructor(size, stuffing) {
        this.size = size,
        this.stuffing = stuffing,
        this.toppingList = []
    }
    addTopping(topping) {
        this.toppingList.push(topping);
    }    // Добавить добавку
    removeTopping(topping) {
        this.toppingList.splice(this.toppingList.indexOf(topping), 1);
    } // Убрать добавку
    getToppings() {
        return this.toppingList;
    }   // Получить список добавок
    getSize() {
        return this.size;
    }              // Узнать размер гамбургера
    getStuffing() {
        return this.stuffing
    }          // Узнать начинку гамбургера
    calculatePrice() {
        let price = 0;
        let item = hamburger.getByName(this.getSize());
        price += item.price;
        let itemStuff = stuffingList.getByName(this.getStuffing());
        price += itemStuff.price;
        if (this.getToppings().length > 0) {
            this.getToppings().forEach(el => {
                price += toppingList.getByName(el).price;
            })
        }
        return price;
    }       // Узнать цену
    calculateCalories() {
        let calor = 0;
        let item = hamburger.getByName(this.getSize());
        calor += item.calories;
        let itemStuff = stuffingList.getByName(this.getStuffing());
        calor += itemStuff.calories;
        if (this.getToppings().length > 0) {
            this.getToppings().forEach(el => {
                calor += toppingList.getByName(el).calories;
            })
        }
        return calor;
    }    // Узнать калорийность
}
const hamburger = [
    {name: 'small', price: 50, calories: 20},
    {name: 'big', price: 100, calories: 40}
]
const stuffingList = [
    {name: 'chees', price: 10, calories: 20},
    {name: 'salad', price: 20, calories: 5},
    {name: 'potatoies', price: 15, calories: 10}
]
const toppingList = [
    {name: 'pepper', price: 15, calories: 0},
    {name: 'mayonnaise', price: 20, calories: 10}
]
//Новый кастомный метод для массива
Array.prototype.getByName = function(str) {
    for (let item of this) {
        if (item.name === str) {
            return item;
        }
    }
    return null;
}
const a = new Hamburger('big', 'salad');
a.addTopping('pepper');
a.addTopping('mayonnaise');
a.removeTopping('pepper');
console.log(a.calculatePrice());
console.log(a.calculateCalories());