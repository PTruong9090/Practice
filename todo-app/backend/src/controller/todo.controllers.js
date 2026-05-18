import { Todo } from '../models/todo.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'


export const getTodoList = asyncHandler(async (req, res) => {
    
    const todo = await Todo.findAll()

    return res.status(200).json({
        success: true,
        data: todo
    })
})

export const getTodo = asyncHandler(async (req, res) => {
    const id = req.params.id

    const todo = await Todo.findByPk(id)

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: 'Todo not found'
        })
    }

    return res.status(200).json({
        success: true,
        data: todo
    })

})

export const createTodo = asyncHandler(async (req, res) => {
    const { title, description, completed, priority, dueDate} = req.body

    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing title'
        })
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'Missing completed field'
        })
    }

    if (!priority) {
        return res.status(400).json({
            success: false,
            message: 'Missing priority field'
        })
    }

    const todo = await Todo.create({
        title,
        description,
        completed,
        priority,
        dueDate,
    })

    return res.status(200).json({
        success: true,
        message: 'Todo item successfully created.',
        data: todo
    })

})

export const editTodo = asyncHandler(async (req, res) => {
    const { title, description, completed, priority, dueDate} = req.body
    const id = req.params.id

    const todo = await Todo.findByPk(id)

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: 'Todo item does not exist'
        })
    }

    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'Invalid or missing title'
        })
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'Missing completed field'
        })
    }

    if (!priority) {
        return res.status(400).json({
            success: false,
            message: 'Missing priority field'
        })
    }

    await todo.update({
        title,
        description,
        completed,
        priority,
        dueDate
    })

    return res.status(200).json({
        success: true,
        message: "Completed updated successfully",
        data: todo
    })
})

export const toggleTodo = asyncHandler(async (req, res) => {
    const { completed } = req.body
    const id = req.params.id

    const todo = await Todo.findByPk(id)

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: 'Todo item not found in database',
        })
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'Invalid toggle value'
        })
    }

    await todo.update({
        completed
    })

    return res.status(200).json({
        success: true,
        message: "Completed updated successfully",
        data: todo
    })

})

export const deleteTodo = asyncHandler(async (req, res) => {
    const id = req.params.id

    const todo = await Todo.findByPk(id)

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo item does not exist"
        })
    }

    await todo.destroy()

    return res.status(204).send()
})