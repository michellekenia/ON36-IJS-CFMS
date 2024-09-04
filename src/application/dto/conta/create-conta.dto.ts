import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { TipoConta } from "src/domain/enums/tipo-conta.enum";
import { Conta } from "src/domain/interfaces/conta.interface";

export class CreateContaDto implements Conta {

    @IsNotEmpty({ message: 'Tipo não pode ser vazio.' })
    @IsEnum(TipoConta, { message: 'Tipo deve ser um valor válido.' })
    tipo: TipoConta

    @IsNotEmpty( {message: 'Saldo não pode ser vazio.'})
    @IsNumber()
    saldo: number

    id: number

    @IsNotEmpty( {message: 'Id do cliente não pode ser vazio.'})
    @IsNumber()
    clienteId: number
    
}