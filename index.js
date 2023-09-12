const express = require('express')
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const port = 3000

let comments = [
    {
        id: uuidv4(),
        name: 'Harry',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, magnam.'
    },
    {
        id: uuidv4(),
        name: 'Hermine',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, neque!'
    },
    {
        id: uuidv4(),
        name: 'Ron',
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, excepturi!'
    },
    {
        id: uuidv4(),
        name: 'Neville',
        comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius.'
    },
]

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comments', (req, res) => {
    console.log('get comments')
    // console.log(comments)
    res.render('comments/comments', {comments})
})

app.get('/comments/new', (req, res) => {
    console.log('get new comment')
    res.render('comments/newComment')
})

app.post('/comments', (req, res) => {
    const { username, commentText} = req.body
    console.log('post new comment')
    let newComment = {id: uuidv4(), name: username, comment: commentText}
    comments.push(newComment)
    // console.log(newComment)
    res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
    console.log('get single comment')
    const {id: idParam} = req.params
    // console.log('idParam', idParam)
    let commentIndex = comments.findIndex(comment => comment.id === idParam)
    const {id: commentID, name: username, comment: commentText} = comments[commentIndex]
    // console.log(commentID, username, commentText)
    res.render('comments/comment', {commentID, username, commentText})
})

app.get('/comments/:id/edit', (req, res) => {
    console.log('get edit single comment')
    // res.send('get edit single comment')
    const {id: idParam} = req.params
    let commentIndex = comments.findIndex(comment => comment.id === idParam)
    const {id: commentID, name: username, comment: commentText} = comments[commentIndex]
    res.render('comments/editComment', {commentID, username, commentText})
})

app.patch('/comments/:id', (req, res) => {
    console.log('post edit single comment')
    // res.send('post edit single comment')
    const {id: idParam} = req.params
    // console.log('req.params', req.params)
    // console.log('req.body', req.body)
    const { commentText: newCommentText } = req.body
    
    let commentIndex = comments.findIndex(comment => comment.id === idParam)
    
    comments[commentIndex].comment = newCommentText
    // console.log('new comment:\n', comments[commentIndex])
    res.redirect(`/comments/${idParam}`)
})

app.delete('/comments/:id', (req, res) => {
    console.log('delete delete single comment')
    // res.send(`delete delete single comment`)
    const {id: idParam} = req.params
    console.log('req.params', req.params)
    console.log('req.body', req.body)

    let commentIndex = comments.findIndex(comment => comment.id === idParam)

    comments.splice(commentIndex, 1)
    console.log(`database (with deleted ${idParam}):\n`, comments)

    res.redirect('/comments')
})

// TODO:
// delete comment

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})