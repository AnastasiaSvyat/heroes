const express = require('express')
const router = express.Router()
const heroAction = require('../models/hero.model')
const m = require('../helpers/middlewares')

/* All heroes */
router.get('/heroes', async (req, res) => {
    await heroAction.getHeroes()
        .then(hero => res.json(hero))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})

/* Insert a new hero */
router.post('/create-hero', m.checkFieldsHero, async (req, res) => {
    await heroAction.insertHero(req.body)
        .then(hero => res.status(201).json({
            message: `The hero has been created`,
            content: hero
        }))
        .catch(err => {
            res.status(500).json({ message: req.body })
        })

})

/* Update a hero */
router.put('/update-hero', m.mustBeInteger, m.checkFieldsHero, async (req, res) => {
    const id = req.params.id || req.body.id
    await heroAction.updateHero(id, req.body)
        .then(hero => res.json({
            message: `The hero has been updated`,
            content: hero
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

/* Delete a hero */
router.delete('/delete-hero/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await heroAction.deleteHero(id)
        .then(heroes => res.json({
            message: `The hero has been deleted`,
            content: heroes
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

module.exports = router