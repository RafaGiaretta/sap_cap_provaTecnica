namespace gestao.Aerea;

entity Aeronave {
    id_aeronave : String (100);
    key marca : String (60);
    key ds_modelo : String (60);
    key nr_serie : String (60);
    cd_categoria : String (60);
    cd_tipo : String (60);
    nm_fabricante : String (60);
    cd_cls : String (60);
    nr_pmd : String (60);
    cd_tipo_icao : String (60);
    nr_assentos_executivo : Integer;
    nr_assentos_economico : Integer;
    nr_assentos_max : Integer;
    nr_ano_fabricacao : Integer;
    tp_motor : String (60);
    qt_motor : String (60);
    tp_pouso : String (60);    
}