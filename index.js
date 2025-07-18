const express = require('express');
const path = require('path');
const db = require('./database/database'); // Importa a configuração do banco e o objeto db
// const bcrypt = require('bcryptjs'); // Descomente quando for implementar hash de senha

const app = express();
const PORT = process.env.PORT || 3000;

// === Middlewares ===
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === FUNÇÕES AUXILIARES ===
function tratarTexto(texto) {
    if (typeof texto !== 'string' || !texto) { return ''; }
    let textoTratado = texto.trim();
    textoTratado = textoTratado.replace(/\s\s+/g, ' ');
    return textoTratado;
}
// Não usaremos normalizarTextoParaComparacao aqui, contando com COLLATE NOCASE no DB
// e tratamento na lógica da aplicação se necessário para acentos.

// === ROTAS PARA SERVIR PÁGINAS HTML ===
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'boas_vindas.html')); // ALTERADO AQUI
});
// -- Tipos de Usuário --
app.get('/tipos-usuario', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tipo_usuario_lista.html')));
app.get('/tipos-usuario/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tipo_usuario_cadastro.html')));
app.get('/tipos-usuario/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tipo_usuario_editar.html')));

// -- Níveis de Acesso --
app.get('/niveis-acesso', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nivel_acesso_lista.html')));
app.get('/niveis-acesso/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nivel_acesso_cadastro.html')));
// NOVO: Rota para servir a página de edição de Nível de Acesso
app.get('/niveis-acesso/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nivel_acesso_editar.html')));

// -- Tipos de CRE --
app.get('/tp-cre', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tp_cre_lista.html')));
app.get('/tp-cre/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tp_cre_cadastro.html')));
// NOVO: Rota para servir a página de edição de Tipo de CRE
app.get('/tp-cre/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tp_cre_editar.html')));

// -- Escolas --
app.get('/escolas', (req, res) => res.sendFile(path.join(__dirname, 'public', 'escola_lista.html')));
app.get('/escolas/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'escola_cadastro.html')));
// NOVO: Rota para servir a página de edição de Escola
app.get('/escolas/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'escola_editar.html')));

// -- Usuários --
// NOVO: Rota para servir a página de lista de Usuários (o TODO de criar a página HTML ainda existe)
app.get('/usuarios', (req, res) => res.sendFile(path.join(__dirname, 'public', 'usuario_lista.html')));
app.get('/usuarios/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'usuario_cadastro.html')));
// NOVO: Rota para servir a página de edição de Usuário
app.get('/usuarios/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'usuario_editar.html')));

// -- Cadastros Pedagógicos --
// NOVO: Rotas para Modalidades (usando a pasta 'pedagogico')
app.get('/pedagogico/modalidades', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'modalidade_lista.html')));
app.get('/pedagogico/modalidades/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'modalidade_cadastro.html')));
app.get('/pedagogico/modalidades/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'modalidade_editar.html')));

// NOVO: -- Cadastros Pedagógicos - Turnos --
app.get('/pedagogico/turnos', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'turno_lista.html')));
app.get('/pedagogico/turnos/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'turno_cadastro.html')));
app.get('/pedagogico/turnos/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'turno_editar.html')));

// NOVO: -- Cadastros Pedagógicos - Ofertas Educacionais --
app.get('/pedagogico/ofertas', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'oferta_lista.html')));
app.get('/pedagogico/ofertas/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'oferta_cadastro.html')));
app.get('/pedagogico/ofertas/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'oferta_editar.html')));

app.get('/pedagogico/series', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'serie_lista.html')));
app.get('/pedagogico/series/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'serie_cadastro.html')));
app.get('/pedagogico/series/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'serie_editar.html')));

// NOVO: -- Cadastros Pedagógicos - Períodos da Série --
app.get('/pedagogico/periodos-serie', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_serie_lista.html')));
app.get('/pedagogico/periodos-serie/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_serie_cadastro.html')));
app.get('/pedagogico/periodos-serie/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_serie_editar.html')));

// NOVO: -- Cadastros Pedagógicos - Períodos Letivos --
app.get('/pedagogico/periodos-letivos', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_letivo_lista.html')));
app.get('/pedagogico/periodos-letivos/novo', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_letivo_cadastro.html')));
app.get('/pedagogico/periodos-letivos/editar/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pedagogico', 'periodo_letivo_editar.html')));


// TODO: Adicionar rotas para Turnos, Ofertas Educacionais, etc. aqui

// === ROTAS DE API ===

// --- API para Tipos de Usuário ---
// POST /api/tipos-usuario - Criar
app.post('/api/tipos-usuario', (req, res) => {
    const { descricao } = req.body;
    const descricaoLimpa = tratarTexto(descricao);
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição é obrigatória.' });

    const sql = `INSERT INTO tipos_usuario (descricao) VALUES (?)`;
    db.run(sql, [descricaoLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: true, message: `A descrição "${descricaoLimpa}" já existe.` });
            console.error("Erro API POST /tipos-usuario:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar tipo de usuário.' });
        }
        res.status(201).json({ success: true, message: 'Tipo de usuário cadastrado!', id: this.lastID, redirectUrl: '/tipos-usuario' });
    });
});
// GET /api/tipos-usuario - Listar todos
app.get('/api/tipos-usuario', (req, res) => {
    db.all(`SELECT * FROM tipos_usuario ORDER BY descricao COLLATE NOCASE`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar tipos de usuário.' });
        res.json(rows);
    });
});
// GET /api/tipos-usuario/:id - Obter um
app.get('/api/tipos-usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    db.get(`SELECT * FROM tipos_usuario WHERE id_tipo_usuario = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar tipo de usuário.' });
        if (row) res.json(row);
        else res.status(404).json({ error: true, message: 'Tipo de usuário não encontrado.' });
    });
});
// PUT /api/tipos-usuario/:id - Atualizar
app.put('/api/tipos-usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao } = req.body;
    const descricaoLimpa = tratarTexto(descricao);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição é obrigatória.' });

    db.run(`UPDATE tipos_usuario SET descricao = ? WHERE id_tipo_usuario = ?`, [descricaoLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: true, message: `A descrição "${descricaoLimpa}" já existe.` });
            console.error("Erro API PUT /tipos-usuario:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar tipo de usuário.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Tipo de usuário não encontrado.' });
        res.json({ success: true, message: 'Tipo de usuário atualizado!', redirectUrl: '/tipos-usuario' });
    });
});
// DELETE /api/tipos-usuario/:id - Excluir
app.delete('/api/tipos-usuario/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: true, message: 'ID inválido.' });
    }

    // 1. Verificar se o tipo de usuário está em uso na tabela cadastro_usuarios
    const sqlCheckUsage = `SELECT COUNT(*) AS count FROM cadastro_usuarios WHERE id_tipo_usuario = ?`;
    db.get(sqlCheckUsage, [id], (err, row) => {
        if (err) {
            console.error("Erro ao verificar uso do tipo de usuário:", err.message);
            return res.status(500).json({ error: true, message: 'Erro interno ao verificar uso do tipo de usuário.' });
        }

        if (row && row.count > 0) {
            return res.status(400).json({ 
                error: true, 
                message: `Este tipo de usuário não pode ser excluído pois está em uso por ${row.count} usuário(s).` 
            });
        }

        // 2. Se não estiver em uso, proceder com a exclusão
        const sqlDelete = `DELETE FROM tipos_usuario WHERE id_tipo_usuario = ?`;
        db.run(sqlDelete, [id], function(errDelete) { // Use um nome diferente para a variável de erro aqui
            if (errDelete) {
                console.error("Erro ao deletar tipo de usuário:", errDelete.message);
                return res.status(500).json({ error: true, message: 'Erro ao excluir tipo de usuário do banco de dados.' });
            }
            if (this.changes === 0) { // Nenhum registro foi afetado (ID não encontrado)
                return res.status(404).json({ error: true, message: 'Tipo de usuário não encontrado para exclusão.' });
            }
            // Envia resposta de sucesso
            res.status(200).json({ success: true, message: 'Tipo de usuário excluído com sucesso!' });
        });
    });
});
// --- API para Níveis de Acesso ---
// POST /api/niveis-acesso - Criar
app.post('/api/niveis-acesso', (req, res) => {
    const { descricao } = req.body; // No HTML de cadastro, o name do input é 'descricao'
    const descricaoLimpa = tratarTexto(descricao);
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição do nível de acesso é obrigatória.' });

    const sql = `INSERT INTO niveis_acesso (descricao_nivel_acesso) VALUES (?)`;
    db.run(sql, [descricaoLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: true, message: `O nível de acesso "${descricaoLimpa}" já existe.` });
            console.error("Erro API POST /niveis-acesso:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar nível de acesso.' });
        }
        res.status(201).json({ success: true, message: 'Nível de acesso cadastrado!', id: this.lastID, redirectUrl: '/niveis-acesso' });
    });
});
// GET /api/niveis-acesso - Listar todos
app.get('/api/niveis-acesso', (req, res) => {
    db.all(`SELECT * FROM niveis_acesso ORDER BY descricao_nivel_acesso COLLATE NOCASE`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar níveis de acesso.' });
        res.json(rows);
    });
});
// GET /api/niveis-acesso/:id - Obter um
app.get('/api/niveis-acesso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    db.get(`SELECT * FROM niveis_acesso WHERE id_nivel_acesso = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar nível de acesso.' });
        if (row) res.json(row);
        else res.status(404).json({ error: true, message: 'Nível de acesso não encontrado.' });
    });
});
// PUT /api/niveis-acesso/:id - Atualizar
app.put('/api/niveis-acesso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao } = req.body; // Espera { "descricao": "novo valor" }
    const descricaoLimpa = tratarTexto(descricao);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição é obrigatória.' });

    db.run(`UPDATE niveis_acesso SET descricao_nivel_acesso = ? WHERE id_nivel_acesso = ?`, [descricaoLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) return res.status(400).json({ error: true, message: `A descrição "${descricaoLimpa}" já existe.` });
            console.error("Erro API PUT /niveis-acesso:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar nível de acesso.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Nível de acesso não encontrado.' });
        res.json({ success: true, message: 'Nível de acesso atualizado!', redirectUrl: '/niveis-acesso' });
    });
});
// DELETE /api/niveis-acesso/:id - Excluir
app.delete('/api/niveis-acesso/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT COUNT(*) AS count FROM cadastro_usuarios WHERE id_nivel_acesso = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao verificar uso.' });
        if (row.count > 0) return res.status(400).json({ error: true, message: `Nível de acesso em uso por ${row.count} usuário(s). Não pode ser excluído.` });

        db.run(`DELETE FROM niveis_acesso WHERE id_nivel_acesso = ?`, [id], function(err) {
            if (err) return res.status(500).json({ error: true, message: 'Erro ao excluir nível de acesso.' });
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Nível de acesso não encontrado.' });
            res.json({ success: true, message: 'Nível de acesso excluído!' });
        });
    });
});

// --- API para Tipos de CRE ---
// POST /api/tp-cre - Criar
app.post('/api/tp-cre', (req, res) => {
    const { decricao_cre, cre_reduzido } = req.body; // Nomes do HTML: decricao_cre, cre_reduzido
    const descricaoLimpa = tratarTexto(decricao_cre);
    const siglaLimpa = tratarTexto(cre_reduzido);
    if (!descricaoLimpa || !siglaLimpa) return res.status(400).json({ error: true, message: 'Descrição e Sigla do CRE são obrigatórias.' });

    const sql = `INSERT INTO tipos_cre (descricao_tipo_cre, sigla_tipo_cre) VALUES (?, ?)`;
    db.run(sql, [descricaoLimpa, siglaLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                let campo = err.message.includes('descricao_tipo_cre') ? `Descrição "${descricaoLimpa}"` : `Sigla "${siglaLimpa}"`;
                return res.status(400).json({ error: true, message: `${campo} já existe.` });
            }
            console.error("Erro API POST /tp-cre:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar Tipo de CRE.' });
        }
        res.status(201).json({ success: true, message: 'Tipo de CRE cadastrado!', id: this.lastID, redirectUrl: '/tp-cre' });
    });
});
// GET /api/tp-cre - Listar todos
app.get('/api/tp-cre', (req, res) => {
    db.all(`SELECT * FROM tipos_cre ORDER BY descricao_tipo_cre COLLATE NOCASE`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar Tipos de CRE.' });
        res.json(rows);
    });
});
// GET /api/tp-cre/:id - Obter um
app.get('/api/tp-cre/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    db.get(`SELECT * FROM tipos_cre WHERE id_tipo_cre = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar Tipo de CRE.' });
        if (row) res.json(row);
        else res.status(404).json({ error: true, message: 'Tipo de CRE não encontrado.' });
    });
});
// PUT /api/tp-cre/:id - Atualizar
app.put('/api/tp-cre/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { decricao_cre, cre_reduzido } = req.body; // name do form de edição: decricao_cre, cre_reduzido
    const descricaoLimpa = tratarTexto(decricao_cre);
    const siglaLimpa = tratarTexto(cre_reduzido);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa || !siglaLimpa) return res.status(400).json({ error: true, message: 'Descrição e Sigla são obrigatórias.' });

    db.run(`UPDATE tipos_cre SET descricao_tipo_cre = ?, sigla_tipo_cre = ? WHERE id_tipo_cre = ?`, [descricaoLimpa, siglaLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                let campo = err.message.includes('descricao_tipo_cre') ? `Descrição "${descricaoLimpa}"` : `Sigla "${siglaLimpa}"`;
                return res.status(400).json({ error: true, message: `${campo} já existe.` });
            }
            console.error("Erro API PUT /tp-cre:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar Tipo de CRE.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Tipo de CRE não encontrado.' });
        res.json({ success: true, message: 'Tipo de CRE atualizado!', redirectUrl: '/tp-cre' });
    });
});
// DELETE /api/tp-cre/:id - Excluir
app.delete('/api/tp-cre/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT COUNT(*) AS count FROM cad_escola WHERE id_tipo_cre = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao verificar uso.' });
        if (row.count > 0) return res.status(400).json({ error: true, message: `Tipo de CRE em uso por ${row.count} escola(s). Não pode ser excluído.` });

        db.run(`DELETE FROM tipos_cre WHERE id_tipo_cre = ?`, [id], function(err) {
            if (err) return res.status(500).json({ error: true, message: 'Erro ao excluir Tipo de CRE.' });
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Tipo de CRE não encontrado.' });
            res.json({ success: true, message: 'Tipo de CRE excluído!' });
        });
    });
});

// --- API para Escolas ---
// POST /api/escolas - Criar
app.post('/api/escolas', (req, res) => {
    let { nome_escola, nome_escola_reduzido, cod_sigrh, Id_tp_cre, ativo, cod_escola_inep } = req.body;
    const nomeEscolaLimpo = tratarTexto(nome_escola);
    const nomeReduzidoLimpo = tratarTexto(nome_escola_reduzido);
    const sigrhLimpo = tratarTexto(cod_sigrh);
    const inepLimpo = tratarTexto(cod_escola_inep);
    const statusEscolaDB = (ativo === 'true' || ativo === true) ? 'ATIVA' : 'INATIVA';
    const idCreParsed = Id_tp_cre ? parseInt(Id_tp_cre) : null;

    if (!nomeEscolaLimpo) return res.status(400).json({ error: true, message: 'Nome da Escola é obrigatório.' });
    if (sigrhLimpo && sigrhLimpo.length > 0 && sigrhLimpo.length !== 12) return res.status(400).json({ error: true, message: `Código SIGRH, se preenchido, deve ter 12 caracteres.` });
    if (Id_tp_cre && isNaN(idCreParsed)) return res.status(400).json({ error: true, message: 'ID do Tipo de CRE inválido.' });
    
    // TODO: Verificar se idCreParsed (se não for null) existe na tabela tipos_cre

    const sql = `INSERT INTO cad_escola (nome_escola, nome_reduzido_escola, cod_escola_sigrh, id_tipo_cre, status_escola, cod_escola_inep) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [nomeEscolaLimpo, nomeReduzidoLimpo || null, sigrhLimpo || null, idCreParsed, statusEscolaDB, inepLimpo || null], function(err) {
        if (err) {
            let msg = 'Erro ao cadastrar Escola.';
            if (err.message.includes('UNIQUE constraint failed')) {
                if (err.message.includes('nome_escola')) msg = `Nome da Escola "${nomeEscolaLimpo}" já existe.`;
                else if (err.message.includes('cod_escola_sigrh')) msg = `Código SIGRH "${sigrhLimpo}" já existe.`;
                else if (err.message.includes('cod_escola_inep')) msg = `Código INEP "${inepLimpo}" já existe.`;
                else msg = "Falha de valor único ao cadastrar escola.";
                return res.status(400).json({ error: true, message: msg });
            }
            console.error("Erro API POST /escolas:", err.message);
            return res.status(500).json({ error: true, message: msg });
        }
        res.status(201).json({ success: true, message: 'Escola cadastrada!', id: this.lastID, redirectUrl: '/escolas' });
    });
});
// GET /api/escolas - Listar todas
app.get('/api/escolas', (req, res) => {
    const sql = `
        SELECT e.id_cad_escola, e.nome_escola, e.nome_reduzido_escola, e.cod_escola_sigrh, 
               e.cod_escola_inep, e.status_escola, e.id_tipo_cre, 
               tc.descricao_tipo_cre, tc.sigla_tipo_cre 
        FROM cad_escola e 
        LEFT JOIN tipos_cre tc ON e.id_tipo_cre = tc.id_tipo_cre 
        ORDER BY e.nome_escola COLLATE NOCASE`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Erro API GET /api/escolas:", err.message); // Adiciona log de erro
            return res.status(500).json({ error: true, message: 'Erro ao buscar escolas.' });
        }
        const escolasFormatadas = rows.map(escola => ({
            ...escola, // Inclui todas as colunas selecionadas do DB
            ativo: escola.status_escola === 'ATIVA' // Converte para booleano para o frontend
        }));
        res.json(escolasFormatadas);
    });
});
// GET /api/escolas/:id - Obter uma
app.get('/api/escolas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    const sql = `
        SELECT e.id_cad_escola, e.nome_escola, e.nome_reduzido_escola, e.cod_escola_sigrh, 
               e.cod_escola_inep, e.status_escola, e.id_tipo_cre,
               tc.descricao_tipo_cre, tc.sigla_tipo_cre
        FROM cad_escola e 
        LEFT JOIN tipos_cre tc ON e.id_tipo_cre = tc.id_tipo_cre 
        WHERE e.id_cad_escola = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar escola.' });
        if (row) {
            res.json({ ...row, ativo: row.status_escola === 'ATIVA' });
        } else {
            res.status(404).json({ error: true, message: 'Escola não encontrada.' });
        }
    });
});
// PUT /api/escolas/:id - Atualizar
app.put('/api/escolas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    let { nome_escola, nome_escola_reduzido, cod_sigrh, Id_tp_cre, ativo, cod_escola_inep } = req.body;
    const nomeEscolaLimpo = tratarTexto(nome_escola);
    const nomeReduzidoLimpo = tratarTexto(nome_escola_reduzido);
    const sigrhLimpo = tratarTexto(cod_sigrh);
    const inepLimpo = tratarTexto(cod_escola_inep);
    const statusEscolaDB = (ativo === true || ativo === 'true') ? 'ATIVA' : 'INATIVA'; // 'ativo' vem como booleano do form de edição
    const idCreParsed = Id_tp_cre ? parseInt(Id_tp_cre) : null;

    if (!nomeEscolaLimpo) return res.status(400).json({ error: true, message: 'Nome da Escola é obrigatório.' });
    if (sigrhLimpo && sigrhLimpo.length > 0 && sigrhLimpo.length !== 12) return res.status(400).json({ error: true, message: `Código SIGRH, se preenchido, deve ter 12 caracteres.`});
    if (Id_tp_cre && isNaN(idCreParsed)) return res.status(400).json({ error: true, message: 'ID do Tipo de CRE inválido.' });

    const sql = `UPDATE cad_escola SET 
                 nome_escola = ?, nome_reduzido_escola = ?, cod_escola_sigrh = ?, 
                 id_tipo_cre = ?, status_escola = ?, cod_escola_inep = ?
                 WHERE id_cad_escola = ?`;
    db.run(sql, [nomeEscolaLimpo, nomeReduzidoLimpo || null, sigrhLimpo || null, idCreParsed, statusEscolaDB, inepLimpo || null, id], function(err) {
        if (err) {
            let msg = 'Erro ao atualizar Escola.';
            if (err.message.includes('UNIQUE constraint failed')) {
                 if (err.message.includes('nome_escola')) msg = `Nome da Escola "${nomeEscolaLimpo}" já existe em outro registro.`;
                else if (err.message.includes('cod_escola_sigrh')) msg = `Código SIGRH "${sigrhLimpo}" já existe em outro registro.`;
                else if (err.message.includes('cod_escola_inep')) msg = `Código INEP "${inepLimpo}" já existe em outro registro.`;
                else msg = "Falha de valor único ao atualizar escola.";
                return res.status(400).json({ error: true, message: msg });
            }
            console.error("Erro API PUT /escolas:", err.message);
            return res.status(500).json({ error: true, message: msg });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Escola não encontrada.' });
        res.json({ success: true, message: 'Escola atualizada!', redirectUrl: '/escolas' });
    });
});
// DELETE /api/escolas/:id - Excluir
app.delete('/api/escolas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT COUNT(*) AS count FROM cadastro_usuarios WHERE id_cad_escola = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao verificar uso por usuários.' });
        if (row.count > 0) return res.status(400).json({ error: true, message: `Escola em uso por ${row.count} usuário(s). Não pode ser excluída.` });

        // TODO: Adicionar verificação de uso em outras tabelas se a escola for chave estrangeira em mais lugares
        db.run(`DELETE FROM cad_escola WHERE id_cad_escola = ?`, [id], function(err) {
            if (err) return res.status(500).json({ error: true, message: 'Erro ao excluir escola.' });
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Escola não encontrada.' });
            res.json({ success: true, message: 'Escola excluída!' });
        });
    });
});

// --- API para Cadastro de Usuários ---
// POST /api/usuarios - Criar
app.post('/api/usuarios', async (req, res) => {
    const {
        nome_completo, email, matricula, data_admissao,
        id_cad_escola, id_tipo_usuario, id_nivel_acesso,
        senha, status_usuario
    } = req.body;

    const nomeLimpo = tratarTexto(nome_completo);
    const emailLimpo = tratarTexto(email).toLowerCase() || null;
    const matriculaLimpa = tratarTexto(matricula) || null;
    const senhaOriginal = senha;
    const statusUsuarioDB = (status_usuario === 'ATIVO' || status_usuario === true) ? 'ATIVO' : 'INATIVO';
    const idEscolaParsed = id_cad_escola ? parseInt(id_cad_escola) : null;
    const idTipoUsuarioParsed = parseInt(id_tipo_usuario);
    const idNivelAcessoParsed = parseInt(id_nivel_acesso);

    if (!nomeLimpo) return res.status(400).json({ error: true, message: "Nome completo é obrigatório." });
    if (!senhaOriginal) return res.status(400).json({ error: true, message: "Senha é obrigatória." });
    if (isNaN(idTipoUsuarioParsed)) return res.status(400).json({ error: true, message: "Tipo de usuário inválido." });
    if (isNaN(idNivelAcessoParsed)) return res.status(400).json({ error: true, message: "Nível de acesso inválido." });
    if (id_cad_escola && (isNaN(idEscolaParsed) || idEscolaParsed <=0) ) { // idEscolaParsed pode ser null, mas se tiver valor, deve ser válido
         if (id_cad_escola !== "") return res.status(400).json({ error: true, message: "ID da Escola inválido." });
    }
    if (matriculaLimpa && matriculaLimpa.length > 0 && matriculaLimpa.length !== 8) {
        return res.status(400).json({ error: true, message: `Matrícula, se preenchida, deve ter 8 caracteres.` });
    }

    // TODO: Validação de existência dos IDs de chave estrangeira no banco (id_tipo_usuario, id_nivel_acesso, id_cad_escola se fornecido)
    // const sal = await bcrypt.genSalt(10); // Para hash de senha
    // const senhaHash = await bcrypt.hash(senhaOriginal, sal); // Para hash de senha
    const senhaHash = senhaOriginal; // SUBSTITUIR PELO HASH REAL

    const sql = `INSERT INTO cadastro_usuarios 
                 (nome_completo, email, matricula, data_admissao, id_cad_escola, id_tipo_usuario, id_nivel_acesso, senha, status_usuario)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [
        nomeLimpo, emailLimpo, matriculaLimpa, data_admissao || null,
        idEscolaParsed, idTipoUsuarioParsed, idNivelAcessoParsed,
        senhaHash, statusUsuarioDB
    ], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed') && err.message.includes('email')) {
                return res.status(400).json({ error: true, message: `O email "${emailLimpo}" já está cadastrado.` });
            }
            console.error("Erro API POST /usuarios:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar usuário.' });
        }
        res.status(201).json({ success: true, message: 'Usuário cadastrado!', id: this.lastID, redirectUrl: '/usuarios' });
    });
});
// GET /api/usuarios - Listar todos
app.get('/api/usuarios', (req, res) => {
    const sql = `
        SELECT u.id_cadastro_usuario, u.nome_completo, u.email, u.matricula, u.data_admissao, u.status_usuario,
               tu.descricao AS tipo_usuario_descricao,
               na.descricao_nivel_acesso,
               e.nome_escola AS escola_nome
        FROM cadastro_usuarios u
        LEFT JOIN tipos_usuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
        LEFT JOIN niveis_acesso na ON u.id_nivel_acesso = na.id_nivel_acesso
        LEFT JOIN cad_escola e ON u.id_cad_escola = e.id_cad_escola
        ORDER BY u.nome_completo COLLATE NOCASE
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar usuários.' });
         const usuariosFormatados = rows.map(usr => ({
            ...usr,
            ativo: usr.status_usuario === 'ATIVO'
        }));
        res.json(usuariosFormatados);
    });
});
// GET /api/usuarios/:id - Obter um
app.get('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    const sql = `
        SELECT u.id_cadastro_usuario, u.nome_completo, u.email, u.matricula, u.data_admissao, 
               u.status_usuario, u.id_tipo_usuario, u.id_nivel_acesso, u.id_cad_escola,
               tu.descricao AS tipo_usuario_descricao,
               na.descricao_nivel_acesso,
               e.nome_escola AS escola_nome 
               /* Não selecionamos a senha */
        FROM cadastro_usuarios u
        LEFT JOIN tipos_usuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
        LEFT JOIN niveis_acesso na ON u.id_nivel_acesso = na.id_nivel_acesso
        LEFT JOIN cad_escola e ON u.id_cad_escola = e.id_cad_escola
        WHERE u.id_cadastro_usuario = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar usuário.' });
        if (row) {
            res.json({ ...row, ativo: row.status_usuario === 'ATIVO'});
        } else {
            res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
        }
    });
});
// PUT /api/usuarios/:id - Atualizar
app.put('/api/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    const {
        nome_completo, email, matricula, data_admissao,
        id_cad_escola, id_tipo_usuario, id_nivel_acesso,
        senha, status_usuario
    } = req.body;

    const nomeLimpo = tratarTexto(nome_completo);
    const emailLimpo = tratarTexto(email).toLowerCase() || null;
    const matriculaLimpa = tratarTexto(matricula) || null;
    const statusUsuarioDB = (status_usuario === 'ATIVO' || status_usuario === true) ? 'ATIVO' : 'INATIVA';
    const idEscolaParsed = id_cad_escola ? parseInt(id_cad_escola) : null;
    const idTipoUsuarioParsed = parseInt(id_tipo_usuario);
    const idNivelAcessoParsed = parseInt(id_nivel_acesso);
    
    if (!nomeLimpo) return res.status(400).json({ error: true, message: "Nome completo é obrigatório." });
    if (isNaN(idTipoUsuarioParsed)) return res.status(400).json({ error: true, message: "Tipo de usuário inválido." });
    if (isNaN(idNivelAcessoParsed)) return res.status(400).json({ error: true, message: "Nível de acesso inválido." });
    if (id_cad_escola && (isNaN(idEscolaParsed) || idEscolaParsed <=0) ) {
         if (id_cad_escola !== "") return res.status(400).json({ error: true, message: "ID da Escola inválido." });
    }
    if (matriculaLimpa && matriculaLimpa.length > 0 && matriculaLimpa.length !== 8) {
         return res.status(400).json({ error: true, message: `Matrícula, se preenchida, deve ter 8 caracteres.` });
    }

    let sqlUpdate;
    let params;
    let senhaFoiAlterada = false;

    if (senha && senha.trim() !== "") {
        // const sal = await bcrypt.genSalt(10);
        // const senhaHash = await bcrypt.hash(senha, sal);
        const senhaHash = senha; // REMOVER QUANDO USAR BCRYPT
        sqlUpdate = `UPDATE cadastro_usuarios SET 
                     nome_completo = ?, email = ?, matricula = ?, data_admissao = ?, 
                     id_cad_escola = ?, id_tipo_usuario = ?, id_nivel_acesso = ?, 
                     senha = ?, status_usuario = ?
                     WHERE id_cadastro_usuario = ?`;
        params = [
            nomeLimpo, emailLimpo, matriculaLimpa, data_admissao || null,
            idEscolaParsed, idTipoUsuarioParsed, idNivelAcessoParsed,
            senhaHash, statusUsuarioDB, id
        ];
        senhaFoiAlterada = true;
    } else {
        sqlUpdate = `UPDATE cadastro_usuarios SET 
                     nome_completo = ?, email = ?, matricula = ?, data_admissao = ?, 
                     id_cad_escola = ?, id_tipo_usuario = ?, id_nivel_acesso = ?, 
                     status_usuario = ?
                     WHERE id_cadastro_usuario = ?`;
        params = [
            nomeLimpo, emailLimpo, matriculaLimpa, data_admissao || null,
            idEscolaParsed, idTipoUsuarioParsed, idNivelAcessoParsed,
            statusUsuarioDB, id
        ];
    }

    db.run(sqlUpdate, params, function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed') && err.message.includes('email')) {
                return res.status(400).json({ error: true, message: `O email "${emailLimpo}" já está cadastrado em outro usuário.` });
            }
            console.error("Erro API PUT /usuarios:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar usuário.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
        res.json({ success: true, message: 'Usuário atualizado!', redirectUrl: '/usuarios' });
    });
});
// DELETE /api/usuarios/:id - Excluir
app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    
    db.run(`DELETE FROM cadastro_usuarios WHERE id_cadastro_usuario = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao excluir usuário.' });
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Usuário não encontrado.' });
        res.json({ success: true, message: 'Usuário excluído!' });
    });
});

// NOVO: --- API para Modalidades ---
// POST /api/modalidades - Criar nova modalidade
app.post('/api/modalidades', (req, res) => {
    const { descricao_modalidade } = req.body;
    const descricaoLimpa = tratarTexto(descricao_modalidade);

    if (!descricaoLimpa) {
        return res.status(400).json({ error: true, message: 'Descrição da modalidade é obrigatória.' });
    }
    const sql = `INSERT INTO modalidades (descricao_modalidade) VALUES (?)`;
    db.run(sql, [descricaoLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `A modalidade "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API POST /api/modalidades:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar modalidade.' });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Modalidade cadastrada com sucesso!', 
            id: this.lastID,
            redirectUrl: '/pedagogico/modalidades' // Redireciona para a nova lista
        });
    });
});

// GET /api/modalidades - Listar todas as modalidades
app.get('/api/modalidades', (req, res) => {
    db.all(`SELECT * FROM modalidades ORDER BY descricao_modalidade COLLATE NOCASE`, [], (err, rows) => {
        if (err) {
            console.error("Erro API GET /api/modalidades:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar modalidades.' });
        }
        res.json(rows);
    });
});

// GET /api/modalidades/:id - Obter uma modalidade
app.get('/api/modalidades/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT * FROM modalidades WHERE id_modalidade = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro API GET /api/modalidades/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar modalidade.' });
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: true, message: 'Modalidade não encontrada.' });
        }
    });
});

// PUT /api/modalidades/:id - Atualizar uma modalidade
app.put('/api/modalidades/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao_modalidade } = req.body;
    const descricaoLimpa = tratarTexto(descricao_modalidade);

    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição da modalidade é obrigatória.' });

    db.run(`UPDATE modalidades SET descricao_modalidade = ? WHERE id_modalidade = ?`, [descricaoLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `A modalidade "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API PUT /api/modalidades/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar modalidade.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Modalidade não encontrada.' });
        res.json({ 
            success: true, 
            message: 'Modalidade atualizada com sucesso!',
            redirectUrl: '/pedagogico/modalidades'
        });
    });
});

// DELETE /api/modalidades/:id - Excluir uma modalidade
app.delete('/api/modalidades/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // Verificar se a modalidade está em uso na tabela 'series'
    db.get(`SELECT COUNT(*) AS count FROM series WHERE id_modalidade = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro ao verificar uso da modalidade:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar uso da modalidade.' });
        }
        if (row && row.count > 0) {
            return res.status(400).json({ error: true, message: `Esta modalidade não pode ser excluída pois está em uso por ${row.count} série(s).` });
        }

        db.run(`DELETE FROM modalidades WHERE id_modalidade = ?`, [id], function(errDelete) {
            if (errDelete) {
                console.error("Erro API DELETE /api/modalidades/:id:", errDelete.message);
                return res.status(500).json({ error: true, message: 'Erro ao excluir modalidade.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Modalidade não encontrada.' });
            res.json({ success: true, message: 'Modalidade excluída com sucesso!' });
        });
    });
});

// POST /api/turnos - Criar novo turno
app.post('/api/turnos', (req, res) => {
    const { descricao_turno } = req.body;
    const descricaoLimpa = tratarTexto(descricao_turno);

    if (!descricaoLimpa) {
        return res.status(400).json({ error: true, message: 'Descrição do turno é obrigatória.' });
    }
    const sql = `INSERT INTO turnos (descricao_turno) VALUES (?)`;
    db.run(sql, [descricaoLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `O turno "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API POST /api/turnos:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar turno.' });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Turno cadastrado com sucesso!', 
            id: this.lastID,
            redirectUrl: '/pedagogico/turnos'
        });
    });
});
// GET /api/turnos - Listar todos os turnos
app.get('/api/turnos', (req, res) => {
    db.all(`SELECT * FROM turnos ORDER BY descricao_turno COLLATE NOCASE`, [], (err, rows) => {
        if (err) {
            console.error("Erro API GET /api/turnos:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar turnos.' });
        }
        res.json(rows);
    });
});

// GET /api/turnos/:id - Obter um turno
app.get('/api/turnos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT * FROM turnos WHERE id_turno = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro API GET /api/turnos/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar turno.' });
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: true, message: 'Turno não encontrado.' });
        }
    });
});

// PUT /api/turnos/:id - Atualizar um turno
app.put('/api/turnos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao_turno } = req.body;
    const descricaoLimpa = tratarTexto(descricao_turno);

    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição do turno é obrigatória.' });

    db.run(`UPDATE turnos SET descricao_turno = ? WHERE id_turno = ?`, [descricaoLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `O turno "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API PUT /api/turnos/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar turno.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Turno não encontrado.' });
        res.json({ 
            success: true, 
            message: 'Turno atualizado com sucesso!',
            redirectUrl: '/pedagogico/turnos'
        });
    });
});

// DELETE /api/turnos/:id - Excluir um turno
app.delete('/api/turnos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // Verificar se o turno está em uso na tabela 'matrizes_curriculares' (ou outras tabelas relevantes)
    db.get(`SELECT COUNT(*) AS count FROM matrizes_curriculares WHERE id_turno = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro ao verificar uso do turno:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar uso do turno.' });
        }
        if (row && row.count > 0) {
            return res.status(400).json({ error: true, message: `Este turno não pode ser excluído pois está em uso por ${row.count} matriz(es) curricular(es).` });
        }
        // Adicionar outras verificações de uso se necessário (ex: turmas)

        db.run(`DELETE FROM turnos WHERE id_turno = ?`, [id], function(errDelete) {
            if (errDelete) {
                console.error("Erro API DELETE /api/turnos/:id:", errDelete.message);
                return res.status(500).json({ error: true, message: 'Erro ao excluir turno.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Turno não encontrado.' });
            res.json({ success: true, message: 'Turno excluído com sucesso!' });
        });
    });
});
// --- FIM DA API DE MODALIDADES E TURNOS ---
// NOVO: --- API para Ofertas Educacionais ---
// POST /api/ofertas - Criar nova oferta educacional
app.post('/api/ofertas', (req, res) => {
    // O nome do campo no HTML será 'descricao_oferta_educacional'
    const { descricao_oferta_educacional } = req.body; 
    const descricaoLimpa = tratarTexto(descricao_oferta_educacional);

    if (!descricaoLimpa) {
        return res.status(400).json({ error: true, message: 'Descrição da oferta educacional é obrigatória.' });
    }
    const sql = `INSERT INTO ofertas_educacionais (descricao_oferta_educacional) VALUES (?)`;
    db.run(sql, [descricaoLimpa], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `A oferta educacional "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API POST /api/ofertas:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar oferta educacional.' });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Oferta educacional cadastrada com sucesso!', 
            id: this.lastID,
            redirectUrl: '/pedagogico/ofertas'
        });
    });
});

// GET /api/ofertas - Listar todas as ofertas educacionais
app.get('/api/ofertas', (req, res) => {
    db.all(`SELECT * FROM ofertas_educacionais ORDER BY descricao_oferta_educacional COLLATE NOCASE`, [], (err, rows) => {
        if (err) {
            console.error("Erro API GET /api/ofertas:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar ofertas educacionais.' });
        }
        res.json(rows);
    });
});

// GET /api/ofertas/:id - Obter uma oferta educacional
app.get('/api/ofertas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    db.get(`SELECT * FROM ofertas_educacionais WHERE id_oferta_educacional = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro API GET /api/ofertas/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar oferta educacional.' });
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: true, message: 'Oferta educacional não encontrada.' });
        }
    });
});

// PUT /api/ofertas/:id - Atualizar uma oferta educacional
app.put('/api/ofertas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao_oferta_educacional } = req.body;
    const descricaoLimpa = tratarTexto(descricao_oferta_educacional);

    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!descricaoLimpa) return res.status(400).json({ error: true, message: 'Descrição da oferta educacional é obrigatória.' });

    db.run(`UPDATE ofertas_educacionais SET descricao_oferta_educacional = ? WHERE id_oferta_educacional = ?`, [descricaoLimpa, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: true, message: `A oferta educacional "${descricaoLimpa}" já existe.` });
            }
            console.error("Erro API PUT /api/ofertas/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar oferta educacional.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Oferta educacional não encontrada.' });
        res.json({ 
            success: true, 
            message: 'Oferta educacional atualizada com sucesso!',
            redirectUrl: '/pedagogico/ofertas'
        });
    });
});

// DELETE /api/ofertas/:id - Excluir uma oferta educacional
app.delete('/api/ofertas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // Verificar se a oferta educacional está em uso na tabela 'matrizes_curriculares'
    db.get(`SELECT COUNT(*) AS count FROM matrizes_curriculares WHERE id_oferta_educacional = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro ao verificar uso da oferta educacional:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar uso da oferta educacional.' });
        }
        if (row && row.count > 0) {
            return res.status(400).json({ error: true, message: `Esta oferta educacional não pode ser excluída pois está em uso por ${row.count} matriz(es) curricular(es).` });
        }
        // Adicionar outras verificações de uso se necessário

        db.run(`DELETE FROM ofertas_educacionais WHERE id_oferta_educacional = ?`, [id], function(errDelete) {
            if (errDelete) {
                console.error("Erro API DELETE /api/ofertas/:id:", errDelete.message);
                return res.status(500).json({ error: true, message: 'Erro ao excluir oferta educacional.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Oferta educacional não encontrada.' });
            res.json({ success: true, message: 'Oferta educacional excluída com sucesso!' });
        });
    });
});

// NOVO: --- API para Séries/Anos ---
// POST /api/series - Criar nova série
app.post('/api/series', (req, res) => {
    const { descricao_serie, sigla_serie, id_modalidade, ordem } = req.body;
    const descLimpa = tratarTexto(descricao_serie);
    const siglaLimpa = tratarTexto(sigla_serie).toUpperCase(); // Padroniza sigla para maiúsculas
    const modId = parseInt(id_modalidade);
    const ordemNum = ordem ? parseInt(ordem) : null;

    if (!descLimpa || !modId) {
        return res.status(400).json({ error: true, message: 'Descrição da série e Modalidade são obrigatórias.' });
    }
    if (isNaN(modId)) return res.status(400).json({ error: true, message: 'ID da Modalidade inválido.' });
    
    // Verificar duplicidade de sigla (que é UNIQUE COLLATE NOCASE na tabela)
    // E duplicidade de (modalidade, descrição)
    db.get(`SELECT id_serie FROM series WHERE id_modalidade = ? AND descricao_serie = ? COLLATE NOCASE`, 
        [modId, descLimpa], (errChkDesc, rowChkDesc) => {
        if (errChkDesc) return res.status(500).json({ error: true, message: 'Erro ao verificar duplicidade de descrição.' });
        if (rowChkDesc) return res.status(400).json({ error: true, message: `A descrição "${descLimpa}" já existe para esta modalidade.`});

        const sql = `INSERT INTO series (descricao_serie, sigla_serie, id_modalidade, ordem) VALUES (?, ?, ?, ?)`;
        db.run(sql, [descLimpa, siglaLimpa || null, modId, ordemNum], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed') && err.message.includes('sigla_serie')) {
                    return res.status(400).json({ error: true, message: `A sigla "${siglaLimpa}" já existe.` });
                }
                console.error("Erro API POST /api/series:", err.message);
                return res.status(500).json({ error: true, message: 'Erro ao cadastrar série.' });
            }
            res.status(201).json({ success: true, message: 'Série cadastrada!', id: this.lastID, redirectUrl: '/pedagogico/series' });
        });
    });
});

// GET /api/series - Listar todas as séries (com nome da modalidade)
app.get('/api/series', (req, res) => {
    const sql = `
        SELECT s.id_serie, s.descricao_serie, s.sigla_serie, s.id_modalidade, s.ordem, m.descricao_modalidade 
        FROM series s
        JOIN modalidades m ON s.id_modalidade = m.id_modalidade
        ORDER BY m.descricao_modalidade COLLATE NOCASE, s.ordem, s.descricao_serie COLLATE NOCASE
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar séries.' });
        res.json(rows);
    });
});

// GET /api/series/:id - Obter uma série
app.get('/api/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    const sql = `
        SELECT s.id_serie, s.descricao_serie, s.sigla_serie, s.id_modalidade, s.ordem, m.descricao_modalidade 
        FROM series s
        JOIN modalidades m ON s.id_modalidade = m.id_modalidade
        WHERE s.id_serie = ?
    `;
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar série.' });
        if (row) res.json(row);
        else res.status(404).json({ error: true, message: 'Série não encontrada.' });
    });
});

// PUT /api/series/:id - Atualizar uma série
app.put('/api/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { descricao_serie, sigla_serie, id_modalidade, ordem } = req.body;
    const descLimpa = tratarTexto(descricao_serie);
    const siglaLimpa = tratarTexto(sigla_serie).toUpperCase();
    const modId = parseInt(id_modalidade);
    const ordemNum = ordem ? parseInt(ordem) : null;

    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID da série inválido.' });
    if (!descLimpa || !modId) return res.status(400).json({ error: true, message: 'Descrição e Modalidade são obrigatórias.'});
    if (isNaN(modId)) return res.status(400).json({ error: true, message: 'ID da Modalidade inválido.' });

    // Verificar duplicidade de (modalidade, descrição) em OUTROS registros
    db.get(`SELECT id_serie FROM series WHERE id_modalidade = ? AND descricao_serie = ? COLLATE NOCASE AND id_serie != ?`,
        [modId, descLimpa, id], (errChkDesc, rowChkDesc) => {
        if (errChkDesc) return res.status(500).json({ error: true, message: 'Erro ao verificar duplicidade de descrição.' });
        if (rowChkDesc) return res.status(400).json({ error: true, message: `A descrição "${descLimpa}" já existe para esta modalidade em outra série.`});
        
        const sql = `UPDATE series SET descricao_serie = ?, sigla_serie = ?, id_modalidade = ?, ordem = ? WHERE id_serie = ?`;
        db.run(sql, [descLimpa, siglaLimpa || null, modId, ordemNum, id], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed') && err.message.includes('sigla_serie')) {
                     return res.status(400).json({ error: true, message: `A sigla "${siglaLimpa}" já existe em outra série.` });
                }
                console.error("Erro API PUT /api/series:", err.message);
                return res.status(500).json({ error: true, message: 'Erro ao atualizar série.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Série não encontrada.' });
            res.json({ success: true, message: 'Série atualizada!', redirectUrl: '/pedagogico/series' });
        });
    });
});

// DELETE /api/series/:id - Excluir uma série
app.delete('/api/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // Verificar se a série está em uso (ex: em periodos_serie, matrizes_curriculares, etc.)
    db.get(`SELECT COUNT(*) AS count FROM periodos_serie WHERE id_serie = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao verificar uso da série.' });
        if (row && row.count > 0) {
            return res.status(400).json({ error: true, message: `Série em uso por ${row.count} período(s) de série. Não pode ser excluída.` });
        }
        // Adicionar outras verificações de FK aqui (ex: matrizes_curriculares)

        db.run(`DELETE FROM series WHERE id_serie = ?`, [id], function(errDel) {
            if (errDel) return res.status(500).json({ error: true, message: 'Erro ao excluir série.' });
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Série não encontrada.' });
            res.json({ success: true, message: 'Série excluída!' });
        });
    });
});


// POST /api/periodos-serie - Criar novo período da série
app.post('/api/periodos-serie', (req, res) => {
    const { id_serie, descricao_periodo, sigla_periodo, ordem } = req.body;
    const serieId = parseInt(id_serie);
    const descLimpa = tratarTexto(descricao_periodo);
    const siglaLimpa = tratarTexto(sigla_periodo);
    const ordemNum = ordem ? parseInt(ordem) : null;

    if (!serieId || !descLimpa) {
        return res.status(400).json({ error: true, message: 'Série e Descrição do Período são obrigatórios.' });
    }
    if (isNaN(serieId)) return res.status(400).json({ error: true, message: 'ID da Série inválido.' });

    // Verificar duplicidade de (id_serie, descricao_periodo)
    db.get(`SELECT id_periodo_serie FROM periodos_serie WHERE id_serie = ? AND descricao_periodo = ? COLLATE NOCASE`,
        [serieId, descLimpa], (errChk, rowChk) => {
        if (errChk) {
            console.error("Erro API POST /api/periodos-serie (check duplicidade):", errChk.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar duplicidade.' });
        }
        if (rowChk) {
            return res.status(400).json({ error: true, message: `O período "${descLimpa}" já existe para esta série.` });
        }

        const sql = `INSERT INTO periodos_serie (id_serie, descricao_periodo, sigla_periodo, ordem) VALUES (?, ?, ?, ?)`;
        db.run(sql, [serieId, descLimpa, siglaLimpa || null, ordemNum], function(err) {
            if (err) {
                console.error("Erro API POST /api/periodos-serie (insert):", err.message);
                return res.status(500).json({ error: true, message: 'Erro ao cadastrar período da série.' });
            }
            res.status(201).json({ 
                success: true, 
                message: 'Período da série cadastrado com sucesso!', 
                id: this.lastID,
                redirectUrl: '/pedagogico/periodos-serie' 
            });
        });
    });
});

// GET /api/periodos-serie - Listar todos (com nome da série e modalidade)
app.get('/api/periodos-serie', (req, res) => {
    const sql = `
        SELECT ps.id_periodo_serie, ps.descricao_periodo, ps.sigla_periodo, ps.ordem,
               s.id_serie, s.descricao_serie, 
               m.id_modalidade, m.descricao_modalidade
        FROM periodos_serie ps
        JOIN series s ON ps.id_serie = s.id_serie
        JOIN modalidades m ON s.id_modalidade = m.id_modalidade
        ORDER BY m.descricao_modalidade COLLATE NOCASE, s.ordem, s.descricao_serie COLLATE NOCASE, ps.ordem, ps.descricao_periodo COLLATE NOCASE
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Erro API GET /api/periodos-serie:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar períodos da série.' });
        }
        res.json(rows);
    });
});

// GET /api/periodos-serie/:id - Obter um
app.get('/api/periodos-serie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    const sql = `
        SELECT ps.*, s.descricao_serie, m.descricao_modalidade 
        FROM periodos_serie ps
        JOIN series s ON ps.id_serie = s.id_serie
        JOIN modalidades m ON s.id_modalidade = m.id_modalidade
        WHERE ps.id_periodo_serie = ?
    `;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error("Erro API GET /api/periodos-serie/:id:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao buscar período da série.' });
        }
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: true, message: 'Período da série não encontrado.' });
        }
    });
});

// PUT /api/periodos-serie/:id - Atualizar
app.put('/api/periodos-serie/:id', (req, res) => {
    const id = parseInt(req.params.id); // ID do período da série a ser editado
    const { id_serie, descricao_periodo, sigla_periodo, ordem } = req.body;
    const serieId = parseInt(id_serie);
    const descLimpa = tratarTexto(descricao_periodo);
    const siglaLimpa = tratarTexto(sigla_periodo);
    const ordemNum = ordem ? parseInt(ordem) : null;

    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID do período inválido.' });
    if (!serieId || !descLimpa) return res.status(400).json({ error: true, message: 'Série e Descrição do Período são obrigatórios.' });
    if (isNaN(serieId)) return res.status(400).json({ error: true, message: 'ID da Série inválido.' });

    // Verificar duplicidade de (id_serie, descricao_periodo) em OUTROS registros
    db.get(`SELECT id_periodo_serie FROM periodos_serie WHERE id_serie = ? AND descricao_periodo = ? COLLATE NOCASE AND id_periodo_serie != ?`,
        [serieId, descLimpa, id], (errChk, rowChk) => {
        if (errChk) {
            console.error("Erro API PUT /api/periodos-serie (check duplicidade):", errChk.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar duplicidade.' });
        }
        if (rowChk) {
            return res.status(400).json({ error: true, message: `O período "${descLimpa}" já existe para esta série em outro registro.` });
        }

        const sql = `UPDATE periodos_serie SET id_serie = ?, descricao_periodo = ?, sigla_periodo = ?, ordem = ? 
                     WHERE id_periodo_serie = ?`;
        db.run(sql, [serieId, descLimpa, siglaLimpa || null, ordemNum, id], function(err) {
            if (err) {
                console.error("Erro API PUT /api/periodos-serie (update):", err.message);
                return res.status(500).json({ error: true, message: 'Erro ao atualizar período da série.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Período da série não encontrado.' });
            res.json({ 
                success: true, 
                message: 'Período da série atualizado com sucesso!', 
                redirectUrl: '/pedagogico/periodos-serie' 
            });
        });
    });
});

// DELETE /api/periodos-serie/:id - Excluir
app.delete('/api/periodos-serie/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // Verificar se o período da série está em uso. Ex: tabela ofertas_uc_percurso ou matriz_itens
    // Na tabela 'ofertas_uc_percurso', a FK é 'id_semestre_modalidade', que é o nome antigo de 'id_periodo_serie'
    db.get(`SELECT COUNT(*) AS count FROM ofertas_uc_percurso WHERE id_semestre_modalidade = ?`, [id], (err, row) => {
        if (err) {
            console.error("Erro API DELETE /api/periodos-serie (check uso UC):", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao verificar uso do período.' });
        }
        if (row && row.count > 0) {
             return res.status(400).json({ error: true, message: `Período da série em uso por ${row.count} Unidade(s) Curricular(es) de Percurso. Não pode ser excluído.` });
        }
        
        // Adicionar outras verificações de FK se 'periodos_serie.id_periodo_serie' for referenciado em mais tabelas
        // Exemplo: `SELECT COUNT(*) AS count FROM matriz_itens WHERE id_periodo_serie_oferta = ?` (se for esse o nome da FK)


        db.run(`DELETE FROM periodos_serie WHERE id_periodo_serie = ?`, [id], function(errDel) {
            if (errDel) {
                console.error("Erro API DELETE /api/periodos-serie (delete):", errDel.message);
                return res.status(500).json({ error: true, message: 'Erro ao excluir período da série.' });
            }
            if (this.changes === 0) return res.status(404).json({ error: true, message: 'Período da série não encontrado.' });
            res.json({ success: true, message: 'Período da série excluído com sucesso!' });
        });
    });
});


// NOVO: --- API para Períodos Letivos ---
// POST /api/periodos-letivos - Criar novo período letivo
app.post('/api/periodos-letivos', (req, res) => {
    const { ano_letivo, referencia_periodo, identificador_periodo, data_inicio, data_fim, status_periodo_letivo } = req.body;
    const anoNum = parseInt(ano_letivo);
    const refLimpa = tratarTexto(referencia_periodo);
    const identLimpo = tratarTexto(identificador_periodo); // Ex: "2025/1" ou "2025-ANUAL"
    const statusLimpo = tratarTexto(status_periodo_letivo) || 'Planejamento';

    if (!anoNum || !refLimpa || !identLimpo) {
        return res.status(400).json({ error: true, message: 'Ano, Referência e Identificador do Período são obrigatórios.' });
    }
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > 2200) {
        return res.status(400).json({ error: true, message: 'Ano letivo inválido.' });
    }

    const sql = `INSERT INTO periodos_letivos (ano_letivo, referencia_periodo, identificador_periodo, data_inicio, data_fim, status_periodo_letivo) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [anoNum, refLimpa, identLimpo, data_inicio || null, data_fim || null, statusLimpo], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed') && err.message.includes('identificador_periodo')) {
                return res.status(400).json({ error: true, message: `O identificador de período "${identLimpo}" já existe.` });
            }
            console.error("Erro API POST /api/periodos-letivos:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao cadastrar período letivo.' });
        }
        res.status(201).json({ success: true, message: 'Período letivo cadastrado!', id: this.lastID, redirectUrl: '/pedagogico/periodos-letivos' });
    });
});

// GET /api/periodos-letivos - Listar todos
app.get('/api/periodos-letivos', (req, res) => {
    const sql = `SELECT * FROM periodos_letivos ORDER BY ano_letivo DESC, identificador_periodo COLLATE NOCASE`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar períodos letivos.' });
        res.json(rows);
    });
});

// GET /api/periodos-letivos/:id - Obter um
app.get('/api/periodos-letivos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    db.get(`SELECT * FROM periodos_letivos WHERE id_periodo_letivo = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: true, message: 'Erro ao buscar período letivo.' });
        if (row) res.json(row);
        else res.status(404).json({ error: true, message: 'Período letivo não encontrado.' });
    });
});

// PUT /api/periodos-letivos/:id - Atualizar
app.put('/api/periodos-letivos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { ano_letivo, referencia_periodo, identificador_periodo, data_inicio, data_fim, status_periodo_letivo } = req.body;
    const anoNum = parseInt(ano_letivo);
    const refLimpa = tratarTexto(referencia_periodo);
    const identLimpo = tratarTexto(identificador_periodo);
    const statusLimpo = tratarTexto(status_periodo_letivo) || 'Planejamento';
    
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });
    if (!anoNum || !refLimpa || !identLimpo) {
        return res.status(400).json({ error: true, message: 'Ano, Referência e Identificador do Período são obrigatórios.'});
    }
    if (isNaN(anoNum) || anoNum < 1900 || anoNum > 2200) {
        return res.status(400).json({ error: true, message: 'Ano letivo inválido.' });
    }

    const sql = `UPDATE periodos_letivos SET ano_letivo = ?, referencia_periodo = ?, identificador_periodo = ?, 
                 data_inicio = ?, data_fim = ?, status_periodo_letivo = ? 
                 WHERE id_periodo_letivo = ?`;
    db.run(sql, [anoNum, refLimpa, identLimpo, data_inicio || null, data_fim || null, statusLimpo, id], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed') && err.message.includes('identificador_periodo')) {
                 return res.status(400).json({ error: true, message: `O identificador de período "${identLimpo}" já existe em outro registro.` });
            }
            console.error("Erro API PUT /api/periodos-letivos:", err.message);
            return res.status(500).json({ error: true, message: 'Erro ao atualizar período letivo.' });
        }
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Período letivo não encontrado.' });
        res.json({ success: true, message: 'Período letivo atualizado!', redirectUrl: '/pedagogico/periodos-letivos' });
    });
});

// DELETE /api/periodos-letivos/:id - Excluir
app.delete('/api/periodos-letivos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: true, message: 'ID inválido.' });

    // TODO: Verificar se o período letivo está em uso (ex: em matrizes_curriculares, turmas, etc.)
    // db.get(`SELECT COUNT(*) AS count FROM NOME_TABELA_USO WHERE id_periodo_letivo = ?`, [id], (err, row) => { ... });

    db.run(`DELETE FROM periodos_letivos WHERE id_periodo_letivo = ?`, [id], function(errDel) {
        if (errDel) return res.status(500).json({ error: true, message: 'Erro ao excluir período letivo.' });
        if (this.changes === 0) return res.status(404).json({ error: true, message: 'Período letivo não encontrado.' });
        res.json({ success: true, message: 'Período letivo excluído!' });
    });
});

// --- FIM DA API DE OFERTAS EDUCACIONAIS ---


// --- FIM DAS ROTAS DE API ---

// 4. Fazer o servidor "escutar"
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} em http://localhost:${PORT}`);
});
