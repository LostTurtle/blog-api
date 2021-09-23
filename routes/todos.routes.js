const express = require('express')
const router = express.Router()
const {Todos} = require('../models/todo.model')
const jwt = require('jsonwebtoken')

// const user = {
//     id: 'sjfjfsdhfsd',
//     name: "Khaled Mohamed"
// }

router.get('/getTodos', async (req, res) => {
    // const authorization = req.headers.authorization

    // if (!authorization) return res.status(401).json({msg: 'Not authorized Request'})

    // try {
    //     const token = authorization.split(' ')[1]
    //     const user = jwt.verify(token, 'fsdfgggfdgdfg')

    //     const todos = await Todos.find({
    //         'createdBy.id': user.id
    //     })

    //     res.status(200).json({todos})

    // }catch(err) {
    //     res.status(401).json({msg: 'Not authorized Request'})
    // }

    const user = req.user
    const todos = await Todos.find({
        'createdBy.id': user.id
    })
    res.status(200).json({todos})
})

router.post('/createTodo', async (req, res) => {
    const {title, content} = req.body

    // const authorization = req.headers.authorization

    // if (!authorization) return res.status(401).json({msg: 'Not authorized Request'})
    // const token = authorization.split(' ')[1]

    // try {
    //     const user = jwt.verify(token, 'fsdfgggfdgdfg')

    //     const todo = new Todos({
    //         title,
    //         content,
    //         createdBy: {
    //             id: user.id,
    //             name: user.name
    //         }
    //     })
    //     await todo.save()
    //     res.status(201).json({todo})

    // }catch(err) {
    //     res.status(401).json({msg: 'Invalid token'})
    // }
    const user = req.user
    const todo = new Todos({
        title,
        content,
        createdBy: {
            id: user.id,
            name: user.name
        }
    })
    await todo.save()
    res.status(201).json({msg: 'Todo created Successfully', todo})
})

router.put('/updateTodo/:id', async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body
    // const authorization = req.headers.authorization

    // if (!authorization) return res.status(401).json({msg: 'Not authorized Request'})
    // const token = authorization.split(' ')[1]
    // try {
    //     const user = jwt.verify(token, 'fsdfgggfdgdfg')

    //     const todo = await Todos.findByIdAndUpdate(id, {
    //         title,
    //         content,
    //         createdBy: {
    //             id: user.id,
    //             name: user.name
    //         }
    //     })
    //     if (!todo) return res.status(404).json({msg: 'Todo Not Found'})
    //     res.status(200).json({todo})
    // }catch(err) {
    //     res.status(401).json({msg: 'Invalid token'})
    // }

    const user = req.user
    const todo = await Todos.findOneAndUpdate({
        _id: id,
        'createdBy.id': user.id
    }, {
        title,
        content
    })
    if (!todo) return res.status(404).json({msg: 'Article Not Found'})
    res.status(200).json({msg: 'Todo Updated Successfully', todo})
})

router.delete('/deleteTodo/:id', async (req, res) => {
    const {id} = req.params

    // const authorization = req.headers.authorization 

    // if (!authorization) return res.status(401).json({msg: 'Not authorized Request'})

    // const token = authorization.split(' ')[1]

    // try {
    //     const user = jwt.verify(token, 'fsdfgggfdgdfg')
    //     const todo = await Todos.findByIdAndDelete(id, {
    //         createdBy: {
    //             id: user.id,
    //             name: user.name
    //         }
    //     })
    //     if (!todo) return res.status(404).json({msg: 'Todo Not Found'})
    //     res.status(200).json({todo})
    // }catch(err){
    //     res.status(401).json({msg: 'Invalid token'})
    // }

    const user = req.user
    const todo = await Todos.findOneAndDelete({
        _id: id,
        'createdBy.id': user.id
    })
    if (!todo) return res.status(404).json({msg: 'Article Not Found'})
    res.status(200).json({msg: 'Todo Deleted'})
})

module.exports = router