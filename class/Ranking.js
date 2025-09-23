class Ranking {
    constructor() {
        this.rankingList = []
    }

    adicionarMorador(morador) {
        this.rankingList.push(morador)
        this.ordenarRanking()
    }

    ordenarRanking() {
        this.rankingList.sort((a, b) => b.getPontos() - a.getPontos())
    }

    exibirRanking() {
        console.log('\n--- RANKING GERAL ---')
        this.rankingList.forEach((morador, index) => {
            console.log(`${index + 1}º. ${morador.getNome()} - ${morador.getPontos()} pontos`)
        });
        console.log('---------------------\n')
    }
}

class RankingSemanal extends Ranking {
    exibirRankingPorBairro(bairro) {
        console.log(`\n--- RANKING SEMANAL DO BAIRRO: ${bairro.toUpperCase()} ---`)
        const rankingFiltrado = this.rankingList.filter(morador => morador.getBairro() === bairro)
        rankingFiltrado.sort((a, b) => b.getPontos() - a.getPontos())
        
        if (rankingFiltrado.length > 0) {
            rankingFiltrado.forEach((morador, index) => {
                console.log(`${index + 1}º. ${morador.getNome()} - ${morador.getPontos()} pontos`)
            })
        } else {
            console.log('Nenhum morador cadastrado neste bairro ainda.')
        }
        console.log('--------------------------------------------------\n')
    }
}

module.exports = { Ranking, RankingSemanal }