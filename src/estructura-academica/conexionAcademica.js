import { ejecutarQuery } from '../lib/index'

export class Academica {

  selectAreaAcademica () {
    return ejecutarQuery(`
      SELECT
        area_academica.descripcion,
        area_academica.id_area_academica,
        area_academica.estado
      FROM
        public.area_academica
      WHERE
        estado;`)
  }

  selectTipoGrado () {
    return ejecutarQuery(`
      SELECT
        tipo_grado.id_tipo_grado,
        tipo_grado.descripcion,
        tipo_grado.estado
      FROM
        public.tipo_grado
      WHERE
        estado;`)
  }

  selectTipoGradoList () {
    return ejecutarQuery(`
      SELECT
        tipo_grado.id_tipo_grado AS id,
        tipo_grado.descripcion AS text
      FROM
        public.tipo_grado
      WHERE
        estado;`)
  }

  selectGrado () {
    return ejecutarQuery(`
      SELECT
        grado.descripcion,
        grado.id_grado,
        grado.estado
      FROM
        public.grado
      WHERE
        estado;`)
  }

  selectParalelo () {
    return ejecutarQuery(`
      SELECT
        paralelo.descripcion,
        paralelo.id_paralelo,
        paralelo.estado
      FROM
        public.paralelo
      WHERE
        estado;`)
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
        public.tipo_curso
      WHERE
        estado;`)
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
        tipo_usuario.descripcion = 'DOCENTE' AND
	      tipo_usuario_persona.estado;`)
  }

  selectProfesorLike (nombre) {
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
        tipo_usuario.descripcion = 'DOCENTE' AND
	      tipo_usuario_persona.estado AND
        (persona.nombres ILIKE '${nombre}%' OR persona.apellidos ILIKE '${nombre}%');`)
  }

  selectClase () {
    return ejecutarQuery(`
      SELECT
        clase.id_clase,
        clase.estado,
        curso.descripcion AS curso,
        persona.nombres||' '||persona.apellidos AS profesor,
        asignatura.descripcion as asignatura
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

  selectEstudianteClaseLike (nombre) {
    return ejecutarQuery(`
      SELECT
        curso.descripcion AS additional,
        persona.nombres||' '||persona.apellidos AS text,
        persona.id_persona AS id
      FROM
        public.persona,
        public.clase_estudiante,
        public.clase,
        public.curso
      WHERE
        persona.id_persona = clase_estudiante.id_persona AND
        clase_estudiante.id_clase = clase.id_clase AND
        clase.id_curso = curso.id_curso AND
        clase_estudiante.estado AND
        (persona.nombres ILIKE '${nombre}%' OR persona.apellidos ILIKE '${nombre}%')
      GROUP BY
        curso.descripcion,
        persona.nombres,
        curso.id_curso,
        persona.id_persona,
        persona.apellidos;`)
  }

  selectCursosEstudiantes () {
    return ejecutarQuery(`
      SELECT
        curso.descripcion AS curso,
        persona.nombres||' '||persona.apellidos AS nombre,
        persona.id_persona AS id_estudiante,
        curso.id_curso AS id_curso
      FROM
        public.persona,
        public.clase_estudiante,
        public.clase,
        public.curso
      WHERE
        persona.id_persona = clase_estudiante.id_persona AND
        clase_estudiante.id_clase = clase.id_clase AND
        clase.id_curso = curso.id_curso AND
        clase_estudiante.estado
      GROUP BY
        curso.descripcion,
        persona.nombres,
        curso.id_curso,
        persona.id_persona,
        persona.apellidos;`)
  }

  selectAsignaturaEstudiante (idEstudiante) {
    return ejecutarQuery(`
      SELECT
        asignatura.descripcion
      FROM
        public.persona,
        public.clase_estudiante,
        public.clase,
        public.asignatura
      WHERE
        persona.id_persona = clase_estudiante.id_persona AND
        clase_estudiante.id_clase = clase.id_clase AND
        asignatura.id_asignatura = clase.id_clase AND
        clase_estudiante.estado AND
        persona.id_persona = '${idEstudiante}';`)
  }

  selectCursoInscrito () {
    return ejecutarQuery(`
      SELECT
        curso.descripcion AS text,
        curso.id_curso AS id,
        'Estudiantes inscritos '||count (clase.id_persona) AS additional
      FROM
        public.curso,
        public.clase
      WHERE
        curso.id_curso = clase.id_curso AND
        curso.estado
      GROUP BY
        curso.descripcion,
        curso.id_curso;`)
  }

  selectClasesCurso (idCurso) {
    return ejecutarQuery(`
      SELECT
        clase.id_clase AS id_asignatura,
        asignatura.descripcion,
        persona.apellidos || ' ' || persona.nombres AS profesor
      FROM
        public.curso,
        public.clase,
        public.asignatura,
        public.persona
      WHERE
        curso.id_curso = clase.id_curso AND
        clase.id_persona = persona.id_persona AND
        asignatura.id_asignatura = clase.id_asignatura AND
        curso.id_curso = '${idCurso}';`)
  }

}
