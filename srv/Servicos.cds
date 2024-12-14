using gestao.Aerea as Aeronave from '../db/Aeronave';
using gestao.Aerea as Aeroporto from '../db/Aeroporto';
using gestao.Aerea as Companhia from '../db/Companhia';
using gestao.Aerea as Conexao from '../db/Conexao';
using gestao.Aerea as PropriedadeAeronave from '../db/PropriedadeAeronave';
using gestao.Aerea as Passageiro from '../db/Passageiro';
using gestao.Aerea as ReservaPassagem from '../db/ReservaPassagem';
using gestao.Aerea as HorarioVoo from '../db/HorarioVoo';

using from '../app/services';


service exportSRV {
    @readonly entity Companhias as projection on Companhia.Companhia;
    @readonly entity Aeronaves as projection on Aeronave.Aeronave;
    @readonly entity PropriedadeAeronaves as projection on PropriedadeAeronave.PropriedadeAeronave;
    @readonly entity Aeroportos as projection on Aeroporto.Aeroporto;
    @readonly entity Conexoes as projection on Conexao.Conexao;

    //Passageiros
    @insertonly entity InsertPassageiro as projection on Passageiro.Passageiro;
    @updateonly entity UpdatePassageiro as projection on Passageiro.Passageiro;
    @deletonly entity DeletPassageiro as projection on Passageiro.Passageiro;

    //Reserva de Passagens
    @insertonly entity InsertRervaPassagens as projection on ReservaPassagem.ReservaPassagem;   
    @readonly entity GetRervaPassagens as projection on ReservaPassagem.ReservaPassagem;
    @deletonly entity DeletReservaPassagem as projection on ReservaPassagem.ReservaPassagem; 

    //Criacao de voos
    @insertonly entity InsertHorarioVoo as projection on HorarioVoo.HorarioVoo;
    @updateonly entity UpdateHorarioVoo as projection on HorarioVoo.HorarioVoo;

}