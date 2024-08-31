
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TipoCliente } from "src/domain/enums/tipo-cliente.enum";
import { TConta } from "src/domain/factories/conta.fabrica";
import { Cliente } from "src/domain/interfaces/cliente.interface";

export class CreateClienteDto implements Cliente {

    @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
    @IsString({ message: 'Nome deve ser uma string.' })
    nome: string

    clienteId: number

    @IsString({ message: 'Endereço deve ser uma string.' })
    endereco: string

    @IsString({ message: 'Telefone deve ser uma string.' })
    telefone: string

    contas?: TConta[]

    gerenteId?: number

    @IsNotEmpty({ message: 'Tipo não pode ser vazio.' })
    @IsEnum(TipoCliente, { message: 'Tipo deve ser um valor válido.' })
    tipo: TipoCliente

}