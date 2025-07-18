const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho para o arquivo do banco de dados.
// Ele será criado na raiz do projeto se não existir.
const dbPath = path.resolve(__dirname, '..', 'escola.db'); // Coloca escola.db na raiz do projeto

// Cria (ou abre) o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados SQLite:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite 'escola.db'");
        criarTabelasIniciais();
    }
});

// Função para criar as tabelas se elas não existirem
function criarTabelasIniciais() {
    db.serialize(() => { // Garante que os comandos SQL rodem em sequência
        console.log("Verificando e criando tabelas...");

        // Tabela: tipos_usuario
        db.run(`
            CREATE TABLE IF NOT EXISTS tipos_usuario (
                id_tipo_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao TEXT NOT NULL UNIQUE
            )
        `, (err) => {
            if (err) {
                console.error("Erro ao criar tabela 'tipos_usuario':", err.message);
            } else {
                console.log("Tabela 'tipos_usuario' verificada/criada com sucesso.");
                // Poderíamos inserir alguns dados padrão aqui se desejado, por exemplo:
                // db.run("INSERT OR IGNORE INTO tipos_usuario (descricao) VALUES (?)", ["Administrador"]);
                // db.run("INSERT OR IGNORE INTO tipos_usuario (descricao) VALUES (?)", ["Professor"]);
            }
        });

        // Tabela: niveis_acesso
        db.run(`
            CREATE TABLE IF NOT EXISTS niveis_acesso (
                id_nivel_acesso INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao_nivel_acesso TEXT NOT NULL UNIQUE
            )
        `, (err) => {
            if (err) { console.error("Erro ao criar tabela 'niveis_acesso':", err.message); }
            else { console.log("Tabela 'niveis_acesso' verificada/criada com sucesso."); }
        });

        // Tabela: tipos_cre
        db.run(`
            CREATE TABLE IF NOT EXISTS tipos_cre (
                id_tipo_cre INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao_tipo_cre TEXT NOT NULL UNIQUE,
                sigla_tipo_cre TEXT UNIQUE
            )
        `, (err) => {
            if (err) { console.error("Erro ao criar tabela 'tipos_cre':", err.message); }
            else { console.log("Tabela 'tipos_cre' verificada/criada com sucesso."); }
        });
         
        // Tabela: cad_escola
        db.run(`
            CREATE TABLE IF NOT EXISTS cad_escola (
                id_cad_escola INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_escola TEXT NOT NULL UNIQUE,
                id_tipo_cre INTEGER,
                cod_escola_inep TEXT UNIQUE,
                nome_reduzido_escola TEXT,
                cod_escola_sigrh TEXT UNIQUE,
                status_escola TEXT DEFAULT 'ATIVA',
                FOREIGN KEY (id_tipo_cre) REFERENCES tipos_cre(id_tipo_cre)
            )
        `, (err) => {
            if (err) { console.error("Erro ao criar tabela 'cad_escola':", err.message); }
            else { console.log("Tabela 'cad_escola' verificada/criada com sucesso."); }
        });

        // Tabela: cadastro_usuarios
        db.run(`
            CREATE TABLE IF NOT EXISTS cadastro_usuarios (
                id_cadastro_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                id_tipo_usuario INTEGER NOT NULL,
                id_nivel_acesso INTEGER NOT NULL,
                id_cad_escola INTEGER,
                nome_completo TEXT NOT NULL,
                email TEXT UNIQUE,
                senha TEXT NOT NULL,
                matricula TEXT, 
                data_admissao DATE,
                status_usuario TEXT DEFAULT 'ATIVO',
                FOREIGN KEY (id_tipo_usuario) REFERENCES tipos_usuario(id_tipo_usuario),
                FOREIGN KEY (id_nivel_acesso) REFERENCES niveis_acesso(id_nivel_acesso),
                FOREIGN KEY (id_cad_escola) REFERENCES cad_escola(id_cad_escola)
            )
        `, (err) => {
            if (err) { console.error("Erro ao criar tabela 'cadastro_usuarios':", err.message); }
            else { console.log("Tabela 'cadastro_usuarios' verificada/criada com sucesso."); }
        });

        // Adicione aqui a criação das outras tabelas conforme necessário
         // ... (dentro da função criarTabelasIniciais, após as outras tabelas) ...

           // Tabela: modalidades (NOVA TABELA PEDAGÓGICA)
           db.run(`
               CREATE TABLE IF NOT EXISTS modalidades (
                   id_modalidade INTEGER PRIMARY KEY AUTOINCREMENT,
                   descricao_modalidade TEXT NOT NULL UNIQUE COLLATE NOCASE 
               )
           `, (err) => {
               if (err) {
                   console.error("Erro ao criar tabela 'modalidades':", err.message);
               } else {
                   console.log("Tabela 'modalidades' verificada/criada com sucesso.");
                   // Dados iniciais de exemplo (opcional)
                   const modalidadesIniciais = ['Ensino Fundamental', 'Ensino Médio', 'Educação Profissional Técnica', 'Educação de Jovens e Adultos'];
                   modalidadesIniciais.forEach(desc => {
                       db.run("INSERT OR IGNORE INTO modalidades (descricao_modalidade) VALUES (?)", [desc]);
                   });
               }
           });

           // Tabela: turnos (NOVA TABELA PEDAGÓGICA)
           db.run(`
               CREATE TABLE IF NOT EXISTS turnos (
                   id_turno INTEGER PRIMARY KEY AUTOINCREMENT,
                   descricao_turno TEXT NOT NULL UNIQUE COLLATE NOCASE
               )
           `, (err) => {
               if (err) { console.error("Erro ao criar tabela 'turnos':", err.message); }
               else { 
                   console.log("Tabela 'turnos' verificada/criada com sucesso.");
                   const turnosIniciais = ['Matutino', 'Vespertino', 'Noturno', 'Integral'];
                   turnosIniciais.forEach(desc => {
                       db.run("INSERT OR IGNORE INTO turnos (descricao_turno) VALUES (?)", [desc]);
                   });
                }
           });

           // Tabela: ofertas_educacionais (NOVA TABELA PEDAGÓGICA)
           db.run(`
               CREATE TABLE IF NOT EXISTS ofertas_educacionais (
                   id_oferta_educacional INTEGER PRIMARY KEY AUTOINCREMENT,
                   descricao_oferta_educacional TEXT NOT NULL UNIQUE COLLATE NOCASE
               )
           `, (err) => {
               if (err) { console.error("Erro ao criar tabela 'ofertas_educacionais':", err.message); }
               else { 
                   console.log("Tabela 'ofertas_educacionais' verificada/criada com sucesso.");
                   const ofertasIniciais = ['Regular', 'EJA - Ensino Fundamental', 'EJA - Ensino Médio', 'FIC'];
                    ofertasIniciais.forEach(desc => {
                       db.run("INSERT OR IGNORE INTO ofertas_educacionais (descricao_oferta_educacional) VALUES (?)", [desc]);
                   });
                }
           });
           
           // ... (dentro da função criarTabelasIniciais, após ofertas_educacionais) ...

           // Tabela: series (NOVA TABELA PEDAGÓGICA)
           db.run(`
               CREATE TABLE IF NOT EXISTS series (
                   id_serie INTEGER PRIMARY KEY AUTOINCREMENT,
                   descricao_serie TEXT NOT NULL,
                   sigla_serie TEXT UNIQUE COLLATE NOCASE,
                   id_modalidade INTEGER NOT NULL,
                   ordem INTEGER, 
                   FOREIGN KEY (id_modalidade) REFERENCES modalidades(id_modalidade)
                   /* UNIQUE constraint para (id_modalidade, descricao_serie) e (id_modalidade, sigla_serie)
                      pode ser útil, mas o SQLite requer UNIQUE para a tabela, não por coluna individual com FK.
                      A lógica da aplicação deverá tratar isso. */
               )
           `, (err) => {
               if (err) { console.error("Erro ao criar tabela 'series':", err.message); }
               else { console.log("Tabela 'series' verificada/criada com sucesso."); }
           });

           // Tabela: periodos_serie (NOVA TABELA PEDAGÓGICA)
           // (Anteriormente chamada semestre_modalidade, mas vinculada à série)
           db.run(`
               CREATE TABLE IF NOT EXISTS periodos_serie (
                   id_periodo_serie INTEGER PRIMARY KEY AUTOINCREMENT,
                   id_serie INTEGER NOT NULL,
                   descricao_periodo TEXT NOT NULL, 
                   sigla_periodo TEXT,
                   ordem INTEGER,
                   FOREIGN KEY (id_serie) REFERENCES series(id_serie)
                   /* UNIQUE constraint para (id_serie, descricao_periodo) pode ser útil */
               )
           `, (err) => {
               if (err) { console.error("Erro ao criar tabela 'periodos_serie':", err.message); }
               else { console.log("Tabela 'periodos_serie' verificada/criada com sucesso."); }
           });

           // Tabela: periodos_letivos (NOVA TABELA PEDAGÓGICA)
           // (Anteriormente chamada ano_semestre_calendario)
           db.run(`
               CREATE TABLE IF NOT EXISTS periodos_letivos (
                   id_periodo_letivo INTEGER PRIMARY KEY AUTOINCREMENT,
                   ano_letivo INTEGER NOT NULL,
                   referencia_periodo TEXT NOT NULL, /* Ex: "1º Semestre", "Anual" */
                   identificador_periodo TEXT NOT NULL UNIQUE COLLATE NOCASE, /* Ex: "2025/1", "2025-ANUAL" */
                   data_inicio DATE,
                   data_fim DATE,
                   status_periodo_letivo TEXT DEFAULT 'Planejamento' /* Planejamento, Aberto, Em Curso, Encerrado */
               )
           `, (err) => {
               if (err) { console.error("Erro ao criar tabela 'periodos_letivos':", err.message); }
               else { console.log("Tabela 'periodos_letivos' verificada/criada com sucesso."); }
           });

// ... (resto da função e do arquivo) ...
           // Adicione as outras tabelas pedagógicas aqui conforme avançamos...

           console.log("Criação/verificação de todas as tabelas principais e pedagógicas iniciais concluída.");
       });
   }
    

// Exporta o objeto 'db' para que possa ser usado em outros arquivos
module.exports = db;
