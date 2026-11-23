import conexao from "../config/conexao.js";
export async function cadastrar(calibracao) {
    const [resultado] = await conexao.execute(
        `INSERT INTO calibracoes
        (equipamentoId, dataCalibracao, resultado, responsavel)
        VALUES (?, ?, ?, ?)`,
        [
            calibracao.equipamentoId,
            calibracao.dataCalibracao,
            calibracao.resultado,
            calibracao.responsavel
        ]
    );

    return resultado.insertId;
}
export async function listar() {
    const [resultado] = await conexao.execute(
        "SELECT * FROM calibracoes"
    );

    return resultado;
}
export async function listarDetalhadas() {
    const [resultado] = await conexao.execute(
        `SELECT 
            c.*,
            e.codigo,
            e.nome
        FROM calibracoes c
        INNER JOIN equipamentos e
        ON c.equipamentoId = e.id_equipamento`
    );

    return resultado;
}
export async function buscarPorId(id) {
    const [resultado] = await conexao.execute(
        "SELECT * FROM calibracoes WHERE id_calibracao = ?",
        [id]
    );

    return resultado[0];
}
export async function atualizar(id, calibracao) {
    const [resultado] = await conexao.execute(
        `UPDATE calibracoes SET
            equipamentoId = ?,
            dataCalibracao = ?,
            resultado = ?,
            responsavel = ?
        WHERE id_calibracao = ?`,
        [
            calibracao.equipamentoId,
            calibracao.dataCalibracao,
            calibracao.resultado,
            calibracao.responsavel,
            id
        ]
    );

    return resultado.affectedRows;
}
export async function deletar(id) {
    const [resultado] = await conexao.execute(
        "DELETE FROM calibracoes WHERE id_calibracao = ?",
        [id]
    );

    return resultado.affectedRows;
}