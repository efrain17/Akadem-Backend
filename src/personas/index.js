import express from 'express'
import selectPersonas from 'src/personas/conexionPersonas'

const router = express.Router()
var pool

router.get('/personas', (req, res) => {
  selectPersonas(pool)
  .then(data => res.json(data))
  .catch(err => res.json(err))
})

export default router
