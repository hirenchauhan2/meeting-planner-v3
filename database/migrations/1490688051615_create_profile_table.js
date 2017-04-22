'use strict'

const Schema = use('Schema')

class ProfileTableSchema extends Schema {
  up () {
    this.create('profiles', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('fname', 60).notNullable()
      table.string('lname', 60).notNullable()
      table.string('profile_pic')
      table.enu('gender', ['male', 'female', 'other']).notNullable()
      table.string('mobile', 15).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('profile')
  }
}

module.exports = ProfileTableSchema
