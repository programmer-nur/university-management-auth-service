import express, { Application } from 'express'
import cors from 'cors'
const app: Application = express()
import userRouter from './app/modules/users/users.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', userRouter)

export default app
