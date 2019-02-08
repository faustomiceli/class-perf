const {
    performance,
    PerformanceObserver,
} = require('perf_hooks');

const EIGHT_HOURS = 1000 * 60 * 60 * 8;
const NUMBER_OF_CATEGORIES = 5;
const SAMPLING_INTERVAL = 1000;

const obs = new PerformanceObserver((items) => {
    console.log(items.getEntries()[0].name, items.getEntries()[0].duration);
    performance.clearMarks();new Array(NUMBER_OF_CATEGORIES)
});

function getFakeData() {
    return Math.trunc(Math.random() * 1000);
}

function getFakeCategoryId() {
    return Math.trunc(Math.random() * NUMBER_OF_CATEGORIES)
}

function getFakeSample(timestamp) {
    return {
        categoryId: getFakeCategoryId(),
        timestamp,
        data: getFakeData(),
    }
}

let data = [];
const startTime = Date.now();

for (let timestamp = startTime; timestamp < startTime + EIGHT_HOURS; timestamp += SAMPLING_INTERVAL) {
    for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
        data.push(getFakeSample(timestamp));
    }
}

obs.observe({ entryTypes: ['measure'] });

function case1() {
    performance.mark('startCase1');
    class Nome1 {
        constructor() {
            this.nome = 'noome1'
            this.writeDom()
        }

        writeDom() {
            console.log(this.nome)
        }
    }

    new Nome1()

    performance.mark('stopCase1');
    performance.measure('case1', 'startCase1', 'stopCase1');
}


function case2() {
    performance.mark('startCase2');
    class Nome2 {
        constructor() {
            this.nome = 'noome2'
            writeDom(this.nome)
        }
    }

    function writeDom(value) {
        console.log(value)
    }

    new Nome2()

    performance.mark('stopCase2');
    performance.measure('case2', 'startCase2', 'stopCase2');
}

const run = {
    "1": () => case1(data.slice()),
    "2": () => case2(data.slice()),
}

const selectedAlgorithm = process.argv[2];

run[selectedAlgorithm]();
