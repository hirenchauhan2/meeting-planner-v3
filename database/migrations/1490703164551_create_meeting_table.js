'use strict'

const Schema = use('Schema')

class MeetingsTableSchema extends Schema {
  up () {
    this.create('meetings', table => {
      table.increments()
      table.string('title').notNullable().unique()
      table.text('description').notNullable()
      table.datetime('meetingDate').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table
        .integer('location_id')
        .unsigned()
        .references('id')
        .inTable('locations')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetings')
  }
}

module.exports = MeetingsTableSchema
