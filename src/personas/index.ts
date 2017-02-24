import express from 'express'
import { Persona } from './conexionPersonas'
import { promisseNormal } from '../lib/index'
const router = express.Router()
const obj = new Persona()

router.get('/xxxpersonas', (req, res) => {
  promisseNormal(obj.selectPersonas(), res)
})

router.post('/guardar-persona', (req, res) => {
  promisseNormal(obj.guardarPersona(req.body.data), res)
})

router.post('/actualizar-persona', (req, res) => {
  promisseNormal(obj.actualizarPersona(req.body.id_persona, req.body.data), res)
})

router.get('/personas', (req, res) => {
  let personas, telefonos, tipoUsuarios, discapacidad
  Promise.all([
    obj.selectPersonas(),
    obj.selectTelefonos(),
    obj.selectTipoUsuario(),
    obj.selectDiscapacidad()])
  .then(data => {
    personas = data[0]
    telefonos = data[1]
    tipoUsuarios = data[2]
    discapacidad = data[3]
    personas.map(person => {
      person.telefono = telefonos.filter(telef => telef.id_persona === person.id_persona)
      person.discapacidad = discapacidad.filter(discp => discp.id_persona === person.id_persona)
      person.tipo_usuario = tipoUsuarios.filter(tpUsuario => tpUsuario.id_persona === person.id_persona)
      person.status = { 'progress': '38%', 'type': 'warning' }
    })
    res.json(personas)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

router.get('/atributos-personas', (req, res) => {
  let atributosPersonas = {
    'discapacidades': [], 'operadores_telefonicos': [], 'tipos_usuarios': []
  }
  Promise.all([
    obj.selectDiscapacidades(),
    obj.selectOprTelefonicos(),
    obj.selectTipoUsuarios()])
  .then(data => {
    atributosPersonas.discapacidades = data[0]
    atributosPersonas.operadores_telefonicos = data[1]
    atributosPersonas.tipos_usuarios = data[2]
    res.json(atributosPersonas)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

export default router
