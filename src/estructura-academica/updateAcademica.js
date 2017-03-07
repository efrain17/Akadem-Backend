import { ejecutarQuery } from '../lib/index'

export class UpdateAcademica {

  insertAreaAcademica (areaAcademica) {
    return ejecutarQuery(`
      INSERT INTO public.area_academica (descripcion, estado)
      VALUES ('${areaAcademica}', true);`)
  }

  insertTipoGrado (tipoGrado) {
    return ejecutarQuery(`
      INSERT INTO public.tipo_grado (descripcion, estado)
      VALUES ('${tipoGrado}', true);`)
  }

  insertGrado (data) {
    return ejecutarQuery(`
      INSERT INTO public.grado (descripcion, id_tipo_grado, estado)
      VALUES ('${data.descripcion}', '${data.idTipoGrado}', true);`)
  }

  insertTipoCurso (data) {
    return ejecutarQuery(`
      INSERT INTO public.tipo_curso (descripcion, estado)
      VALUES ('${data.descripcion}', true);`)
  }

  insertParalelo (data) {
    return ejecutarQuery(`
      INSERT INTO public.paralelo (descripcion, estado)
      VALUES ('${data.descripcion}', true);`)
  }

  insertPeriodo (data) {
    return ejecutarQuery(`
      INSERT INTO public.periodo (fecha_inicio, fecha_fin, descripcion, estado)
      VALUES ('${data.fecha_inicio}','${data.fecha_fin}','${data.descripcion}', true);`)
  }

  insertAsignatura (data) {
    return ejecutarQuery(`
      INSERT INTO public.asignatura (id_area_academica, descripcion, estado)
      VALUES ('${data.id_area_academica}', '${data.descripcion}', true);`)
  }

  insertCurso (data) {
    return ejecutarQuery(`
      INSERT INTO public.curso
        (id_grado, id_paralelo, id_periodo, id_tipo_curso, descripcion, estado)
      VALUES ('${data.id_grado}', '${data.id_paralelo}', '${data.id_periodo}', '${data.id_tipo_curso}',
        '${data.descripcion}', true);`)
  }

  insertClase (data) {
    return ejecutarQuery(`
      INSERT INTO public.clase
        (id_asignatura, id_curso, id_persona, estado)
      VALUES ('${data.id_asignatura}', '${data.id_curso}', '${data.id_profesor}', true);`)
  }

  updateAreaAcademica (id) {
    return ejecutarQuery(`
      UPDATE area_academica
        SET estado = false
      WHERE id_area_academica = '${id}';`)
  }

  updateAsignatura (id, value) {
    return ejecutarQuery(`
      UPDATE asignatura
        SET estado = ${value}
      WHERE id_asignatura = '${id}';`)
  }

  updateClase (id, value) {
    return ejecutarQuery(`
      UPDATE clase
        SET estado = ${value}
      WHERE id_clase = '${id}';`)
  }

  updateCurso (id, value) {
    return ejecutarQuery(`
      UPDATE curso
        SET estado = ${value}
      WHERE id_curso = '${id}';`)
  }

  updateTipoGrado (id) {
    return ejecutarQuery(`
      UPDATE tipo_grado
        SET estado = false
      WHERE id_tipo_grado = '${id}';`)
  }

  updateGrado (id) {
    return ejecutarQuery(`
      UPDATE grado
        SET estado = false
      WHERE id_grado = '${id}';`)
  }

  updateTipoCurso (id) {
    return ejecutarQuery(`
      UPDATE tipo_curso
        SET estado = false
      WHERE id_tipo_curso = '${id}';`)
  }

  updateParalelo (id) {
    return ejecutarQuery(`
      UPDATE paralelo
        SET estado = false
      WHERE id_paralelo = '${id}';`)
  }

  updatePeriodo (id, value) {
    return ejecutarQuery(`
      UPDATE periodo
        SET  estado = ${value}
      WHERE id_periodo = '${id}';`)
  }

  insertClaseEstudiante (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        INSERT INTO clase_estudiante
          (id_clase, id_persona, estado)
        VALUES ` + sqlValues)
    } else return true
  }

}
