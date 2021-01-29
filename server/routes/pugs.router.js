const router = require('express').Router()
const { Pug } = require('../models')


router
  .get('/', async (req, res, next) => {
    try {
      const pugs = await Pug.findAll()
      res.status(200).json(pugs)
    } catch (err) {
      next(err)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newPug = await Pug.create(req.body)
      res.status(201).json(newPug)
    } catch (err) {
      next(err)
    }
  })


router
  .get('/:pugId', async (req, res, next) => {
    try {
      const pug = await Pug.findByPk(req.params.pugId)
      if(!pug.id) res.sendStatus(404)
      else res.json(pug)
    } catch (err) {
      next(err.status)
    }
  })
  .put('/:pugId', async (req, res, next) => {
    try {
      const data = await Pug.update(req.body, {
        returning: true,
        where: { id: req.params.pugId }
      })

      if(data.length !== 2) res.sendStatus(404)
      else {
        const [ rowNums, [updatedPug] ] = data
        res.status(200).json(updatedPug)
      }
    } catch (err) {
      next(err.status)
    }
  })
  .delete('/:pugId', async (req, res, next) => {
    try {
      const numsDestroyed = await Pug.destroy({
        where: { id: req.params.pugId}
      })
      if(!numsDestroyed) res.sendStatus(404)
      else res.sendStatus(204)
      // const pug = await Pug.findByPk(req.params.pugId)
      // if(!pug.id) res.sendStatus(404)
      // else {
      //   await pug.destroy()
      //   res.sendStatus(204)
      // }
    } catch (err) {
      next(err.status)
    }
   })

router.get('/favoriteCoffee/:favoriteCoffeeName', async(req, res, next) => {
  try {
    const pugsWithCoffee = await Pug.findByCoffee(req.params.favoriteCoffeeName)
    res.status(200).json(pugsWithCoffee)
  } catch (err) {
    next(err)
  }
})

module.exports = router
