const cds = require('@sap/cds')
const { Companhia } = cds.entities('gestao.Aerea')
const { Passageiro } = cds.entities('gestao.Aerea')
const { ReservaPassagem } = cds.entities('gestao.Aerea')
const { HorarioVoo } = cds.entities('gestao.Aerea')

module.exports = (srv) => {
  srv.on('READ', 'Companhias', async (req) => {
    try {
      let filtro = req.data
      dados = await SELECT.from(Companhia).where(filtro)
      return dados
    } catch (error) {
      console.error('Erro ao ler dados de Companhia: ' + error)
      throw error
    }
  })
  srv.after('READ', 'Companhia', (data) => {
    return data.map((d) => {
      return d
    })
  })

  //Passageiros
  // Cadastrar Passageiro
  srv.on('CREATE', 'InsertPassageiro', async (req, res) => {
    const { cpf, email, telefone, data_de_nascimento } = req.data

    const validarCPF = (cpf) => {
      cpf = cpf.replace(/[^\d]/g, '')
      if (cpf.length !== 11) return false
      if (/^(\d)\1{10}$/.test(cpf)) return false

      let soma = 0,
        peso = 10
      for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * peso--
      let digito1 = 11 - (soma % 11)
      if (digito1 === 10 || digito1 === 11) digito1 = 0
      if (parseInt(cpf[9]) !== digito1) return false

      soma = 0
      peso = 11
      for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * peso--
      let digito2 = 11 - (soma % 11)
      if (digito2 === 10 || digito2 === 11) digito2 = 0
      return parseInt(cpf[10]) === digito2
    }

    if (!validarCPF(cpf)) {
      console.log('CPF inválido!')
      return null
    }

    const calcularIdade = (dataNascimento) => {
      const hoje = new Date()
      const nascimento = new Date(dataNascimento)
      let idade = hoje.getFullYear() - nascimento.getFullYear()
      const mes = hoje.getMonth()
      if (
        mes < nascimento.getMonth() ||
        (mes === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
      )
        idade--
      return idade
    }

    const idade = calcularIdade(data_de_nascimento)
    if (idade < 3) {
      console.log('Idade mínima de 3 anos não atendida!')
      return null
    }

    let verificarCPF = await cds
      .transaction(req)
      .run(SELECT.from(Passageiro).where({ cpf }))

    let verificarEmail = await cds
      .transaction(req)
      .run(SELECT.from(Passageiro).where({ email }))

    let verificarTelefone = await cds
      .transaction(req)
      .run(SELECT.from(Passageiro).where({ telefone }))

    if (verificarCPF.length > 0) {
      console.log('CPF já cadastrado!')
      return null
    }
    if (verificarEmail.length > 0) {
      console.log('E-mail já cadastrado!')
      return null
    }
    if (verificarTelefone.length > 0) {
      console.log('Telefone já cadastrado!')
      return null
    }
    let result = await cds
      .transaction(req)
      .run(INSERT.into(Passageiro).entries(req.data))
      .then((resolve, reject) => {
        if (typeof resolve !== 'undefined' && resolve >= 1) {
          return req.data
        } else {
          console.log('Nenhum Passageiro inserido!')
          return null
        }
      })
      .catch((error) => {
        console.log('Erro ao Inserir!')
        return erro
      })
    console.log(result)
    return result
  })
  // Atualizar Passageiro
  srv.on('CREATE', 'UpdatePassageiro', async (req, res) => {
    let cpf = req.data.cpf
    let dadosAtualizar = {
      nome: req.data.nome,
      email: req.data.email,
      telefone: req.data.telefone,
      data_de_nascimento: req.data.data_de_nascimento,
      endereco: req.data.endereco,
    }
    const validarCPF = (cpf) => {
      cpf = cpf.replace(/[^\d]/g, '') // Remover caracteres não numéricos
      if (cpf.length !== 11) return false
      if (/^(\d)\1{10}$/.test(cpf)) return false

      let soma = 0,
        peso = 10
      for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * peso--
      let digito1 = 11 - (soma % 11)
      if (digito1 === 10 || digito1 === 11) digito1 = 0
      if (parseInt(cpf[9]) !== digito1) return false

      soma = 0
      peso = 11
      for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * peso--
      let digito2 = 11 - (soma % 11)
      if (digito2 === 10 || digito2 === 11) digito2 = 0
      return parseInt(cpf[10]) === digito2
    }

    if (!validarCPF(cpf)) {
      console.log('CPF inválido!')
      return null
    }

    let verificarCPF = await cds
      .transaction(req)
      .run(SELECT.from(Passageiro).where({ cpf }))

    if (verificarCPF.length === 0) {
      console.log('CPF não encontrado!')
      return null
    }

    let result = await cds
      .transaction(req)
      .run(UPDATE(Passageiro).set(dadosAtualizar).where({ cpf }))
      .then((resolve, reject) => {
        if (typeof resolve !== 'undefined' && resolve >= 1) {
          return req.data
        } else {
          console.log('Nenhum Passageiro atualizado!')
          return null
        }
      })
      .catch((error) => {
        console.log('Erro ao Atualizar!')
        return erro
      })
    console.log(result)
    return result
  })
  //Visualizar Passageiro
  srv.on('READ', 'Passageiro', async (req) => {
    try {
      let filtro = req.data
      dados = await SELECT.from(Passageiro).where(filtro)
      return dados
    } catch (error) {
      console.error('Erro ao ler dados de Passageiro: ' + error)
      throw error
    }
  })
  srv.after('READ', 'Passageiro', (data) => {
    return data.map((d) => {
      return d
    })
  })
  //Deletar Passageiro
  srv.on('CREATE', 'DeletPassageiro', async (req, res) => {
    let result = await cds
      .transaction(req)
      .run(DELETE.from(Passageiro).where({ cpf: req.data.cpf }))
      .then((resolve, reject) => {
        if (typeof resolve !== 'undefined' && resolve >= 1) {
          return req.data
        } else {
          console.log('Nenhum dado inserido!')
          return null
        }
      })

      .catch((error) => {
        console.log('Erro ao Inserir!')
        return erro
      })
    console.log(result)
    return result
  })

  // ReservaPassagem
  //Visualizar Reservas
  srv.on('READ', 'GetReservas', async (req) => {
    try {
      let filtro = req.data
      dados = await SELECT.from(ReservaPassagem).where(filtro)
      return dados
    } catch (error) {
      console.error('Erro ao ler dados de ReservaPassagem ')
      throw error
    }
  })
  //Criar nova reserva
  srv.on('CREATE', 'InsertRervaPassagens', async (req, res) => {
    const { id_passageiro, id_horario_voo, assento, preco, classe } = req.data

    const reservaExistente = await cds.transaction(req).run(
      SELECT.from(ReservaPassagem).where({
        id_horario_voo,
        assento,
      })
    )
    if (reservaExistente.length > 0) {
      console.log('Assento já reservado para este voo!')
      return null
    }

    const vooExistente = await cds
      .transaction(req)
      .run(SELECT.from(HorarioVoo).where({ id_horario_voo }))

    if (vooExistente.length === 0) {
      console.log('Voo não encontrado!')
      return null
    }

    const passageiroExistente = await cds
      .transaction(req)
      .run(SELECT.from(Passageiro).where({ id_passageiro }))

    if (passageiroExistente.length === 0) {
      console.log('Passageiro não encontrado!')
      return null
    }

    const precoMinimoPorClasse = {
      Economica: 200,
      Executiva: 500,
    }

    if (!precoMinimoPorClasse[classe]) {
      console.log('Classe inválida')
      return null
    }

    if (preco < precoMinimoPorClasse[classe]) {
      console.log('Preço mínimo para a classe nao atingido.')
      return null
    }

    let result = await cds
      .transaction(req)
      .run(INSERT.into(ReservaPassagem).entries(req.data))
      .then((resolve, reject) => {
        if (typeof resolve !== 'undefined' && resolve >= 1) {
          return req.data
        } else {
          console.log('Nenhum dado inserido!')
          return null
        }
      })
      .catch((erro) => {
        console.log('Erro ao Inserir!')
        return erro
      })
    console.log(result)
    return result
  })
  //Cancelar reserva
  srv.on('CREATE', 'DeletReservaPassagem', async (req) => {
    let id_reserva = req.data.id_reserva

    const reserva = await cds
      .transaction(req)
      .run(SELECT.one.from(ReservaPassagem).where({ id_reserva: id_reserva }))

    if (!reserva) {
      console.log('Reserva não encontrada!')
      return null
    }

    const voo = await cds
      .transaction(req)
      .run(
        SELECT.one
          .from(HorarioVoo)
          .where({ id_horario_voo: reserva.id_horario_voo })
      )

    if (!voo) {
      console.log('Voo associado não encontrado!')
      return null
    }

    if (voo.situacao_voo === 'Em curso' || voo.situacao_voo === 'Concluído') {
      console.log(
        'Não é possível cancelar reservas para voos em curso ou já concluídos!'
      )
      return null
    }

    const result = await cds
      .transaction(req)
      .run(DELETE.from(ReservaPassagem).where({ id_reserva: id_reserva }))

    if (result === 0) {
      console.log('Erro ao cancelar a reserva!')
      return null
    }

    console.log('Reserva cancelada com sucesso!')
  })

  // Criação de Voos
  //Criar novo voo
  srv.on('CREATE', 'InsertHorarioVoo', async (req, res) => {
    const {
      id_horario_voo,
      id_companhia,
      id_conexao,
      id_aeronave,
      nr_assentos_executivo,
      nr_assentos_economico,
      capacidade_total,
      data,
      partida_prevista,
      chegada_prevista,
      partida_real,
      chegada_real,
      situacao_voo,
      situacao_partida,
      situacao_chegada,
    } = req.data

    const vooExistente = await cds
      .transaction(req)
      .run(SELECT.one.from(HorarioVoo).where({ id_horario_voo }))

    if (vooExistente) {
      console.log('Voo já existe com esse ID!')
      return null
    }
    if (partida_real || chegada_real) {
      console.log(
        'Não é permitido definir os horários de partida real ou chegada real!'
      )
      return null
    }

    if (situacao_voo !== 'AGUARDANDO') {
      console.log('Status do voo deve ser "AGUARDANDO"!')
      return null
    }
    try {
      const result = await cds
        .transaction(req)
        .run(INSERT.into(HorarioVoo).entries(req.data))

      if (result && result.length === 0) {
        console.log('Nenhum dado inserido!')
        return null
      } else {
        console.log('Voo inserido com sucesso!')
        return null
      }
    } catch (erro) {
      console.log('Erro ao Inserir voo:', erro)
      return null
    }
  })
  //Atualizar voo
  srv.on('CREATE', 'UpdateHorarioVoo', async (req, res) => {
    let {
      id_horario_voo,
      partida_prevista,
      chegada_prevista,
      id_aeronave,
      situacao_voo,
      partida_real,
      chegada_real,
      situacao_partida,
      situacao_chegada,
    } = req.data

    if (!id_horario_voo) {
      console.log('ID de voo não fornecido!')
      return null
    }

    const camposPermitidos = [
      'partida_prevista',
      'chegada_prevista',
      'id_aeronave',
      'situacao_voo',
      'partida_real',
      'chegada_real',
      'situacao_partida',
      'situacao_chegada',
    ]
    const camposEnviados = Object.keys(req.data)

    const camposNaoPermitidos = camposEnviados.filter(
      (campo) => campo !== 'id_horario_voo' && !camposPermitidos.includes(campo)
    )

    if (camposNaoPermitidos.length > 0) {
      console.log('Tentativa de alterar campos não permitidos')
      return null
    }

    try {
      const voo = await cds
        .transaction(req)
        .run(SELECT.one.from(HorarioVoo).where({ id_horario_voo }))

      if (!voo) {
        console.log('Voo não encontrado!')
        return null
      }

      const { situacao_voo: situacaoAtual } = voo

      if (situacao_voo) {
        if (situacaoAtual === 'AGUARDANDO') {
          if (situacao_voo === 'EM CURSO') {
            if (!partida_real || !situacao_partida) {
              console.log(
                'É necessário informar o horário real de partida e a situação real da partida para transição para "EM CURSO".'
              )
              return null
            }
          } else if (situacao_voo === 'CANCELADO') {
            if (partida_real || chegada_real) {
              console.log(
                'Não é permitido definir horários reais de partida ou chegada para voo cancelado.'
              )
              return null
            }
          } else {
            console.log(
              'Transição de "AGUARDANDO" para outro status não permitido.'
            )
            return null
          }
        }

        // Transição de 'EM CURSO'
        else if (situacaoAtual === 'EM CURSO') {
          if (situacao_voo === 'CONCLUÍDO') {
            if (!chegada_real || !situacao_chegada) {
              console.log(
                'É necessário informar o horário real de chegada e a situação real da chegada para transição para "CONCLUÍDO".'
              )
              return null
            }
          } else {
            console.log(
              'Transição de "EM CURSO" para outro status não permitido.'
            )
            return null
          }
        } else {
          console.log('Status atual do voo não encontrado ou não permitido.')
          return null
        }
      }

      const result = await cds.transaction(req).run(
        UPDATE(HorarioVoo)
          .set({
            partida_prevista,
            chegada_prevista,
            id_aeronave,
            situacao_voo,
            partida_real,
            chegada_real,
            situacao_partida,
            situacao_chegada,
          })
          .where({ id_horario_voo })
      )

      if (result && result === 1) {
        console.log('Voo atualizado com sucesso!')
        return null
      } else {
        console.log('Nenhum voo encontrado ou atualizado!')
        return null
      }
    } catch (error) {
      console.log('Erro ao atualizar voo')
      return null
    }
  })
}
