import { Note } from "../models/note.model.js"

export const createNote = async (req, res) => {
    try {
        const {title, body} = req.body
        
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Missing title'
            })
        }

        const note = await Note.create({
            title: title.trim(),
            body: body,
        })

        return res.status(201).json({
            success: true,
            message: 'Note created sucessfully',
            data: note
        })

    } catch (error) {
        console.error('Create note error', error)
        return res.status(500).json({
            status: 'Error',
            message: 'Server error while creating note'
        })
    }
}

export const getNotes = async (req, res) => {
    try {
        const note = await Note.findAll({
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json({
            status: 'Success',
            data: note
        })

    } catch (error) {
        console.error('Error getting notes: ', error)

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

export const editNote = async (req, res) => {
    try {
        const {title, body} = req.body
        const id = req.params.id
        const note = await Note.findByPk(id)

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note does not exist in database'
            })
        }

        if (title === null || title === undefined || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title must be provided.'
            })
        }

        await note.update({
            title,
            body
        })

        return res.status(204).send()

    } catch (error) {
        console.error(error.message)

        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id)

        if (!note) {
            return res.json(404).json({
                success: false,
                message: 'Note not found'
            })
        }

        await note.destroy()

        return res.json(204).send()

    } catch (error) {
        console.error(error.message)

        return res.json(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}