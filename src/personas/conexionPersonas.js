import { ejecutarQuery } from '../lib/index'

export function selectPersonas () {
  return ejecutarQuery(selectPersona)
}

export function guardar (data) {
  return ejecutarQuery(guardarPersona + "'" + data.id_persona + "','" + data.nombres + "','" +
    data.apellidos + "','" + data.direccion + "','" + data.provincia + "','" + data.ciudad + "','" +
    data.fecha_nacimiento + "','" + data.fecha_registro + "')")
}

var selectPersona = 'select * from persona'
var guardarPersona = `INSERT INTO persona(
  id_persona, nombres, apellidos, direccion,
  provincia, ciudad, fecha_nacimiento, fecha_registro)
  VALUES (`
