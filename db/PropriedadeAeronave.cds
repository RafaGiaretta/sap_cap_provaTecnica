namespace gestao.Aerea;

entity PropriedadeAeronave {
    id_propriedade_aeronave : String(100);
    key id_companhia : String(60);
    key id_aeronave : String(60);
    proprietario : String(60);
    sg_uf : String(60);
    cpf_cnpj : String(60);
    nm_operador : String(60);
    nr_cert_matricula : String(60);
    dt_validade_cva : String(60);
    dt_validade_ca : String(60);
    dt_canc : String(60);
    cd_interdicao : String(60);
    ds_gravame : String(60);
    dt_matricula : String(60);
}