const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Datastore = require('nedb')
const axios = require('axios')

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'https://api.open.ru'

const db = {
  cards: new Datastore(),
  accounts: new Datastore()
}
const app = express()

app.use(bodyParser.json())

// Serve static files
app.use(express.static(path.resolve('./build')))

app.use((req, res, next) => {
  // Only use for /api calls
  const isApiCall = /^\/api\//.test(req.path)
  app.locals.token = req.headers.authorization

  if (!app.locals.token && isApiCall && req.path !== '/api/session') {
    res.send(401)
    return
  }
  next()
})

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
    .get('/MyCards/1.0.0/MyCardsInfo/cardlist')
    .then(response => {
      cards = response.data.Cards.Card.map(card => ({
        name: card.CardName,
        card_id: card.CardId,
        type: card.CardType,
        payment_system: card.CardPaymentSystem
      }))

      const promiseSerial = funcs =>
        funcs.reduce(
          (promise, func) =>
            promise.then(result =>
              func().then(Array.prototype.concat.bind(result))
            ),
          Promise.resolve([])
        )

      const requests = cards.map(card => () => {
        return axios.post('/MyCards/1.0.0/MyCardsInfo/balance', {
          CardId: +card.card_id
        })
      })
      return promiseSerial(requests)
    })
    .then(responses => {
      const parsedResponces = responses.map(response => response.data)
      cards = cards.map(card => {
        const balance = parsedResponces.find(response => {
          return response.CardId === card.card_id
        })
        card.balance = balance.CardBalance[0].Value
        return card
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
  db.cards.findOne({ card_id: req.params.id }, (error, card) => {
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
  db.accounts.findOne({ token: app.locals.token }, (error, account) => {
    if (error) {
      return res.status(500).json({ error })
    }
    axios
      .post('/MyCards/1.0.0/MyCardsInfo/history', {
        CardId: +account.card_id
      })
      .then(({ data }) => {
        account.expenses = account.expenses.concat(
          data.CardTransactionsList[0].CardTransaction
            .filter(transaction => parseFloat(transaction.TransactionSum) < 0)
            .map(transaction => {
              return {
                id: Math.random()
                  .toString(16)
                  .slice(2),
                created_at: transaction.TransactionDate,
                place: transaction.TransactionPlace,
                amount: parseFloat(transaction.TransactionSum),
                is_needs: false,
                reviewed: false
              }
            })
        )
        db.accounts.update(
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
      .catch(error => {
        res.status(500).json({ error })
      })
  })
})

app.put('/api/expenses/:id/tag', (req, res) => {
  db.accounts.findOne({ token: app.locals.token }, (error, account) => {
    if (error) {
      return res.status(500).json({ error })
    }
    const expenseId = account.expenses.findIndex(el => el.id === req.params.id)
    account.expenses[expenseId].is_needs = req.query.is_needs === 'true'
    account.expenses[expenseId].reviewed = true
    db.accounts.update(
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'))
})

app.listen(9000)
