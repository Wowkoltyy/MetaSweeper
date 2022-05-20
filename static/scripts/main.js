import { generateBombs, generateField, fillNumbers, showField, click, flag, openNeighbours, bombs, grid, timerSpan, bombsSpan, startTimer, stopTimer, status, started, time } from "./game.js"

let field = generateField(11, 11)
showField(field, false)



started.html("False <i class='bx bx-x' ></i>").css({color: "red"})
timerSpan.text("0.00")


$(".square").on("click", function (){
    let sqr = $(this)
    let [x, y] = [Number(sqr.attr('x')), Number(sqr.attr('y'))]
    if(!grid.prop("playing")){
        started.html("True <i class='bx bx-check'></i>").css({color: "lime"})
        status.text("Playing").css({color: "none"})
        bombsSpan.text(bombs)
        field = fillNumbers(generateBombs(bombs, field, x, y))
        grid.prop("playing", true)
        startTimer()
    }

    field = click(field, x, y)
    
})

$(".square").on("contextmenu", function (){
    let sqr = $(this)
    flag(field, sqr)
    bombsSpan.text(bombs - grid.prop("flags"))
    return false
})

$('.square').on('dblclick', function (){
    let sqr = $(this)
    field = openNeighbours(field, Number(sqr.attr('x')), Number(sqr.attr('y')))
})

window.onhashchange = () =>{
    
}