const express = require('express')
const { modelNames } = require('mongoose')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (e) {
        res.json({ message: e })
    }
})

router.post('/', async (req, res) => {
    console.log(req)
    const { title, description, id } = req.body
    const post = new Post({
        title,
        description,
        id
    })
    try {
        const savedPost = await post.save()
        console.log(savedPost)
        res.status(201).json(savedPost)
    } catch (e) {
        res.status(400).json({ message: "Не удалось сохранить пост" })
    }
})

router.get('/:postId', async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.postId)
        res.json(foundPost)
    } catch (e) {
        res.status(404).json({ message: e })
    }
})

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { $set: { title: req.body.title, description: req.body.description } })
        await updatedPost.save()
        res.json(updatedPost)
    } catch (e) {
        res.json({ message: "Не удалось отредактировать пост" })
    }

})

router.delete('/', async (req, res) => {
    try {
        console.log(req.body)
        await Post.remove({ id: req.body.id })
        res.json({ message: "Post deleted" })
    } catch (e) {
        res.json({ message: "Не удалось удалить пост" })
    }

})


module.exports = router 