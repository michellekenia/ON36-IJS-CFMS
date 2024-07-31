export enum TipoConta {
    CORRENTE = 'corrente',
    POUPANCA = 'poupanca'
}

export class Conta {
    clienteId: number
    saldo: number
    tipo: TipoConta
    id: number

    constructor(numeroConta: string, agencia: string, contaId: number, saldo: number, clienteId: number, tipo: TipoConta) {
        this.clienteId = clienteId
        this.saldo = saldo
        this.tipo = tipo 
    }
}