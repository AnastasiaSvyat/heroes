function mustBeInteger(req, res, next) {
    const id = req.query.id || req.body.id || req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsHero(req, res, next) {
    const { nickname, real_name, superpowers } = req.body
    if (superpowers && nickname && real_name) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsHero
}