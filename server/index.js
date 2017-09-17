const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Datastore = require('nedb')
const axios = require('axios')

axios.defaults.headers.post['Content-Type'] = 'application/json'

const db = {
  cards: new Datastore(),
  accounts: new Datastore()
}
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  app.locals.token = req.headers.authorization
  if (!app.locals.token && req.path !== '/api/session') {
    res.send(401)
    return
  }
  next()
})

// Serve static files
app.use(express.static(path.resolve('./public')))

app.post('/api/session', (req, res) => {
  const token = Math.random()
    .toString(16)
    .slice(2)
  res.json({ token: token })
})

app.delete('/api/session', (req, res) => {
  db.accounts.remove({ token: app.locals.token }, {}, error => {
    if (error) return res.status(500).json({ error })
    res.json('ok')
  })
})

app.get('/api/cards', (req, res) => {
  let cards = []
  axios
    .get('https://api.open.ru/MyCards/1.0.0/MyCardsInfo/cardlist')
    .then(response => {
      cards = response.data.Cards.Card.map(card => ({
        name: card.CardName,
        card_id: card.CardId,
        type: card.CardType,
        payment_system: card.CardPaymentSystem
      }))
      return Promise.all(
        cards.map(card => {
          return axios.post(
            'https://api.open.ru/MyCards/1.0.0/MyCardsInfo/balance',
            {
              CardId: card.card_id
            }
          )
        })
      )
    })
    .then(responses => {
      console.log(responses)
      cards = cards.map(card => {
        const balance = responses.find(
          responce => responce.data.CardId === card.card_id
        )
        return Object.assign(card, {
          balance: balance.Value
        })
      })
      db.cards.insert(cards, (error, newDoc) => {
        if (error) {
          return res.status(500).json({ error })
        }
        res.json(cards)
      })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.post('/api/cards/:id/setup', (req, res) => {
  db.cards.findOne({ card_id: +req.params.id }, (error, card) => {
    if (error) {
      return res.status(500).json({ error })
    }
    const account = {
      token: app.locals.token,
      card_id: card.card_id,
      balance: card.balance,
      expenses: [],
      incomes: []
    }
    db.accounts.insert(account, (error, newAcc) => {
      if (error) {
        return res.status(500).json({ error })
      }
      res.json(newAcc)
    })
  })
})

app.get('/api/account', (req, res) => {
  db.accounts.findOne({ token: app.locals.token }, (error, account) => {
    if (error) {
      return res.status(500).json({ error })
    }
    res.json(account)
  })
})

app.post('/api/sync', (req, res) => {
  res.json('ok')
})

app.put('/api/expenses/:id/tag', (req, res) => {
  db.accounts.findOne({ token: app.locals.token }, (error, account) => {
    if (error) {
      return res.status(500).json({ error })
    }
    const expenseId = account.findIndex(el => el.id === req.params.id)
    account.expenses[expenseId].is_needs = req.query.is_needs === 'true'
    account.expenses[expenseId].reviewed = true
    db.update(
      { token: app.locals.token },
      account,
      {},
      (error, numReplaced) => {
        if (error) {
          return res.status(500).json({ error })
        }
        res.json(account)
      }
    )
  })
})

app.listen(9000)
