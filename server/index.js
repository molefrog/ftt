const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Datastore = require('nedb')

const adapter = require('./fake-adapter')

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
  adapter.fetchCards().then(cards => res.json(cards))
})

app.post('/api/cards/:id/setup', (req, res) => {
  adapter.fetchCards().then(cards => {
    const card = cards.filter(x => x.card_id === req.params.id)[0]

    if (!card) {
      return res.status(500).json({ error: 'No card found' })
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

    adapter
      .generateTransactions()
      .then(transactions => {
        account.expenses = account.expenses.concat(transactions)

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
