import express from 'express'
import cors from 'cors'
import AppRoute from './src/Routers/index.js'
import dontenv from 'dotenv'
dontenv.config()
const PORT=process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(AppRoute)

app.listen(PORT,()=>console.log(`app listing in ${PORT}`))