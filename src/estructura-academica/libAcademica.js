
export class LibAcademica {

  insertClaseEstudiante (dataclase, idEstudiante) {
    return this.contructSqlvalues(dataclase, idEstudiante, 'insert', data => {
      return `('${data.id_asignatura}', '${idEstudiante}', true)`
    })
  }

  contructSqlvalues (dataPersonas, idPersona, operation, callback) {
    let sqlValues = ''
    let chois = ''
    let ch = operation === 'insert' ? ',' : '  or '
    dataPersonas.map(data => {
      sqlValues = sqlValues + chois + callback(data)
      chois = ch
    })
    return sqlValues
  }

}
