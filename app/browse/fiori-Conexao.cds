using gestao.Aerea as Conexao from '../../db/Conexao';

annotate Conexao.Conexao with @UI: {
    SelectionFields  : [
        id_aeroporto_origem,
        id_aeroporto_destino,
    ],    
    LineItem  : [
        {
            @Type : 'UI.DataField',
            Value : origem.nome, // chave estrangeira criada origem
            Label : 'Origem'
        },
        {
            @Type : 'UI.DataField',
            Value : destino.nome, // chave estrangeira criada origem
            Label : 'Destino'
        }
    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Aeroporto',
        TypeNamePlural : 'Aeroportos',
        Title : { Value : id_aeroporto_origem }, 
        Description : { Value : id_aeroporto_destino }
    },
};
