import express from 'express'

const port = 3003
const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

export default server
