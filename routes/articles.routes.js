const express = require('express')
const router = express.Router()

const articles = [{
    id: new Date().getTime(),
    title: "article 1",
    content: "This is article 1",
    createdAt: new Date()
}];

router.get('/getarticles', (req, res) => {
    res.status(200).json({
        articles
    })
})


router.post('/createarticle', (req,res) => {
    const {title,content} = req.body

    articles.push({
        id: new Date().getTime(),
        title,
        content,
        createdAt: new Date()
    })
    res.status(201).json({
        articles
    })
})

router.put('/updatearticles/:id', (req, res) => {
    const {id} = req.params
    const {title,content} = req.body
    const article = articles.find(art => art.id == id)

    if(!article) return res.status(404).json({msg: "article not found"})
    articles.title = title
    articles.content = content
    res.status(200).json({articles})
})

router.delete('/deletearticle/:id', (req,res) => {
    const {id} = req.params
    const articleIndex = articles.findIndex(art => art.id == id)
    if(articleIndex === -1) return res.status(404).json({msg: "Article not found"})
    articles.splice(articleIndex, 1)
    res.status(200).json({articles})
})

module.exports = router;