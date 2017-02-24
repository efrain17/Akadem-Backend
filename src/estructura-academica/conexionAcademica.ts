import { ejecutarQuery } from '../lib/index'

export class Academica {

  selectAreaAcademica () {
    return ejecutarQuery(`
      SELECT
        area_academica.descripcion,
        area_academica.id_area_academica,
        area_academica.estado
      FROM
        public.area_academica;`)
  }

  selectTipoGrado () {
    return ejecutarQuery(`
      SELECT
        tipo_grado.id_tipo_grado,
        tipo_grado.descripcion,
        tipo_grado.estado
      FROM
        public.tipo_grado;`)
  }

  selectGrado () {
    return ejecutarQuery(`
      SELECT
        grado.descripcion,
        grado.id_grado,
        grado.estado
      FROM
        public.grado;`)
  }

  selectParalelo () {
    return ejecutarQuery(`
      SELECT
        paralelo.descripcion,
        paralelo.id_paralelo,
        paralelo.estado
      FROM
        public.paralelo;`)
  }

  selectAsignatura () {
    return ejecutarQuery(`
      SELECT
        asignatura.descripcion,
        asignatura.id_asignatura,
        asignatura.id_area_academica,
        area_academica.id_area_academica,
        area_academica.descripcion AS area_academica,
        asignatura.estado
      FROM
        public.asignatura,
        public.area_academica
      WHERE
        asignatura.id_area_academica = area_academica.id_area_academica;`)
  }

  selectTipoCurso () {
    return ejecutarQuery(`
      SELECT
        tipo_curso.id_tipo_curso,
        tipo_curso.descripcion,
        tipo_curso.estado
      FROM
        public.tipo_curso;`)
  }

  selectPeriodo () {
    return ejecutarQuery(`
      SELECT
        periodo.fecha_inicio,
        periodo.fecha_fin,
        periodo.descripcion,
        periodo.id_periodo,
        periodo.estado
      FROM
        public.periodo;`)
  }

}
