import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const app = express.Router()

let lends = [
  {
    id: '2f5f028d-0e32-4e0d-bf8a-0cc4b5b63c82',
    customer_id: '1',
    isbn: '978-3-522-46051-4',
    borrowed_at: '2024-05-14T08:00:00Z',
    returned_at: null
  }
]

app.use(
  express.json()
)
app.get('/', (request, response) => {
  if (!request.session.email) {
    return response.status(401).send('Unauthorized')
  }
  response.send(lends)
})

app.get('/:id', (request, response) => {
  if (!request.session.email) {
    return response.status(401).send('Unauthorized')
  }
  response.send(lends.find((lend) => lend.id === request.params.id))
})

app.post('/', (request, response) => {
  if (!request.session.email) {
    return response.status(401).send('Unauthorized')
  }
  const completBook = {
    ...request.body,
    id: uuidv4(),
    borrowed_at: new Date().toLocaleString('de-CH'),
    returned_at: null
  }
  lends = [...lends, completBook]
  response.send(completBook)
})

app.delete('/:id', (request, response) => {
  if (!request.session.email) {
    return response.status(401).send('Unauthorized')
  }
  const lend = lends.find((lend) => lend.id === request.params.id)
  const lendReturned = {
    ...lend,
    returned_at: new Date().toLocaleString('de-CH')
  }
  console.log(lendReturned)
  lends = lends.map((book) =>
    book.id === request.params.id ? { ...book, ...lendReturned } : book
  )
  response.send(lends)
})

app.patch('/:id', (request, response) => {
  const updatedLend = request.body
  lends = lends.map((lend) =>
    lend.id === request.params.id ? { ...lend, ...updatedLend } : lend
  )
  response.send(lends)
})

export default app
