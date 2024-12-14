namespace gestao.Aerea;

entity Aeroporto {
    id_aeroporto : String(100);
    key icao : String(60);
    nome : String(60);
    cidade : String(60);
    estado : String(60);
    pais : String(60);
}