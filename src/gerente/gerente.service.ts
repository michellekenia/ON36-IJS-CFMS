import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { Gerente } from './gerente.model';
import * as fs from 'fs'
import { Cliente } from 'src/cliente/cliente.model';

@Injectable()
export class GerenteService {
    private readonly filePath = path.resolve('src/gerente/gerentes.json')

    private lerGerentes(): Gerente[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Gerente[];
    }

    private escreverGerente(gerentes: Gerente[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(gerentes, null, 2), 'utf8');
    }

    criarGerente(nome: string, clientes: Cliente[] = []): Gerente {
        const gerentes = this.lerGerentes()
        const novoGerente: Gerente = {
            id:
                gerentes.length > 0 ? gerentes[gerentes.length - 1].id + 1 : 1,
            nome,
            clientes
        }

        gerentes.push(novoGerente)
        this.escreverGerente(gerentes)
        return novoGerente

    }

    findAll(): Gerente[] {
        return this.lerGerentes()
    }

    alterarDadosGerente(id: number, novoNome: string): Gerente {
        const gerentes = this.lerGerentes()
        const gerente = gerentes.find(gerente => gerente.id === Number(id))

        if (!gerente) {
            throw new NotFoundException('Gerente não encontrado.')
        }

        gerente.nome = novoNome
        this.escreverGerente(gerentes)
        return gerente

    }

    findById(id: number): Gerente {
        const gerentes = this.lerGerentes()
        const gerente = gerentes.find((gerente) => gerente.id === Number(id))
        if (!gerente) {
            throw new NotFoundException(`Cliente de id ${id} não encontrado.`)
        }
        return gerente
    }

    removerGerente(id: number): void {
        const gerentes = this.lerGerentes()
        const gerentesIndex = gerentes.findIndex(gerente => gerente.id === Number(id))

        if (gerentesIndex < 0) {
            throw new NotFoundException('Cliente não encontrado.')
        }

        gerentes.splice(gerentesIndex)
        this.escreverGerente(gerentes)
    }


}


