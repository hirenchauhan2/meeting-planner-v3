'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('contact_id').unsigned().references('id').inTable('users')
      table.integer('is_favorite').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }

}

module.exports = ContactsTableSchema
