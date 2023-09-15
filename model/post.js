const db = require("./banco")

const Agendamentos = db.sequelize.define("agendamentos", {
    nome:{
        type: db.Sequelize.STRING
    },
    endereco:{
        type: db.Sequelize.STRING
    },
    bairro:{
        type: db.Sequelize.STRING
    },
    cep:{
        type: db.Sequelize.INTEGER
    }
})

Agendamentos.sync({force:true})
module.exports = Agendamentos