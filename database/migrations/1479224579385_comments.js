'use strict'

const Schema = use('Schema')

class CommentsSchema extends Schema {

  up () {
    this.create('comments', (table) => {
      table.increments()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('text').notNullable()
      table.integer('todo_id').unsigned().references('id').inTable('todos')
      table.timestamps()
    })
  }

  down () {
    this.drop('comments')
  }

}

module.exports = CommentsSchema
