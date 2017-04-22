'use strict'

const Schema = use('Schema')

class LocationsTableSchema extends Schema {

  up () {
    this.create('locations', (table) => {
      table.increments()
      table.string('gplaceId').notNullable()
      table.string('name').notNullable()
      table.string('formatted_address').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }

}

module.exports = LocationsTableSchema
