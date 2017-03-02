export class LibPersona {

  insertTlfPerson (dataTelefono, idPersona) {
    return this.contructSqlvalues(dataTelefono, idPersona, 'insert', data => {
      return `('${data.id_operadora}', '${data.numero}', '${data.propietario}',
        '${idPersona}', true)`
    })
  }

  insertDscpfPerson (dataDiscapacidad, idPersona) {
    return this.contructSqlvalues(dataDiscapacidad, idPersona, 'insert', data => {
      return `('${data.id_discapacidad}', '${data.porcentaje}', '${idPersona}', true)`
    })
  }

  insertTipoUsuario (dataTipoUser, idPersona) {
    return this.contructSqlvalues(dataTipoUser, idPersona, 'insert', data => {
      return `('${idPersona}', '${data.id_tipo_usuario}', true)`
    })
  }

  updateTlfPerson (dataTelefono, idPersona) {
    return this.contructSqlvalues(dataTelefono, idPersona, 'delete', data => {
      return `id_telefono_persona = '${data.id_telefono}'`
    })
  }

  updateDscpfPerson (dataDiscapacidad, idPersona) {
    return this.contructSqlvalues(dataDiscapacidad, idPersona, 'delete', data => {
      return `id_discapacidad_persona = '${data.id_discapacidad_persona}'`
    })
  }

  updateTipoUsuario (dataTipoUser, idPersona) {
    return this.contructSqlvalues(dataTipoUser, idPersona, 'delete', data => {
      return `id_tipo_usuario_persona = '${data.id}'`
    })
  }

  contructSqlvalues (dataPersonas, idPersona, operation, callback) {
    let sqlValues = ''
    let chois = ''
    let ch = operation === 'insert' ? ',' : 'or'
    let dataFilter = dataPersonas.filter(data => data.operacion === operation)
    dataFilter.map(data => {
      sqlValues = sqlValues + chois + callback(data)
      chois = ch
    })
    return sqlValues
  }

}
