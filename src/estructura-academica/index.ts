import express from 'express'
import { Academica } from './conexionAcademica'
// import { promisseNormal } from '../lib/index'
const router = express.Router()
const obj = new Academica()

// router.get('/xxxpersonas', (req, res) => {
//   promisseNormal(selectPersonas(), res)
// })

router.get('/estructura-academica', (req, res) => {
  let estrAcademica = {
    'area_academica': [], 'tipo_grado': [], 'grado': [], 'paralelo': [],
    'asignatura': [], 'tipo_curso': [], 'periodo': []
  }
  Promise.all([
    obj.selectAreaAcademica(),
    obj.selectTipoGrado(),
    obj.selectGrado(),
    obj.selectParalelo(),
    obj.selectAsignatura(),
    obj.selectTipoCurso(),
    obj.selectPeriodo()])
  .then(data => {
    estrAcademica.area_academica = data[0]
    estrAcademica.tipo_grado = data[1]
    estrAcademica.grado = data[2]
    estrAcademica.paralelo = data[3]
    estrAcademica.asignatura = data[4]
    estrAcademica.tipo_curso = data[5]
    estrAcademica.periodo = data[6]
    res.json(estrAcademica)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

export default router
