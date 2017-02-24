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

  selectCurso () {
    return ejecutarQuery(`
      SELECT
        curso.id_curso,
        curso.descripcion,
        curso.estado,
        grado.descripcion AS grado,
        paralelo.descripcion AS paralelo,
        tipo_curso.descripcion AS tipo_curso
      FROM
        public.curso,
        public.grado,
        public.paralelo,
        public.tipo_curso
      WHERE
        curso.id_grado = grado.id_grado AND
        curso.id_paralelo = paralelo.id_paralelo AND
        curso.id_tipo_curso = tipo_curso.id_tipo_curso;`)
  }

  selectProfesor () {
    return ejecutarQuery(`
      SELECT
        (persona.nombres ||' '|| persona.apellidos) AS text,
        persona.id_persona AS id
      FROM
        public.persona,
        public.tipo_usuario,
        public.tipo_usuario_persona
      WHERE
        persona.id_persona = tipo_usuario_persona.id_persona AND
        tipo_usuario_persona.id_tipo_usuario = tipo_usuario.id_tipo_usuario AND
        tipo_usuario.descripcion = 'DOCENTE';`)
  }

  selectClase () {
    return ejecutarQuery(`
      SELECT
        clase.id_clase,
        clase.estado,
        curso.descripcion AS curso,
        persona.nombres||' '||persona.apellidos AS profesor,
        asignatura.descripcion
      FROM
        public.clase,
        public.persona,
        public.curso,
        public.asignatura
      WHERE
        clase.id_asignatura = asignatura.id_asignatura AND
        clase.id_curso = curso.id_curso AND
        clase.id_persona = persona.id_persona;`)
  }

}
