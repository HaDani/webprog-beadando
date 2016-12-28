'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  todos () {
    return this.hasMany('App/Model/Todo')
  }

  comments() {
    return this.hasMany('App/Model/Comment')
  }
  
  members() {
    return this.hasMany('App/Model/Family') 
  }
}

module.exports = User
