import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { TipoCliente } from "src/domain/enums/tipo-cliente.enum"
import { TipoFuncionario } from "src/domain/enums/tipo-funcionario.enum"
import { Funcionario } from "src/domain/interfaces/funcionario.interface"

export class CreateFuncionarioDto implements Funcionario {

    @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
    @IsString({ message: 'Nome deve ser uma string.' })
    nome: string

    id: number

    @IsNotEmpty({ message: 'Tipo não pode ser vazio.' })
    @IsEnum(TipoFuncionario, { message: 'Tipo deve ser um valor válido.' })
    tipo: TipoFuncionario
}