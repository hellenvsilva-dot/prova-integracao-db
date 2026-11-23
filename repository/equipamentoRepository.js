
import conexao from '../config/conexao.js';

export async function cadastrarEquipamento(equipamento) {
    const [resultado] = await conexao.execute(
        'INSERT INTO equipamentos SET ?',
        [equipamento]
    );

    return { id: resultado.insertId, ...equipamento };
}

export async function listarEquipamentos() {
    const [resultado] = await conexao.execute(
        'SELECT * FROM equipamentos'
    );

    return resultado;
}

export async function buscarEquipamentoPorId(id) {
    const [resultado] = await conexao.execute(
        'SELECT * FROM equipamentos WHERE id = ?',
        [id]
    );

    return resultado[0];
}

export async function atualizarEquipamento(id, equipamento) {
    const [resultado] = await conexao.execute(
        'UPDATE equipamentos SET ? WHERE id = ?',
        [equipamento, id]
    );

    if (resultado.affectedRows === 0) return undefined;

    return buscarEquipamentoPorId(id);
}

export async function excluirEquipamento(id) {
    const [resultado] = await conexao.execute(
        'DELETE FROM equipamentos WHERE id = ?',
        [id]
    );

    return resultado.affectedRows > 0;
}