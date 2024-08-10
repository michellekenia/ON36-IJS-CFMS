import { TipoCliente } from "../enums/tipo-cliente.enum"
import { ClienteFisico } from "../models/cliente-fisico"
import { ClienteJuridico } from "../models/cliente-juridico"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ClienteFabrica {
    
    criarCliente(tipo: TipoCliente, nome: string, endereco: string, telefone: string): TCliente {

        switch (tipo) {
            case TipoCliente.pessoaFisica:
                const clienteFisico = new ClienteFisico(nome, endereco, telefone)
                return clienteFisico

            case TipoCliente.pessoaJuridica:
                const clienteJuridico = new ClienteJuridico(nome, endereco, telefone)
                return clienteJuridico

            default:
                throw new Error('Tipo de cliente inválido.')
        }
    }
}

export type TCliente = ClienteFisico | ClienteJuridico