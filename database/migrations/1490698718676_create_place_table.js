'use strict'

const Schema = use('Schema')

class PlacesTableSchema extends Schema {

  up () {
    this.create('places', (table) => {
      table.increments()
      table.string('placeId', 60).notNullable()
      table.string('name', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('places')
  }

}

module.exports = PlacesTableSchema
