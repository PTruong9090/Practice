import { Note } from "../models/note.model"

export const createNote = async (req, res) => {
    try {
        const {title, body} = req.body
        
        if (!title) {
            return res.status(400).json({
                status: 'Error',
                message: 'Missing title'
            })
        }

        const note = await Note.create({
            title: title,
            body: body,
        })

        res.status(201).json({
            status: 'Success',
            message: 'Note created sucessfully',
            note
        })
    } catch (error) {
        console.error('Create note error', error)
        res.status(500).json({
            status: 'Error',
            message: 'Server error while creating note'
        })
    }
}

export const getNotes = async (req, res) => {
    try {
        const note = await Note.findAll()
        res.status(200).json({
            status: 'Success',
            note
        })
    } catch {

    }
}

export const editNote = async (req, res) => {

}
