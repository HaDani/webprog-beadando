'use strict'

const Schema = use('Schema')

class TodossSchema extends Schema {

  up () {
    this.create('todos', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('year_date').unsigned()
      table.integer('month_date').unsigned()
      table.integer('day_date').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('todos')
  }

}

module.exports = TodossSchema
