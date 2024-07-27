export enum TipoConta {
    CORRENTE = 'corrente',
    POUPANCA = 'poupanca'
}

export class Conta {
    numeroConta: string
    agencia: string
    contaId: number
    clienteId: number
    saldo: number
    tipo: TipoConta

    constructor(numeroConta: string, agencia: string, contaId: number, saldo: number, clienteId: number, tipo: TipoConta) {
        this.numeroConta = numeroConta
        this.agencia = agencia
        this.contaId = contaId
        this.clienteId = clienteId
        this.saldo = saldo
        this.tipo = tipo 
    }
}