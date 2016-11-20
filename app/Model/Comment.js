'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {
  todos() {
    return this.belongsTo('App/Model/Todo')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }


}

module.exports = Comment
