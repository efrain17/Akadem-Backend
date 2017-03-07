import { contructSqlvalues } from '../lib/index'

export class LibAcademica {

  insertClaseEstudiante (dataclase, idEstudiante) {
    return contructSqlvalues(dataclase, idEstudiante, 'insert', data => {
      return `('${data.id_asignatura}', '${idEstudiante}', true)`
    })
  }

}
