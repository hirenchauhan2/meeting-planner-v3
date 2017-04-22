'use strict'

const Schema = use('Schema')

class ParticipantsTableSchema extends Schema {

  up () {
    this.create('participants', (table) => {
      table.increments()
      table.integer('meeting_id')
            .unsigned()
            .references('id').inTable('meetings')
      table.string('email')
      table.timestamps()
      table.unique(['meeting_id', 'email'])
    })
  }

  down () {
    this.drop('participants')
  }

}

module.exports = ParticipantsTableSchema
