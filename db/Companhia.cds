namespace gestao.Aerea;

entity Companhia {
    id_companhia : String(100);
    key icao : String(60);
    key razao_social : String(60);
    iata : String(60);
    representante_legal : String(60);
    pais_sede : String(60);
    key cnpj : String(60);
    endereco : String(60);
    cidade : String(60);
    uf : String(60);
    cep : String(60);
    key telefone : String(60);
    key email : String(60);
    decisao_operacional : String(60);
    atividades_areas : String(60);
    data_decisao_operacao : String(60);
    validade_operacional : String(60); 
}