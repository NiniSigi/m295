import express from 'express'
import session from 'express-session'
import books from './books.js'
import lends from './lends.js'
const app = express()
const port = 3000
app.use(
  express.json(),
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  })
)
app.use('/lends', lends)
app.use('/books', books)
const secretAdminCredentials = { email: 'desk@library.example', password: 'm295' }
app.post('/login', (request, response) => {
  console.log(request.body)
  const { email, password } = request.body
  if (email?.toLowerCase() === secretAdminCredentials.email && password === secretAdminCredentials.password) {
    request.session.email = email
    return response.status(200).json({ email: request.session.email })
  }
  return response.status(401).json({ error: 'Invalid credentials' })
})
app.get('/verify', function (request, response) {
  if (request.session.email) {
    return response.status(200).json({ email: request.session.email })
  }

  return response.status(401).json({ error: 'Not logged in' })
})

app.delete('/logout', function (request, response) {
  if (request.session.email) {
    request.session.email = null
    return response.status(204).send()
  }
  return response.status(401).json({ error: 'Not logged in' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
