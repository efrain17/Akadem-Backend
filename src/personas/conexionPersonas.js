import ejecutarQuery from 'src/server/lib/index'

export function selectPersonas (data, myPool) {
  return ejecutarQuery(myPool, selectPersona)
}

var selectPersona = "select * from persona'"
