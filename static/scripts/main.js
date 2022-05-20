import { generateBombs, generateField, fillNumbers, showField, click, flag, openNeighbours, bombs } from "./game.js"

let field = generateField(11, 11)
showField(field, false)
let time = 0
let timer
let timerSpan = $("#stat-time")
let started = $("#stat-started")
let bombsSpan = $("#stat-bombs")
started.html("False <i class='bx bx-x' ></i>").css({color: "red"})
timerSpan.text("0.00")

$(".square").on("click", function (){
    let sqr = $(this)
    let grid = sqr.parent().parent()
    let [x, y] = [Number(sqr.attr('x')), Number(sqr.attr('y'))]
    if(!grid.prop("playing")){
        started.html("True <i class='bx bx-check'></i>").css({color: "lime"})
        bombsSpan.text(bombs)
        field = fillNumbers(generateBombs(bombs, field, x, y))
        grid.prop("playing", true)
        timer = setInterval(() => {
            time += 0.01
            time = time.toFixed(2)
            timerSpan.text(time)
            time = Number(time)
            if($(".field").prop("lost"))
                clearInterval(timer)
        }, 10)
    }

    field = click(field, x, y)
})

$(".square").on("contextmenu", function (){
    let sqr = $(this)
    flag(field, sqr)
    bombsSpan.text(bombs - sqr.parent().parent().prop("flags"))
    return false
})

$('.square').on('dblclick', function (){
    let sqr = $(this)
    field = openNeighbours(field, Number(sqr.attr('x')), Number(sqr.attr('y')))
})

window.onhashchange = () =>{
    
}