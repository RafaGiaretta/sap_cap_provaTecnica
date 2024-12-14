using gestao.Aerea as Aeroporto from '../../db/Aeroporto';

annotate Aeroporto.Aeroporto with @UI: {
    SelectionFields  : [
        icao,
        nome,
        cidade,
        estado, 
        pais

    ],    
    LineItem  : [    
        {
            @Type : 'UI.DataField',
            Value : icao,
            Label : 'ICAO'
        },
        {
            @Type : 'UI.DataField',
            Value : nome,
            Label : 'Nome'
        },
        {
            @Type : 'UI.DataField',
            Value : cidade,
            Label : 'Cidade'
        },  
        {
            @Type : 'UI.DataField',
            Value : estado,
            Label : 'Estado'
        },  
        {
            @Type : 'UI.DataField',
            Value : pais,
            Label : 'País'
        }  

    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Aeroporto',
        TypeNamePlural : 'Aeroportos',
        Title : { Value : icao }, 
        Description : { Value : nome }
    },
};
