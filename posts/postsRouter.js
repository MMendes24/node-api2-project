// ANTIQUATED IMPORT METHODS TO PRACTICE //
const express = require('express')
const Posts = require('../data/db') // importing the helper functions from the database
const router = express.Router() // router must be imported out of the box from the Express API to work

//SETTING UP THE ROUTER//

//GET REQUEST FIRST//
router.get('/', (req, res) => {
    res.status(200).json({ hello: "world"})
})

module.exports = router