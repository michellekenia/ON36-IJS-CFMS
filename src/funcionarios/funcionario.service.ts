import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { TipoFuncionario } from './enums/tipo-funcionario.enum';
import { FuncionarioFabrica, TFuncionario } from './factories/funcionario.fabrica';

@Injectable()
export class FuncionarioService {

    funcionarioFabrica: FuncionarioFabrica
    constructor(funcionarioFabrica: FuncionarioFabrica) {
        this.funcionarioFabrica = funcionarioFabrica
    }

    private readonly filePath = path.resolve('src/funcionarios/data/funcionarios.json')

    private lerFuncionarios(): TFuncionario[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as TFuncionario[];
    }

    private escreverFuncionario(funcionarios: TFuncionario[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(funcionarios, null, 2), 'utf8');
    }

    criarFuncionario(tipo: TipoFuncionario, nome: string): TFuncionario {
        const novoFuncionario = this.funcionarioFabrica.criarFuncionario(tipo, nome)
        return this.adicionarListaFuncionarios(novoFuncionario)
    }

    adicionarListaFuncionarios(funcionario: TFuncionario) {
        const funcionarios = this.lerFuncionarios()
        funcionario.id = funcionarios.length > 0 ? funcionarios[funcionarios.length - 1].id + 1 : 1
        funcionarios.push(funcionario)
        this.escreverFuncionario(funcionarios)
        return funcionario

    }

    buscarTodos(): TFuncionario[] {
        return this.lerFuncionarios()
    }

    buscarPorId(id: number): TFuncionario {
        const funcionarios = this.lerFuncionarios()
        const funcionario = funcionarios.find((funcionario) => funcionario.id === Number(id))
        if (!funcionario) {
            throw new NotFoundException(`Funcionário de id ${id} não encontrado.`)
        }
        return funcionario
    }

    alterarDadosFuncionario(id: number, novoNome: string): TFuncionario {
        const funcionarios = this.lerFuncionarios()
        const funcionario = funcionarios.find(funcionario => funcionario.id === Number(id))

        if (!funcionario) {
            throw new NotFoundException('Funcionário não encontrado.')
        }

        funcionario.nome = novoNome
        this.escreverFuncionario(funcionarios)
        return funcionario
        
    }

    removerFuncionario(id: number): void {
        const funcionarios = this.lerFuncionarios()
        const funcionariosIndex = funcionarios.findIndex(funcionario => funcionario.id === Number(id))

        if (funcionariosIndex < 0) {
            throw new NotFoundException('Funcionário não encontrado.')
        }

        funcionarios.splice(funcionariosIndex)
        this.escreverFuncionario(funcionarios)
    }


}


