export enum TipoConta {
    CORRENTE = 'corrente',
    POUPANCA = 'poupanca'
}

export class Conta {
    clienteId: number
    saldo: number
    tipo: TipoConta
    id: number

    constructor(clienteId: number, saldo: number, tipo: TipoConta, id: number) {
        this.clienteId = clienteId
        this.saldo = saldo
        this.tipo = tipo
        this.id = id
    }
}