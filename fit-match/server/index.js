const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://project:project@35lproject.3p5ldxo.mongodb.net/?retryWrites=true&w=majority"

const app = express()

app.get('/', (req, res) => {
    res.json('hello')
}) 

app.post('/signup', (req, res) => {
    res.json('Hello to my app')
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))