namespace gestao.Aerea;

entity Passageiro {
    id_passageiro : String(60);
    key cpf : String(60);
    nome : String(60);
    key email : String(60);
    key telefone : String(60);
    data_de_nascimento : Date;
    endereco : String(60);
}

// ** Telefone e e-mail devem ser válidos.**, como ja sao unicos (PK) nao podem ser nulos