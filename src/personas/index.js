import express from 'express'
import { selectPersonas, guardarPersona, actualizarPersona } from './conexionPersonas'
import bodyParser from 'body-parser'

const router = express.Router()

router.get('/personas', (req, res) => {
  selectPersonas()
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.json(err)
  })
})

router.post('/guardar-persona', (req, res) => {
  console.log(req.body)
  guardarPersona(req.body.data)
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.json(err)
  })
})

router.post('/actualizar-persona', (req, res) => {
  console.log(req.body.data)
  actualizarPersona(req.body.data)
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.json(err)
  })
})

export default router
