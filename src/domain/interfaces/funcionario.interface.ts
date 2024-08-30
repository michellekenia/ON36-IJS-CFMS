import { TipoFuncionario } from "../enums/tipo-funcionario.enum"

export interface Funcionario {
    nome: string
    id: number
    tipo: TipoFuncionario
}