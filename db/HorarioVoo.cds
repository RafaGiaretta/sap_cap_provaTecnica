namespace gestao.Aerea;

entity HorarioVoo {
    key id_horario_voo : String(100);
    id_companhia : String(100);
    id_conexao: String(100);
    id_aeronave: String(100);
    nr_assentos_executivo : Integer;
    nr_assentos_economico : Integer;
    capacidade_total : Integer;
    data : Date;
    partida_prevista : DateTime;
    chegada_prevista : DateTime;
    partida_real : DateTime;
    chegada_real : DateTime;
    situacao_voo : String(60);
    situacao_partida : String(60);
    situacao_chegada : String(60);

}