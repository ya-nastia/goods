// селекторы goods.ru
const selector1 = {
    startLink: 'https://goods.ru/',
    domen: 'https://goods.ru',
    // главное меню
    catalogPlashka: '.menu-cards__col',
    catalogImg1: 'img', //attr
    catalogText1: '.menu-cards__inner a.front', // attr alt
    skipItem: '.menu-cards__banner',
    
    catalogPlashka2: '.col-xs-4',
    catalogImg2: '.col-xs-4 .photo img', 
    catalogText2: '.col-xs-4 a.link', 

};
//все
const selector2 = {
    startLink: 'https://goods.ru/',
    domen: 'https://goods.ru',

    //descriptionCatalog: '.prodDetail .col2', 
    plashka1: '.ddl_product',
    title: '.inner .item-title a',
    img: '.item-image meta',
    link: '.inner .item-title a',
    price: '.catalog-item__prices-container .item-price span',
    description: '.item-info__bottom .item-details p',

    plashka2: '.ddl_product',
    title2: 'header.card-prod--title a',
    img2: '.ts_preview meta',
    link2: 'header.card-prod--title a',
    price2: '.favorite.card-prod--price .favoritePrice',
    description2: '.card-prod--params p',

    pages: '.catalog-listing__pager .full li',
    pages2: '.pagination__list li',
};
    // схема каталога
const selector3 = {
        startLink: 'https://goods.ru/',
        domen: 'https://goods.ru',
    
        /* Описание */
        description: '#pdp-description .text-block', // list
        productCode: '.prod--top .prod--art',
        //description2: '#pdp-description .text-block', // list
        //productCode2: '.prod--top .prod--art',
    
        /* Технические характеристики */
        techTable: '.row.characteristics .tbl-typical tr',
        harName: 'td:nth-child(1)',
        harZnach: 'td:nth-child(2) div',
        //techTable2: '.row.characteristics .tbl-typical tr',
        //harName2: 'td:nth-child(1)',
        //harZnach2: 'td:nth-child(2) div'
    
}
const selector = [selector1, selector2, selector3]
module.exports = selector