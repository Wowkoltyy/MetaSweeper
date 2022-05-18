import { generateBombs, generateField, fillNumbers, showField, click, flag, openNeighbours } from "./game.js"
let field = fillNumbers(generateBombs(10, generateField(11, 11)))
showField(field)

$(".square").on("click", function (){
    let sqr = $(this)
    field = click(field, Number(sqr.attr('x')), Number(sqr.attr('y')))
})

$(".square").on("contextmenu", function (){
    flag(field, $(this))
    return false
})

$('.square').on('dblclick', function (){
    let sqr = $(this)
    field = openNeighbours(field, Number(sqr.attr('x')), Number(sqr.attr('y')))
})

window.onhashchange = () =>{
    
}
