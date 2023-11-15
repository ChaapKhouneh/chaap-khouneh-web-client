import { PAGE_SIZE, COLOR_MODE, PRINT_SIDE, BOUNDING_SIZE } from './enums';

const rawPrices = {
    print: {
        [PAGE_SIZE.A5]: {
            [COLOR_MODE.BLACK_WHITE_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 500,
                [PRINT_SIDE.TWO_SIDED]: 600,
            },
            [COLOR_MODE.COLOR_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 1,
                [PRINT_SIDE.TWO_SIDED]: 1,
            },
            [COLOR_MODE.COLOR_INK]: {
                [PRINT_SIDE.ONE_SIDED]: 700,
                [PRINT_SIDE.TWO_SIDED]: 1000,
            },
            [COLOR_MODE.COLOR_DIGITAL]: {
                [PRINT_SIDE.ONE_SIDED]: 1500,
                [PRINT_SIDE.TWO_SIDED]: 2000,
            },
        },
        [PAGE_SIZE.A4]: {
            [COLOR_MODE.BLACK_WHITE_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 750,
                [PRINT_SIDE.TWO_SIDED]: 950,
            },
            [COLOR_MODE.COLOR_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 1,
                [PRINT_SIDE.TWO_SIDED]: 1,
            },
            [COLOR_MODE.COLOR_INK]: {
                [PRINT_SIDE.ONE_SIDED]: 1200,
                [PRINT_SIDE.TWO_SIDED]: 1800,
            },
            [COLOR_MODE.COLOR_DIGITAL]: {
                [PRINT_SIDE.ONE_SIDED]: 2500,
                [PRINT_SIDE.TWO_SIDED]: 3600,
            },
        },
        [PAGE_SIZE.A3]: {
            [COLOR_MODE.BLACK_WHITE_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 1600,
                [PRINT_SIDE.TWO_SIDED]: 2000,
            },
            [COLOR_MODE.COLOR_LASER]: {
                [PRINT_SIDE.ONE_SIDED]: 1,
                [PRINT_SIDE.TWO_SIDED]: 1,
            },
            [COLOR_MODE.COLOR_INK]: {
                [PRINT_SIDE.ONE_SIDED]: 2800,
                [PRINT_SIDE.TWO_SIDED]: 3900,
            },
            [COLOR_MODE.COLOR_DIGITAL]: {
                [PRINT_SIDE.ONE_SIDED]: 6000,
                [PRINT_SIDE.TWO_SIDED]: 8000,
            },
        },
    },
    bounding: {
        [BOUNDING_SIZE.A5_50]: 8000,
        [BOUNDING_SIZE.A5_150]: 12000,
        [BOUNDING_SIZE.A5_250]: 17000,
        [BOUNDING_SIZE.A5_350]: 20000,
        [BOUNDING_SIZE.A5_450]: 25000,
        [BOUNDING_SIZE.A5_550]: 30000,

        [BOUNDING_SIZE.A4_50]: 8000 + 2000,
        [BOUNDING_SIZE.A4_150]: 12000 + 2000,
        [BOUNDING_SIZE.A4_250]: 17000 + 2000,
        [BOUNDING_SIZE.A4_350]: 20000 + 2000,
        [BOUNDING_SIZE.A4_450]: 25000 + 2000,
        [BOUNDING_SIZE.A4_550]: 30000 + 2000,

        [BOUNDING_SIZE.A3_50]: 8000 + 4000,
        [BOUNDING_SIZE.A3_150]: 12000 + 4000,
        [BOUNDING_SIZE.A3_250]: 17000 + 4000,
        [BOUNDING_SIZE.A3_350]: 20000 + 4000,
        [BOUNDING_SIZE.A3_450]: 25000 + 4000,
        [BOUNDING_SIZE.A3_550]: 30000 + 4000,
    },
}

export const calculatePrices = (files) => {
    // debugger
    const print = {
        count: 0,
        cost: 0,
    };
    const bounding = {
        count: 0,
        cost: 0,
    };
    for (const file of files) {
        const perPagePrintCost = rawPrices.print[file.pageSize][file.colorMode][file.double ? PRINT_SIDE.TWO_SIDED : PRINT_SIDE.ONE_SIDED];
        const printCost = perPagePrintCost * file.pageCount;

        print.count += file.pageCount;
        print.cost += printCost;

        if (file.bounding == true) {
            const boundingSize = getBoundingSize(file.pageSize, file.pageCount);
            const boundingCost = rawPrices.bounding[boundingSize];

            bounding.count += 1;
            bounding.cost += boundingCost;
        }
    }
    return {
        print,
        bounding,
    }
}

export const getBoundingSize = (pageSize, pageCount) => {
    let boundingSize = undefined;
    if (pageSize === PAGE_SIZE.A5) {
        if (pageCount <= 50) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
        if (pageCount <= 150) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
        if (pageCount <= 250) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
        if (pageCount <= 350) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
        if (pageCount <= 450) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
        if (pageCount <= 550) {
            boundingSize = BOUNDING_SIZE.A5_50;
        }
    }
    if (pageSize === PAGE_SIZE.A4) {
        if (pageCount <= 50) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
        if (pageCount <= 150) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
        if (pageCount <= 250) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
        if (pageCount <= 350) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
        if (pageCount <= 450) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
        if (pageCount <= 550) {
            boundingSize = BOUNDING_SIZE.A4_50;
        }
    }
    if (pageSize === PAGE_SIZE.A3) {
        if (pageCount <= 50) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
        if (pageCount <= 150) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
        if (pageCount <= 250) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
        if (pageCount <= 350) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
        if (pageCount <= 450) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
        if (pageCount <= 550) {
            boundingSize = BOUNDING_SIZE.A3_50;
        }
    }
    return boundingSize;
}