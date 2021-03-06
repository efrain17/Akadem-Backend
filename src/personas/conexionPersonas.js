import { ejecutarQuery } from '../lib/index'

export class Persona {

  guardarPersona (data) {
    return ejecutarQuery(`
      INSERT INTO persona(
        id_persona, nombres, apellidos, direccion,provincia, ciudad, fecha_nacimiento,
        fecha_registro)
      VALUES
        ('${data.id_persona}','${data.nombres}','${data.apellidos}', '${data.direccion}',
        '${data.provincia}', '${data.ciudad}','${data.fecha_nacimiento}', '02/02/2016' )`)
  }

  insertTelefonoPersona (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
      INSERT INTO telefono_persona
          (id_operadora, numero, propietario, id_persona, estado)
        VALUES ` + sqlValues)
    } else return true
  }

  insertDiscpPersona (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        INSERT INTO discapacidad_persona
          (id_discapacidad, porcentaje, id_persona, estado)
        VALUES ` + sqlValues)
    } else return true
  }

  insertTipoUserPerson (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        INSERT INTO tipo_usuario_persona
          (id_persona, id_tipo_usuario, estado)
        VALUES ` + sqlValues)
    } else return true
  }

  updateTelefonoPersona (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        UPDATE telefono_persona
          SET  estado = false
        WHERE ` + sqlValues)
    } else return true
  }

  updateDiscpPersona (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        UPDATE discapacidad_persona
          SET  estado = false
        WHERE ` + sqlValues)
    } else return true
  }

  updateTipoUserPerson (sqlValues) {
    if (sqlValues) {
      return ejecutarQuery(`
        UPDATE tipo_usuario_persona
          SET  estado = false
        WHERE ` + sqlValues)
    } else return true
  }

  actualizarPersona (data) {
    console.log('update persona')
    return ejecutarQuery(`
      UPDATE persona
        SET nombres = '${data.nombres}', apellidos = '${data.apellidos}',
        direccion = '${data.direccion}', provincia = '${data.provincia}', ciudad = '${data.ciudad}',
        fecha_nacimiento = '${data.fecha_nacimiento}', correo = '${data.correo}'
      WHERE
        id_persona = '${data.id_persona}';`)
  }

  actualizarIdPersona (data, idAnterior) {
    return ejecutarQuery(`
      UPDATE persona
        SET id_persona = '${data.id_persona}', nombres = '${data.nombres}', apellidos = '${data.apellidos}',
        direccion = '${data.direccion}', provincia = '${data.provincia}', ciudad = '${data.ciudad}',
        fecha_nacimiento = '${data.fecha_nacimiento}', correo = '${data.correo}'
      WHERE
        id_persona = '${idAnterior}';`)
  }

  selectTelefonos () {
    return ejecutarQuery(`
      SELECT
        persona.id_persona,
        telefono_persona.numero,
        telefono_persona.id_telefono_persona AS id_telefono,
        telefono_persona.propietario
      FROM
        public.persona,
        public.telefono_persona
      WHERE
        persona.id_persona = telefono_persona.id_persona AND
        telefono_persona.estado;`)
  }

  selectDiscapacidad () {
    return ejecutarQuery(`
      SELECT
        persona.id_persona,
        discapacidad_persona.porcentaje,
        discapacidad.descripcion,
        discapacidad_persona.id_discapacidad,
        discapacidad_persona.id_discapacidad_persona
      FROM
        public.persona,
        public.discapacidad_persona,
        public.discapacidad
      WHERE
        persona.id_persona = discapacidad_persona.id_persona AND
        discapacidad_persona.id_discapacidad = discapacidad.id_discapacidad AND
        discapacidad_persona.estado;`)
  }

  selectTipoUsuario () {
    return ejecutarQuery(`
      SELECT
        tipo_usuario.descripcion,
        tipo_usuario_persona.id_tipo_usuario_persona AS id,
        tipo_usuario_persona.id_persona,
        tipo_usuario_persona.id_tipo_usuario
      FROM
        public.persona,
        public.tipo_usuario,
        public.tipo_usuario_persona
      WHERE
        persona.id_persona = tipo_usuario_persona.id_persona AND
        tipo_usuario_persona.id_tipo_usuario = tipo_usuario.id_tipo_usuario AND
        tipo_usuario_persona.estado;`)
  }

  selectPersonas () {
    return ejecutarQuery(`
      SELECT
        persona.id_persona,
        persona.nombres,
        persona.apellidos,
        persona.direccion,
        persona.provincia,
        persona.ciudad,
        persona.fecha_nacimiento,
        persona.correo
      FROM
        public.persona;`)
  }

  selectDiscapacidades () {
    return ejecutarQuery(`
      SELECT
        discapacidad.descripcion,
        discapacidad.id_discapacidad AS id
      FROM
        public.discapacidad;`)
  }

  selectTipoUsuarios () {
    return ejecutarQuery(`
      SELECT
        tipo_usuario.descripcion,
        tipo_usuario.id_tipo_usuario AS id
      FROM
        public.tipo_usuario;`)
  }

  selectOprTelefonicos () {
    return ejecutarQuery(`
      SELECT
        operadora_telefono.descripcion,
        operadora_telefono.id_operadora AS id
      FROM
        public.operadora_telefono;`)
  }

}
