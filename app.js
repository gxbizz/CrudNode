const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaundeltLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const post = require("./model/post")

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

app.get("/excluir/:id", function(req, res){
    post.destroy({
        where: {'id': req.params.id}
    })
    .then(function(){
        res.redirect("/consulta")
    })
    .catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})
app.get("/editar/:id", function(req,res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", (post))
    }).catch(function(erro){
        console.log("Erro o carregar dados do banco: " + erro)
    })
})
app.post("/cadastrar", function(req, res){
  post.create({
      nome: req.body.nome,
      endereco: req.body.endereco,
      bairro: req.body.bairro,
      cep: req.body.cep,
      
  }).then(() => {
      console.log("Dados cadastrados com sucesso")
      res.redirect('/consulta')
  }).catch((err) => {
      console.log("Erro: " + err)
  })
})

app.post("/atualizar", function(req,res){
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro:req.body.bairro,
        cep:req.body.cep,
        
    },{
        where: {
        id:req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
})

app.listen(8081, function(){
    console.log("http://localhost:8081")
})