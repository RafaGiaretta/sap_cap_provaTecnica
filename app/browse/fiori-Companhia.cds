using gestao.Aerea as Companhia from '../../db/Companhia';

annotate Companhia.Companhia with @UI: {
    SelectionFields  : [
        icao,
        razao_social,
        cnpj,
        telefone,
        email
    ],    
    LineItem  : [
        {
            @Type : 'UI.DataField',
            Value : icao,
            Label : 'ICAO'
        },
        {
            @Type : 'UI.DataField',
            Value : razao_social,
            Label : 'Razão social'
        },
        {
            @Type : 'UI.DataField',
            Value : cnpj,
            Label : 'CNPJ'
        },
        {
            @Type : 'UI.DataField',
            Value : telefone,
            Label : 'Telefone'
        },
        {
            @Type : 'UI.DataField',
            Value : email,
            Label : 'E-mail'
        }        
    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Companhia',
        TypeNamePlural : 'Companhias',
        Title : { Value : icao }, 
        Description : { Value : razao_social }
    },
};
