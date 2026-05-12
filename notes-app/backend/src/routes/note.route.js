import { getNotes, editNote, createNote } from '../controllers/note.controller'
import express from 'express'

const router = express.Router()

router.route('/')
    .get(getNotes)
    .post(createNote)

router.route(`/:id`)
    .put(editNote)


export default router