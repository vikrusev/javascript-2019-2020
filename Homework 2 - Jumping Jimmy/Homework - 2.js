let BREAK_REDUCE = false;

function jumpingJimmy(tower, jumpHeight) {
    return tower.reduce((acc, nextFloor) => {
        return BREAK_REDUCE ? acc : (() => {
            return nextFloor <= jumpHeight ? acc + nextFloor : (() => { BREAK_REDUCE = true; return acc })();
        })()
    }, 0);

    // try {
    //     return tower.reduce((acc, nextFloor) => {
    //         if (nextFloor <= jumpHeight) {
    //             return acc + nextFloor;
    //         }
    //         else {
    //             throw acc;
    //         }
    //     }, 0);
    // } catch (acc) {
    //     return +acc;
    // }

    // let total = 0;
    // for (let floor of tower) {
    //     if (floor <= jumpHeight) {
    //         total += floor;
    //     }
    //     else {
    //         return total;
    //     }
    // }
}

let tower = [5, 1, 8, 2, 4, 3, 1, 9, 8, 5, 1];
let jumpHeight = 1;

console.log(jumpingJimmy(tower, jumpHeight));