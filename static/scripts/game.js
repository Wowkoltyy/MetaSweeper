export function generateBombs(n = 0, field = [[]]){
    let res = field
    let values = []
    for (var i = 0; i < field.length * field[0].length; i++){
        values.push(i)
    }

    for (let i = 0; i < n; i++){
        let x = values.splice(Math.random()*values.length,1)[0]
        field[(x - x % field[0].length) / field[0].length][x % field[0].length] = -9
    }
    return res
}

export function generateField(height = 1, width = 1){
    return Array.from({length: height}, e => Array.from({length: width}, e => -10))
}

export function findNeighbours(field = [[]], x = 0, y = 0){

    let bombs = 0
    let zeros = []
    let everything = []

    if(y - 1 >= 0){
        if(x - 1 >= 0){
            if(field[y - 1][x - 1] === -10)zeros.push([x - 1, y - 1])
            else if(field[y - 1][x - 1] === -9)bombs += 1
            else everything.push([x - 1, y - 1])
        }
        if(x + 1 < field[0].length){
            if(field[y - 1][x + 1] === -10)zeros.push([x + 1, y - 1])
            else if(field[y - 1][x + 1] === -9)bombs += 1
            else everything.push([x + 1, y - 1])
        }
        
        if(field[y - 1][x] === -10)zeros.push([x, y - 1])
        else if(field[y - 1][x] === -9)bombs += 1
        else everything.push([x, y - 1])
    }

    if(y + 1 < field.length){
        if(x + 1 < field[0].length){
            if(field[y + 1][x + 1] === -10)zeros.push([x + 1, y + 1])
            else if(field[y + 1][x + 1] === -9)bombs += 1
            else everything.push([x + 1, y + 1])
        }

        if(x - 1 >= 0){
            if(field[y + 1][x - 1] === -10)zeros.push([x - 1, y + 1])
            else if(field[y + 1][x - 1] === -9)bombs += 1
            else everything.push([x - 1, y + 1])
        }

        if(field[y + 1][x] === -10)zeros.push([x, y + 1])
        else if(field[y + 1][x] === -9)bombs += 1
        else everything.push([x, y + 1])
    }

    if(x - 1 >= 0){
        if(field[y][x - 1] === -10)zeros.push([x - 1, y])
        else if(field[y][x - 1] === -9)bombs += 1
        else everything.push([x - 1, y])
    }

    if(x + 1 < field[0].length){
        if(field[y][x + 1] === -10)zeros.push([x + 1, y])
        else if(field[y][x + 1] === -9)bombs += 1
        else everything.push([x + 1, y])
    }
    console.log(everything)
    
    return [bombs, zeros, everything]
    
}

export function render(field = [[0]]){
    field.forEach((row, y) => {
        row.forEach((sqr, x) =>{
            if(Math.abs(sqr) === sqr && sqr !== -10){
                $(`[x='${x}'][y=${y}]`).text(sqr.toString()).css({color: colors[sqr]})
            }
        })
    })
}

export function showField(field = [[]]){
    field.forEach((row, y) =>{
        $(".field").append(`<div class='row'></div>`)
        row.forEach((sqr, x) =>{
            $(".row").last().append($(`<div x='${x}' y='${y}' class="square">.</div>`).prop("clicked", false))
            if(x === 0 && y === 0) return $(".row").last().children().last().css({borderTopLeftRadius: '11px'})
            if(x === 0 && y === field.length - 1) return $(".row").last().children().last().css({borderBottomLeftRadius: '11px'})
            if(x === row.length - 1 && y === 0) return $(".row").last().children().last().css({borderTopRightRadius: '11px'})
            if(x === row.length - 1 && y === field.length - 1) return $(".row").last().children().last().css({borderBottomRightRadius: '11px'})
        })
    })
}

export function fillNumbers(field = [[]]){
    field.forEach((row, y) => {
        row.forEach((sqr, x) => {
            if(sqr !== -9){
                let [bombs] = findNeighbours(field, x, y)
                if(bombs !== 0)field[y][x] = -bombs
            }
        })
    })
    return field
}

export const colors = {
    0: "lightgray",
    1: "blue",
    2: "green",
    3: "red",
    4: "purple",
    5: "orange",
    6: "#00A3A3",
    7: "black",
    8: "gray"
}

export function click(field = [[0]], x = 0, y = 0){
    let sqr = $(`[x='${x}'][y='${y}']`)
    if(sqr.prop("clicked"))
        return field

    sqr.prop('clicked', true)
    
    let sqd = Math.abs(field[y][x])
    field[y][x] = sqd
    if(sqd === 10){
        sqr.text(0).css({color: colors[0]})
        let [bombs, zeros, everything] = findNeighbours(field, x, y)
        zeros.forEach(([zx, zy]) => {
            click(field, zx, zy)
        })
        everything.forEach(([zx, zy]) => {
            click(field, zx, zy)
        })

        return field
    }
    sqr.text(sqd).css({color: colors[sqd]})
    return field
}