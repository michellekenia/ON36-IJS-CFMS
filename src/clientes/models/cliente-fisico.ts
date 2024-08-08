import { Conta } from "src/contas/models/conta.interface";
import { Cliente } from "./cliente.interface";


export class ClienteFisico implements Cliente {
    constructor (public nome: string, public clienteId: number, public  endereco: string, public telefone: string, public contas: Conta[], public gerenteId: number) {}
}