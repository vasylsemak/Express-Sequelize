const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: {
    type: Sequelize.TEXT
  }
})

// Instance Methods
Pug.prototype.isPuppy = function() {
  return this.age < 1 ? true : false
}

Pug.prototype.shortBio = function() {
  let long = this.biography
  let short = '';

  for(let i = 0; i < long.length; i++) {
    if(long[i] === '.' || long[i] === '!' || long[i] === '?') {
      short = long.slice(0, i)
      break
    }
  }
  return short
  // return this.biography.match(/[\w\s]+/)[0]
}

// Class Methods
Pug.findByCoffee = function(coffeeName) {
  return Pug.findAll({
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: { name: coffeeName }
    }
  })
}



// Hooks
Pug.beforeSave(pug =>
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1))

module.exports = Pug
