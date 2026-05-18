import { getTodo, createTodo, editTodo, getTodoList, deleteTodo, toggleTodo } from "../controller/todo.controllers.js";
import express from 'express'

const router = express.Router()

router.route('/')
    .get(getTodoList)
    .post(createTodo)

router.route('/:id')
    .get(getTodo)
    .put(editTodo)
    .delete(deleteTodo)

router.route('/:id/toggle')
    .put(toggleTodo)

export default router