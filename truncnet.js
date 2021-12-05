class Perceptron {
    constructor(inputs) {
        this.bias = this.weight()
        this.value = this.bias
        this.weights = []
        this.inputs = inputs
        for (let t = 0; t < this.inputs.length; t++) {
            this.weights.push(this.weight())
        }
    }
    weight() {
        return Math.random() - .5
    }
    valueOf() {
        return this.value
    }
    compute(inputs = this.inputs) {
        this.value = this.bias
        for (let t = 0; t < inputs.length; t++) {
            if (t > this.weights.length - 1) {
                this.weights.push(this.weight())
                this.value += (inputs[t].valueOf() * this.weights[t])
            } else {
                this.value += (inputs[t].valueOf() * this.weights[t])
            }
        }
        // this.relu()
        return this.value
    }
    relu() {
        this.value = Math.max(this.value, 0)
    }
}
class Network {
    constructor(inputs, layerSetupArray) {
        this.inputs = inputs
        this.structure = []
        this.outputs = []
        for (let t = 0; t < layerSetupArray.length; t++) {
            this.scaffold = []
            for (let k = 0; k < layerSetupArray[t]; k++) {
                let cept
                if (t == 0) {
                    cept = new Perceptron(this.inputs)
                } else {
                    cept = new Perceptron(this.structure[t - 1])
                }
                this.scaffold.push(cept)
            }
            this.structure.push(this.scaffold)
        }
    }
    compute(inputs = this.inputs) {
        for (let t = 0; t < this.structure.length; t++) {
            for (let k = 0; k < this.structure[t].length; k++) {
                this.structure[t][k].compute()
            }
        }
        this.outputs = []
        this.dataoutputs = []
        for (let t = 0; t < this.structure[this.structure.length - 1].length; t++) {
            this.outputs.push(this.structure[this.structure.length - 1][t].valueOf())
            this.dataoutputs.push(new Data(this.structure[this.structure.length - 1][t].valueOf()))
        }
    }
}
class Data {
    constructor(input = -100) {
        if (input == -100) {
            this.value = this.weight()
        } else {
            this.value = input
        }
    }
    valueOf() {
        return this.value
    }
    weight() {
        return Math.random() - .5
    }
}