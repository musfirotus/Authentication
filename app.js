const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

const routeIndex = require('./src/routes/index')
const routeAuthor = require('./src/routes/authors')

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())

app.use('/', routeIndex)
app.use('/author', routeAuthor)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})