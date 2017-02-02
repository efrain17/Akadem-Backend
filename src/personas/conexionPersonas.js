import { ejecutarQuery } from '../lib/index'

export function selectPersonas () {
  return ejecutarQuery(selectPersona)
}

export function guardarPersona (data) {
  return ejecutarQuery(`INSERT INTO persona( id_persona, nombres, apellidos, direccion,
    provincia, ciudad, fecha_nacimiento, fecha_registro) VALUES ('${data.id_persona}',
    '${data.nombres}','${data.apellidos}', '${data.direccion}', '${data.provincia}', '${data.ciudad}',
    '${data.fecha_nacimiento}', '02/02/2016' )`)
}

export function actualizarPersona(data) {
  return ejecutarQuery(`UPDATE persona SET nombres = '${data.nombres}', apellidos = '${data.apellidos}', 
    direccion = '${data.direccion}', provincia = '${data.provincia}', ciudad = '${data.ciudad}',
    fecha_nacimiento = '${data.fecha_nacimiento}' WHERE id_persona='${data.id_persona}';`)
}

