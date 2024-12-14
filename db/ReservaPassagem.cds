namespace gestao.Aerea;

entity ReservaPassagem {
    key id_reserva : String(100);
    id_passageiro : String(60);
    id_horario_voo : String(60);
    assento : String(60);
    classe : String(60);
    status : String(60);
    data_reserva : Date;
    preco : Double;
}