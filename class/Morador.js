class Morador {
    #nome
    #endereco
    #bairro
    #pontos
    static #totalMoradores = 0

    constructor(nome, endereco, bairro) {
        this.#nome = nome
        this.#endereco = endereco
        this.#bairro = bairro
        this.#pontos = 0
        Morador.#totalMoradores++
    }

    getNome() {
        return this.#nome
    }

    getEndereco() {
        return this.#endereco
    }

    getBairro() {
        return this.#bairro
    }

    getPontos() {
        return this.#pontos
    }

    adicionarPontos(valor) {
        if (typeof valor === 'number' && valor > 0) {
            this.#pontos += valor
            console.log(`\n🎉 ${this.#nome}, você recebeu ${valor} pontos! Saldo atual: ${this.#pontos}`)
        }
    }

    verSaldo() {
        console.log(`\n💰 Saldo de pontos de ${this.#nome}: ${this.#pontos} pontos.`)
    }

    static getTotalMoradores() {
        return Morador.#totalMoradores
    }
}

module.exports = Morador