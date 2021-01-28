const db = require('./database')
const Pug = require('./pug.model')
const Coffee = require('./coffee.model')

Coffee.hasMany(Pug)
Pug.belongsTo(Coffee, { as: 'favoriteCoffee' })

Pug.belongsToMany(Pug, { as: 'friends', through: 'friendship' })

module.exports = {
  db,
  Pug,
  Coffee
}
