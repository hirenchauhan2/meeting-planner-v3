'use strict'

const Schema = use('Schema')

class MeetingsTableSchema extends Schema {

  up () {
    this.create('meetings', (table) => {
      table.increments()
      table.string('title', 100).notNullable().unique()
      table.text('agenda').notNullable()
      table.integer('user_id').unsigned()
          .references('id').inTable('users')
      table.integer('place_id').unsigned()
            .references('id').inTable('places')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }

}

module.exports = MeetingsTableSchema
