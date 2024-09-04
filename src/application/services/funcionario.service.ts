import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs'
import { FuncionarioFabrica, TFuncionario } from 'src/domain/factories/funcionario.fabrica';
import { CreateFuncionarioDto } from '../dto/funcionario/create-funcionario.dto';
import { validate } from 'class-validator';

@Injectable()
export class FuncionarioService {

    constructor(private readonly funcionarioFabrica: FuncionarioFabrica) { }

    private readonly filePath = path.resolve('src/adapters/data/funcionarios.json')

    private async lerFuncionarios(): Promise<TFuncionario[]> {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data) as TFuncionario[];
        } catch (error) {
            console.error("Erro ao ler os funcionários:", error);
            return []

        }

    }

    private async escreverFuncionario(funcionarios: TFuncionario[]): Promise<void> {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(funcionarios, null, 2), 'utf8');
        } catch (error) {
            console.error("Erro ao escrever os funcionários:", error)
            throw new Error("Não foi possível salvar os funcionários.")
        }
    }

    private async validarFuncionarioDto(funcionarioDto: CreateFuncionarioDto): Promise<void> {
        const erros = await validate(funcionarioDto)
        if (erros.length > 0) {
            throw new BadRequestException(`Dados inválidos: ${JSON.stringify(erros)}`)
        }
    }

    private gerarId(funcionario: TFuncionario[]): number {
        return funcionario.length > 0 ? Math.max(...funcionario.map(c => c.id)) + 1 : 1
    }

    async criarFuncionario(funcionarioDto: CreateFuncionarioDto): Promise<TFuncionario> {
        await this.validarFuncionarioDto(funcionarioDto)

        const novoFuncionario = await this.funcionarioFabrica.criarFuncionario(funcionarioDto)

        return this.adicionarListaFuncionarios(novoFuncionario)
    }

    async adicionarListaFuncionarios(funcionario: TFuncionario): Promise<TFuncionario> {
        const funcionarios = await this.lerFuncionarios()
        funcionario.id = this.gerarId(funcionarios)
        funcionarios.push(funcionario)
        await this.escreverFuncionario(funcionarios)
        return funcionario

    }

    async buscarTodos(): Promise<TFuncionario[]> {
        return this.lerFuncionarios()
    }

    async buscarPorId(id: number): Promise<TFuncionario> {
        const funcionarios = await this.lerFuncionarios()
        const funcionario = funcionarios.find((funcionario) => funcionario.id === Number(id))
        if (!funcionario) {
            throw new NotFoundException(`Funcionário de id ${id} não encontrado.`)
        }
        return funcionario
    }

    async alterarDadosFuncionario(id: number, funcionarioDto: CreateFuncionarioDto): Promise<TFuncionario> {
        const funcionarios = await this.lerFuncionarios()
        const funcionario = funcionarios.find(funcionario => funcionario.id === Number(id))

        if (!funcionario) {
            throw new NotFoundException('Funcionário não encontrado.')
        }

        await this.validarFuncionarioDto(funcionarioDto)
        Object.assign(funcionario, funcionarioDto)
        await this.escreverFuncionario(funcionarios)
        return funcionario

    }

    async removerFuncionario(id: number): Promise<void> {
        const funcionarios = await this.lerFuncionarios()
        const funcionariosIndex = funcionarios.findIndex(funcionario => funcionario.id === Number(id))

        if (funcionariosIndex < 0) {
            throw new NotFoundException('Funcionário não encontrado.')
        }

        funcionarios.splice(funcionariosIndex)
        this.escreverFuncionario(funcionarios)
    }


}


