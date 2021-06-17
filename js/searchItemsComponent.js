Vue.component('search-items', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
    <input @input="$parent.filterGoods(searchLine)" type="text" class="goods-search" placeholder="Введите строку поиска" v-model="searchLine">
    `
});