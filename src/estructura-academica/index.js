import express from 'express'
import { Academica } from './conexionAcademica'
import { UpdateAcademica } from './updateAcademica'
import { promisseNormal } from '../lib/index'
import { LibAcademica } from './libAcademica'
const router = express.Router()
const obj = new Academica()
const upa = new UpdateAcademica()
const la = new LibAcademica()

router.get('/area-academica', (req, res) => {
  promisseNormal(obj.selectAreaAcademica(), res)
})

router.get('/tipo-gradolist', (req, res) => {
  promisseNormal(obj.selectTipoGradoList(), res)
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

router.get('/estudiante-claseLike', (req, res) => {
  promisseNormal(obj.selectEstudianteClaseLike(req.query.nombre), res)
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

router.get('/profesoresLike', (req, res) => {
  promisseNormal(obj.selectProfesorLike(req.query.nombre), res)
})

router.post('/agregar-area', (req, res) => {
  promisseNormal(upa.insertAreaAcademica(req.body.data.descripcion), res)
})

router.post('/agregar-tipogrado', (req, res) => {
  promisseNormal(upa.insertTipoGrado(req.body.data.descripcion), res)
})

router.post('/agregar-grado', (req, res) => {
  promisseNormal(upa.insertGrado(req.body.data), res)
})

router.post('/agregar-tipocurso', (req, res) => {
  promisseNormal(upa.insertTipoCurso(req.body.data), res)
})

router.post('/agregar-paralelo', (req, res) => {
  promisseNormal(upa.insertParalelo(req.body.data), res)
})

router.post('/agregar-periodo', (req, res) => {
  promisseNormal(upa.insertPeriodo(req.body.data), res)
})

router.post('/desactivar-area', (req, res) => {
  promisseNormal(upa.updateAreaAcademica(req.body.id), res)
})

router.post('/desactivar-tipogrado', (req, res) => {
  promisseNormal(upa.updateTipoGrado(req.body.id), res)
})

router.post('/desactivar-grado', (req, res) => {
  promisseNormal(upa.updateGrado(req.body.id), res)
})

router.post('/desactivar-tipocurso', (req, res) => {
  promisseNormal(upa.updateTipoCurso(req.body.id), res)
})

router.post('/desactivar-paralelo', (req, res) => {
  promisseNormal(upa.updateParalelo(req.body.id), res)
})

router.post('/desactivar-periodo', (req, res) => {
  promisseNormal(upa.updatePeriodo(req.body.id, false), res)
})

router.post('/activar-periodo', (req, res) => {
  promisseNormal(upa.updatePeriodo(req.body.id, true), res)
})

router.post('/agregar-asignatura', (req, res) => {
  promisseNormal(upa.insertAsignatura(req.body.data, true), res)
})

router.post('/agregar-curso', (req, res) => {
  promisseNormal(upa.insertCurso(req.body.data, true), res)
})

router.post('/desactivar-asignatura', (req, res) => {
  promisseNormal(upa.updateAsignatura(req.body.id, false), res)
})

router.post('/activar-asignatura', (req, res) => {
  promisseNormal(upa.updateAsignatura(req.body.id, true), res)
})

router.post('/desactivar-curso', (req, res) => {
  promisseNormal(upa.updateCurso(req.body.id, false), res)
})

router.post('/activar-curso', (req, res) => {
  promisseNormal(upa.updateCurso(req.body.id, true), res)
})

router.post('/agregar-clase', (req, res) => {
  promisseNormal(upa.insertClase(req.body.data, true), res)
})

router.post('/activar-clase', (req, res) => {
  promisseNormal(upa.updateClase(req.body.id, true), res)
})

router.post('/desactivar-clase', (req, res) => {
  promisseNormal(upa.updateClase(req.body.id, false), res)
})

router.post('/agregar-claseEstudiante', (req, res) => {
  let idEstudiante = req.body.data.id_estudiante
  let clases = req.body.data.clases
  // let sql = la.insertClaseEstudiante(clases, idEstudiante)
  console.log(la.insertClaseEstudiante(clases, idEstudiante))
  // promisseNormal(upa.insertClaseEstudiante(sql), res)
})

export default router
