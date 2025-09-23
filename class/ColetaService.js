const prompt = require('prompt-sync')()

class ColetaService {
    static MINIMO_ITENS = 10
    static PONTOS_POR_ITEM = 5

    static simularColeta(morador) {
        console.log(`\n--- Simulação de Coleta para ${morador.getNome()} ---`)
        const quantidade = parseInt(prompt(`Quantos itens você coletou? `))

        if (isNaN(quantidade) || quantidade < this.MINIMO_ITENS) {
            console.log(`\n❌ Desculpe, a quantidade mínima de itens é ${this.MINIMO_ITENS}. Tente novamente!`)
        } else {
            const pontosGanhos = quantidade * this.PONTOS_POR_ITEM;
            morador.adicionarPontos(pontosGanhos)
        }
    }
}

module.exports = ColetaService