export function currencyFormat(num) {
    return '$' + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

 export function addToCart(item){
//  item={
//     name:,
//     id:,
//     quantity,
//     price,
// }
//add item to localStorage
 }
 export function addToWishlist(item){
//same item and add to localStorage
 }