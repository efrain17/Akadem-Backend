import express from 'express'
import { Academica } from './conexionAcademica'
import { promisseNormal } from '../lib/index'
const router = express.Router()
const obj = new Academica()

router.get('/area-academica', (req, res) => {
  promisseNormal(obj.selectAreaAcademica(), res)
})

router.get('/asignatura', (req, res) => {
  promisseNormal(obj.selectAsignatura(), res)
})

router.get('/data-curso', (req, res) => {
  promisseNormal(obj.selectCurso(), res)
})

router.get('/clase-estudiante', (req, res) => {
  obj.selectAsignaturaEstudiante(req.query.id)
  .then(data => {
    data = data.map(date => date.descripcion)
    res.json(data)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

router.get('/cursos-estudiantes', (req, res) => {
  promisseNormal(obj.selectCursosEstudiantes(), res)
})

router.get('/curso-inscrito', (req, res) => {
  promisseNormal(obj.selectCursoInscrito(), res)
})

router.get('/clase', (req, res) => {
  promisseNormal(obj.selectClase(), res)
})

router.get('/estudiante-clase', (req, res) => {
  promisseNormal(obj.selectEstudianteClase(), res)
})

router.get('/clases-curso', (req, res) => {
  console.log(req.query.id)
  promisseNormal(obj.selectClasesCurso(req.query.id), res)
})

router.get('/atributos-curso', (req, res) => {
  let atriCurso = { 'grado': [], paralelo: [], periodo: [], tipo_curso: [] }
  Promise.all([
    obj.selectGrado(),
    obj.selectParalelo(),
    obj.selectPeriodo(),
    obj.selectTipoCurso()])
  .then(data => {
    atriCurso.grado = data[0]
    atriCurso.paralelo = data[1]
    atriCurso.periodo = data[2]
    atriCurso.tipo_curso = data[3]
    res.json(atriCurso)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

router.get('/estructura-academica', (req, res) => {
  let estrAcademica = {
    'area_academica': [], 'tipo_grado': [], 'grado': [],
    'paralelo': [], 'tipo_curso': [], 'periodo': []
  }
  Promise.all([
    obj.selectAreaAcademica(),
    obj.selectTipoGrado(),
    obj.selectGrado(),
    obj.selectParalelo(),
    obj.selectTipoCurso(),
    obj.selectPeriodo()])
  .then(data => {
    estrAcademica.area_academica = data[0]
    estrAcademica.tipo_grado = data[1]
    estrAcademica.grado = data[2]
    estrAcademica.paralelo = data[3]
    estrAcademica.tipo_curso = data[4]
    estrAcademica.periodo = data[5]
    res.json(estrAcademica)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

router.get('/atributos-clase', (req, res) => {
  let estrClase = { 'profesor': [], 'curso': [], 'asignatura': [] }
  Promise.all([
    obj.selectProfesor(),
    obj.selectCurso(),
    obj.selectAsignatura()])
  .then(data => {
    estrClase.profesor = data[0]
    estrClase.curso = data[1]
    estrClase.asignatura = data[2]
    res.json(estrClase)
  })
  .catch(err =>	res.sendStatus(500).json(err))
})

export default router
