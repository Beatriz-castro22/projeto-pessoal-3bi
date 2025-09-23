const prompt = require('prompt-sync')()
const { Ranking, RankingSemanal } = require('./class/Ranking')
const Morador = require('./class/Morador')
const MoradorFactory = require('./class/MoradorFactory')
const ColetaService = require('./class/ColetaService')

const LIMITE_RECOMPENSA = 1000
const moradores = []

const rankingGeral = new Ranking()
const rankingBairro = new RankingSemanal()

function cadastrarMorador() {
    console.log('\n--- CADASTRO DE MORADOR ---')
    const nome = prompt('Nome: ')
    const endereco = prompt('Endereço: ')
    const bairro = prompt('Bairro: ')

    const novoMorador = MoradorFactory.criarMorador(nome, endereco, bairro)
    moradores.push(novoMorador)
    rankingGeral.adicionarMorador(novoMorador)
    rankingBairro.adicionarMorador(novoMorador)

    console.log(`\n✅ Morador ${nome} cadastrado com sucesso!`)
}

function escolherMoradorParaColeta() {
    if (moradores.length === 0) {
        console.log('\n❌ Nenhum morador cadastrado ainda. Por favor, cadastre um morador primeiro.')
        return
    }

    console.log('\n--- ESCOLHA O MORADOR PARA A COLETA ---')
    moradores.forEach((m, index) => {
        console.log(`${index + 1}. ${m.getNome()}`)
    })

    const escolha = parseInt(prompt('Digite o número do morador: ')) - 1

    if (escolha >= 0 && escolha < moradores.length) {
        ColetaService.simularColeta(moradores[escolha])
    } else {
        console.log('\n❌ Opção inválida.')
    }
}

function trocarPontos(morador) {
    if (morador.getPontos() >= LIMITE_RECOMPENSA) {
        console.log(`\n🥳 Parabéns, ${morador.getNome()}! Você atingiu ${LIMITE_RECOMPENSA} pontos!`)
        console.log('Você pode resgatar uma recompensa!')
        console.log('1. Desconto na conta de luz/água')
        console.log('2. Participação em sorteio')
        const escolha = prompt('Escolha sua recompensa (1 ou 2): ')

        if (escolha === '1') {
            console.log('✅ Desconto na conta de luz/água resgatado!')
        } else if (escolha === '2') {
            console.log('✅ Você foi inscrito no próximo sorteio!')
        } else {
            console.log('❌ Opção inválida.')
        }
    } else {
        console.log(`\n😕 ${morador.getNome()}, você precisa de ${LIMITE_RECOMPENSA} pontos para resgatar uma recompensa.`)
        console.log(`Faltam ${LIMITE_RECOMPENSA - morador.getPontos()} pontos.`)
    }
}


console.log('=============== App de Coleta Seletiva Gamificado ===============')

let continuar = true
while (continuar) {
    console.log('\n--- MENU ---')
    console.log('1. Cadastrar novo morador')
    console.log('2. Simular coleta de itens')
    console.log('3. Ver saldo de pontos')
    console.log('4. Ver ranking geral')
    console.log('5. Ver ranking por bairro')
    console.log('6. Tentar trocar pontos por recompensa')
    console.log('7. Sair')

    const opcao = prompt('Escolha uma opção: ')

    switch (opcao) {
        case '1':
            cadastrarMorador()
            break
        case '2':
            escolherMoradorParaColeta()
            break
        case '3':
            const moradorParaSaldo = moradores[parseInt(prompt('Digite o número do morador: ')) - 1]
            if (moradorParaSaldo) {
                moradorParaSaldo.verSaldo()
            } else {
                console.log('❌ Morador não encontrado.')
            }
            break
        case '4':
            rankingGeral.exibirRanking()
            break
        case '5':
            const bairro = prompt('Digite o nome do bairro: ')
            rankingBairro.exibirRankingPorBairro(bairro)
            break
        case '6':
            const moradorParaRecompensa = moradores[parseInt(prompt('Digite o número do morador: ')) - 1]
            if (moradorParaRecompensa) {
                trocarPontos(moradorParaRecompensa)
            } else {
                console.log('❌ Morador não encontrado.')
            }
            break
        case '7':
            console.log('\nObrigado por usar o App de Coleta Seletiva. Até mais!')
            continuar = false
            break
        default:
            console.log('\n❌ Opção inválida. Tente novamente.')
    }
}