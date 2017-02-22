import express from 'express'
import { selectPersonas, guardarPersona, actualizarPersona } from './conexionPersonas'
import bodyParser from 'body-parser'

const router = express.Router()

router.get('/personas', (req, res) => {
  selectPersonas()
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.sendStatus(500).json(err)
  })
})

router.post('/guardar-persona', (req, res) => {
  guardarPersona(req.body.data)
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.sendStatus(500).json(err)
  })
})

router.post('/actualizar-persona', (req, res) => {
  actualizarPersona(req.body.id_persona, req.body.data)
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.sendStatus(500).json(err)
  })
})

export default router
