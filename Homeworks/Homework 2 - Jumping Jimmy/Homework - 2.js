function jumpingJimmy(tower, jumpHeight) {
    // 1
    let BREAK_REDUCE = false;
    return tower.reduce((acc, nextFloor) => {
        return BREAK_REDUCE ? acc : (() => {
            return nextFloor <= jumpHeight ? acc + nextFloor : (() => { BREAK_REDUCE = true; return acc })();
        })()
    }, 0);

    // 2
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

    // 3
    // let total = 0;
    // for (let floor of tower) {
    //     if (floor > jumpHeight) {
    //         return total;
    //     }

    //     total += floor;
    // }

    // return total;
}

// console.log(jumpingJimmy([5, 1, 8, 2, 4, 3, 1, 9, 8, 5, 1], 1));
// console.log(jumpingJimmy([5, 1], 5));