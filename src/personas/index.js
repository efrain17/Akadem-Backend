import express from 'express'
import { selectPersonas } from './conexionPersonas'

const router = express.Router()

router.get('/personas', (req, res) => {
  selectPersonas()
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.json(err)
  })
})

export default router
