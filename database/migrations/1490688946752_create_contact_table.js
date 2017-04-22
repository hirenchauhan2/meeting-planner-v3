'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
      table.string('name')
      table.string('email')
            .notNullable()
      table.boolean('is_favorite')
      table.timestamps()

      table.unique(['user_id', 'email'])
    })
  }

  down () {
    this.drop('contacts')
  }

}

module.exports = ContactsTableSchema
