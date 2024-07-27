import { Conta } from "src/conta/conta.model";

export class Cliente{
    nome:string
    id: number
    endereco: string
    telefone: string
    contas: Conta[] = []
    gerenteId: number
   
    constructor(nome: string, id: number, endereco: string, telefone: string, gerenteId: number, contas: Conta[]){
        this.nome = nome
        this.id = id 
        this.endereco = endereco
        this.telefone = telefone
        this.gerenteId = gerenteId
        this.contas = contas
    }
    

}