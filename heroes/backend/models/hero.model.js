let heroes = require('../heroData/heroes.json')
const filename = './heroData/heroes.json'
const helper = require('../helpers/helpers')

function getHeroes() {
    return new Promise((resolve, reject) => {
        if (heroes.length === 0) {
            reject({
                message: 'no heroes available',
                status: 202
            })
        }
        resolve(heroes)
    })
}

function insertHero(newHero) {
    return new Promise((resolve, reject) => {
        const id = helper.getNewId(heroes);
        newHero.id = id
        newHero = { ...newHero }
        heroes.push(newHero)
        helper.writeJSONFile(filename, heroes)
        resolve(newHero)
    })
}

function updateHero(id, newHero) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(heroes, id)
            .then(hero => {
                const index = heroes.findIndex(el => el.id == hero.id)
                id = hero.id
                heroes[index] = { ...id, ...newHero }
                helper.writeJSONFile(filename, heroes)
                resolve(heroes[index])
            })
            .catch(err => reject(err))
    })
}

function deleteHero(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(heroes, id)
            .then(() => {
                heroes = heroes.filter(p => p.id != id)
                helper.writeJSONFile(filename, heroes)
                resolve(heroes)
            })
            .catch(err => reject(err))
    })
}

module.exports = {
    insertHero,
    getHeroes,
    updateHero,
    deleteHero
}