import {generateBombs, generateField, fillNumbers, showField, click} from "./game.js"
let field = fillNumbers(generateBombs(10, generateField(11, 11)))
showField(field)

$(".square").click((e) =>{
    let sqr = $(e.target)
    field = click(field, Number(sqr.attr('x')), Number(sqr.attr('y')))

})

window.onhashchange = () =>{
    
}
