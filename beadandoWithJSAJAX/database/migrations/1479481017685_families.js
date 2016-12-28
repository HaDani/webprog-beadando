'use strict'

const Schema = use('Schema')

class FamiliesSchema extends Schema {

  up () {
    this.create('families', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('username', 80).notNullable()
      table.string('user_name', 80)

      table.integer('todo_id').unsigned().references('id').inTable('todos')
      table.string('name').notNullable()
      table.string('todo_name')
      
      table.integer('famMemb_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('families')
  }

}

module.exports = FamiliesSchema
