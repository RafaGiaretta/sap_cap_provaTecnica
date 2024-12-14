using gestao.Aerea as PropriedadeAeronave from '../../db/PropriedadeAeronave';

annotate PropriedadeAeronave.PropriedadeAeronave with @UI: {
    SelectionFields  : [
        proprietario,
        nr_cert_matricula,
        dt_validade_ca,
    ],    
    LineItem  : [
        {
            @Type : 'UI.DataField',
            Value : proprietario,
            Label : 'Proprietário'
        },
        {
            @Type : 'UI.DataField',
            Value : nr_cert_matricula,
            Label : 'Matrícula'
        },
        {
            @Type : 'UI.DataField',
            Value : dt_validade_ca,
            Label : 'Validade certificado'
        }
    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'PropriedadeAeronave',
        TypeNamePlural : 'PropriedadeAeronaves',
        Title : { Value : proprietario }, 
        Description : { Value : nr_cert_matricula }
    },
};
