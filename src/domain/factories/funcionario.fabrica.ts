import { validate } from 'class-validator';
import { TipoFuncionario } from '../enums/tipo-funcionario.enum';
import { Atentente } from '../models/atendente';
import { Gerente } from '../models/gerente';
import { Injectable } from "@nestjs/common";
import { CreateFuncionarioDto } from 'src/application/dto/funcionario/create-funcionario.dto';

@Injectable()
export class FuncionarioFabrica {
    async criarFuncionario(funcionarioDto: CreateFuncionarioDto): Promise <TFuncionario> {
        const { nome, tipo} = funcionarioDto
        
        const erros = await validate(funcionarioDto);
        if (erros.length > 0) {
            throw new Error(`Dados inválidos: ${JSON.stringify(erros)}`);
        }

        switch (tipo) {
            case TipoFuncionario.gerente:
                const gerente = new Gerente(nome)
                return gerente
            case TipoFuncionario.atendente:
                const atendente = new Atentente(nome)
                return atendente

            default:
                throw new Error('Tipo de funcionário inválido.')
        }
    }
}

export type TFuncionario = Gerente | Atentente