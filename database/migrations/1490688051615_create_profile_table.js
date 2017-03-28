'use strict'

const Schema = use('Schema')

class ProfilesTableSchema extends Schema {
  up () {
    this.create('profiles', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('fname', 60).notNullable()
      table.string('lname', 60).notNullable()
      table.string('profile_pic', 120)
      table.string('gender', 6).notNullable()
      table.string('mobile', 15).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesTableSchema
