Vue.component('search-items', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
    <input @input="$emit('filter-good', searchLine)" type="text" class="goods-search" placeholder="Введите строку поиска" v-model="searchLine">
    `
});