import { CreateClienteDto } from "src/application/dto/cliente/create-cliente.dto"
import { TipoCliente } from "../../domain/enums/tipo-cliente.enum"
import { ClienteFisico } from "../models/cliente-fisico"
import { ClienteJuridico } from "../models/cliente-juridico"
import { Injectable } from "@nestjs/common"
import { validate } from "class-validator"

@Injectable()
export class ClienteFabrica {
    
   async criarCliente(clienteDto: CreateClienteDto): Promise <TCliente> {
    const { nome, endereco, telefone, tipo } = clienteDto

    const erros = await validate(clienteDto);
        if (erros.length > 0) {
            throw new Error(`Dados inválidos: ${JSON.stringify(erros)}`);
        }

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