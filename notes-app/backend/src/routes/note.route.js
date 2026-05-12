import { getNotes, editNote, createNote, deleteNote } from '../controllers/note.controller.js'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route(`/:id`)
    .put(editNote)
    .delete(deleteNote)


export default router