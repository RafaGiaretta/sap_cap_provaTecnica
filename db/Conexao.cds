namespace gestao.Aerea;
using gestao.Aerea.Aeroporto from './Aeroporto';

entity Conexao {
    id_conexao : String(100);
    key id_aeroporto_origem : String(100);
    key id_aeroporto_destino : String(100);

    origem : Association to Aeroporto on origem.id_aeroporto = id_aeroporto_origem; // chave estrangeira para puxar o nome na visualizacao com nome origem
    destino : Association to Aeroporto on destino.id_aeroporto = id_aeroporto_destino; // chave estrangeira para puxar o nome na visualizacao com nome destino
}