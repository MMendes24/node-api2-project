// ANTIQUATED IMPORT METHODS TO PRACTICE //
const express = require('express')
const Posts = require('../data/db') // importing the helper functions from the database
const router = express.Router() // router must be imported out of the box from the Express API to work

//SETTING UP THE ROUTER//

//GET REQUESTS FIRST//
router.get('/', (req, res) => {
    Posts.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    //DO NOT FORGET WHAT YOU NEED TO FEED THE FIND BY ID METHOD, ALWAYS DOUBLE CHECK FOR PARAMTERS IN THE DB
    const id = req.params.id
    Posts.findById(id)
    .then(postbyId => {
        if(postbyId[0]) {
            console.log(postbyId)
            res.status(200).json(postbyId)
        } else {
        res.status(404).json({message: "The post with the specified ID does not exist." })
    }})
    .catch(err => {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Posts.findPostComments(id)
    .then(commentsByPostId => {
        res.status(200).json({commentsByPostId})
    })
    .catch(err => {
        res.status(404).json({message: "The post with the specified ID does not exist." })
    })
})

//POST REQUESTS //
// router.post('/', (req, res) => {
//     const newPost = req.body
//     Posts.insert(newPost)
//     .then( (thenRes) => {
//         if (!newPost.title || !newPost.contents) {
//             res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
//         } else {
//             res.status(201).json(newPost)
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: "There was an error while saving the post to the database" })
//     })
// })
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(req.body)
        .then(thenRes => {
            res.status(201).json(req.body)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

//PUT REQUEST

module.exports = router