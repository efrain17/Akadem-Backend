import express from 'express'
import { selectPersonas, guardar } from './conexionPersonas'
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
  console.log(req.body.data)
  guardar(req.body.data)
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.json(err)
  })
})

export default router
