performance.mark('startCase1')
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
performance.mark('stopCase1')

var marks = performance.getEntriesByType('mark')
console.info(`Time case1: ${marks[1].startTime - marks[0].startTime}`)
performance.measure('case1', 'startCase1', 'stopCase1')



performance.mark('startCase2')
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
performance.mark('stopCase2')

var marks = performance.getEntriesByType('mark')
console.info(`Time case1: ${marks[1].startTime - marks[0].startTime}`)
performance.measure('case2', 'startCase2', 'stopCase2')