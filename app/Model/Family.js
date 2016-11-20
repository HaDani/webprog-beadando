'use strict'

const Lucid = use('Lucid')

class Family extends Lucid {

  todos () {
    return this.hasMany('App/Model/Todo')
  }
  
  users() {
    return this.hasMany('App/Model/User') 
  }
}

module.exports = Family
