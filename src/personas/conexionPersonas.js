import { ejecutarQuery } from '../lib/index'

export function selectPersonas () {
  return ejecutarQuery(selectPersona)
}

var selectPersona = 'select * from persona'
