import { getNotes, editNote, createNote, deleteNote, getNote } from '../controllers/note.controller.js'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route(`/:id`)
    .put(editNote)
    .delete(deleteNote)
    .get(getNote)


export default router