import express from 'express'
import { Persona } from './conexionPersonas'
import { LibPersona } from './libPersonas'
import { promisseNormal } from '../lib/index'
const router = express.Router()
const obj = new Persona()
const lp = new LibPersona()

router.post('/guardar-persona', (req, res) => {
  promisseNormal(obj.guardarPersona(req.body.data), res)
})

router.post('/actualizar-persona', (req, res) => {
  let idPersona = req.body.id_persona
  let idPersonaData = req.body.data.id_persona
  let dataBody = req.body.data
  let update
  if (idPersonaData === idPersona) update = obj.actualizarPersona(dataBody)
  else update = obj.actualizarIdPersona(dataBody, idPersona)
  update
  .then(data =>
    Promise.all([
      obj.insertTelefonoPersona(lp.insertTlfPerson(dataBody.telefono, idPersonaData)),
      obj.insertDiscpPersona(lp.insertDscpfPerson(dataBody.discapacidad, idPersonaData)),
      obj.insertTipoUserPerson(lp.insertTipoUsuario(dataBody.tipo_usuario, idPersonaData)),
      obj.updateTelefonoPersona(lp.updateTlfPerson(dataBody.telefono, idPersonaData)),
      obj.updateDiscpPersona(lp.updateDscpfPerson(dataBody.discapacidad, idPersonaData)),
      obj.updateTipoUserPerson(lp.updateTipoUsuario(dataBody.tipo_usuario, idPersonaData))
    ])
  )
  .then(data => res.sendStatus(200))
  .catch(err =>	res.sendStatus(500).json(err))
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
