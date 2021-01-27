const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('./database')

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

// Hooks
Coffee.beforeSave(user => {
  if(Array.isArray(user.ingredients) && !user.ingredients.includes("love")) user.ingredients.push("love")
})

// Instance Method
Coffee.prototype.getIngredients = function() {
  return this.ingredients.join(", ");
}
// Class Method
Coffee.findByIngredient = function(name) {
  return this.findAll({
    where: {
      ingredients: {
        [Op.contains]: [name]
      }
    }
  })
}

module.exports = Coffee
