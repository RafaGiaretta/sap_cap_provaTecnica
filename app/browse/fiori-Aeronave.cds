using gestao.Aerea as Aeronave from '../../db/Aeronave';

annotate Aeronave.Aeronave with @UI: {
    SelectionFields  : [
        marca,
        ds_modelo,
        nr_assentos_max,
        tp_motor
    ],    
    LineItem  : [
        {
            @Type : 'UI.DataField',
            Value : marca,
            Label : 'Marca'
        },
        {
            @Type : 'UI.DataField',
            Value : ds_modelo,
            Label : 'Modelo'
        },
        {
            @Type : 'UI.DataField',
            Value : nr_assentos_max,
            Label : 'Capacidade máxima'
        },
        {
            @Type : 'UI.DataField',
            Value : tp_motor,
            Label : 'Tipo de motor'
        }
    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Aeronave',
        TypeNamePlural : 'Aeronaves',
        Title : { Value : marca }, 
        Description : { Value : ds_modelo }
    },
};
