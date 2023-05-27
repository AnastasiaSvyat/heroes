const express = require("express")
const router = express.Router();
const fs = require('fs');

const dataHero = require('./heroData/heroData.json');

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}


router.get('/api/message', (req, res) => {
    const accounts = getAccountData()
    res.send(accounts)
  })

module.exports = router;