const express = require('express')
const app = express()
const fs = require('fs');

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const saveBook = (data) => {

let results = JSON.stringify(data);

fs.writeFileSync("db.json", results)

}
const books = require("./db")

app.get('/books',(req,res) => {
    res.send(books)
})

app.get('/books/:id',(req,res) => {
    res.send(books.find(book => book.id === req.params.id))
})

app.post('/books', (req, res) => {

    books.push(req.body)
    
    saveBook(books)
    
    res.status(201).json(req.body)
    
    })

    app.put('/books/:id', (req, res) => {

        const updateIndex = books.findIndex(x => x.id == req.params.id)
        
        Object.assign(books[updateIndex], req.body)
        
        saveBook(books)
        
        res.status(200).json(req.body)
        
        })

        app.delete('/books/:id', (req, res) => {

            const deletedIndex = books.findIndex(book => book.id === req.params.id)
            
            books.splice(deletedIndex, 1)
            
            saveBook(books)
            
            res.status(204).send()
            
            })

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/getname',(req,res) => {
    res.send('Chutima Pamee')
})

app.get('/getabout',(req,res) => {
    let data = {
        name: 'Chutima Pamee' ,
        age: 20,
        email: 'chutima.pame@bumail.net' ,
        address: 'Singburi Thailand'
    }
    res.send(data)
})

app.get('/getproject',(req,res) => {
    let data = {
        project_name: 'กราฟฟิก smo bu' ,
        project_description: 'ภาพกราฟฟิกที่ทำให้มอเราทั้งหมด' ,
        project_link: 'https://drive.google.com/drive/folders/1donRYeDaVFf2ryHoGGfDrFd5MmTnN7fZ?usp=sharing'
    }
    res.send(data)
})

app.get('/getcontact',(req,res) => {
    let data = {
        address: 'Singburi Thailand',
        email: 'chutima.pame@bumail.net' ,
        phone_number: '0623507813'
    }
    res.send(data)
})

app.listen(3000, () => {
    console.log('start sever at port 3000.')
})
