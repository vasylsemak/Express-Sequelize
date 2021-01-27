const router = require('express').Router()
const { Coffee } = require('../models')

router
  .get('/', async (req, res, next) => {
    try {
      const allCoffee = await Coffee.findAll()
      res.status(200).json(allCoffee)
    } catch(err) {
      next(err)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCoffee = await Coffee.create({name: req.body.name})
      res.status(201).json(newCoffee)
    } catch(err) {
      next(err)
    }
  })

router.get('/:coffeeId', async (req, res, next) => {
  try {
    const coffee = await Coffee.findByPk(req.params.coffeeId)
    if(!coffee.id) res.sendStatus(404)
    else res.status(200).json(coffee)
  } catch(err) {
    next(err.status)
  }
})


router.get('/ingredients/:ingridName', async (req, res, next) => {
  try {
    const coffee = await Coffee.findByIngredient(req.params.ingridName)
    res.status(200).json(coffee)
  } catch(err) {
    next(err)
  }
})

module.exports = router
