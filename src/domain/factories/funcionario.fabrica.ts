import { TipoFuncionario } from '../enums/tipo-funcionario.enum';
import { Atentente } from '../models/atendente';
import { Gerente } from '../models/gerente';
import { Injectable } from "@nestjs/common";

@Injectable()
export class FuncionarioFabrica {
    criarFuncionario(tipo: TipoFuncionario, nome: string) {

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