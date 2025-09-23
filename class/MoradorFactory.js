const Morador = require('./Morador')

class MoradorFactory {
    static criarMorador(nome, endereco, bairro) {
        return new Morador(nome, endereco, bairro)
    }
}

module.exports = MoradorFactory