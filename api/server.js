// implement your server here
// require your posts router and connect it here

// Instanciation of server
const express = require('express');
const server = express()
server.use(express.json())

// Instanciation of router middleware
const postsRouter = require('./posts/posts-router')
server.use('/api/posts', postsRouter)


//default endpoint
server.get('/', (req, res) => {
    res.send(`
     <h1>Posts API </h1>
                `)
})


module.exports = server;