const delayAndMock = (data, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

module.exports = {
  generateTransactions() {
    const data = [
      {
        created_at: '10.09.2017',
        place: 'Авиакомпания «Аэрофлот»',
        amount: -7500.0
      },
      {
        created_at: '09.09.2017',
        place: 'Дикси',
        amount: -1200.0
      },
      {
        created_at: '12.09.2017',
        place: 'Лос Поллос на Покровке',
        amount: -1950.0
      },
      {
        created_at: '12.09.2017',
        place: 'DI Telegraph',
        amount: -800.0
      },
      {
        created_at: '12.09.2017',
        place: 'Uniqlo',
        amount: -3500.0
      }
    ].map(x =>
      Object.assign(x, {
        id: Math.random()
          .toString(16)
          .slice(2),
        is_needs: false,
        reviewed: false
      })
    )

    return delayAndMock(data, 600)
  },

  fetchCards() {
    return delayAndMock(
      [
        {
          id: '1',
          card_id: '1',
          name: 'Дебетовая карта',
          balance: '95000.0',
          payment_system: 'visa'
        },
        {
          id: '2',
          card_id: '2',
          name: 'Кредитная карта',
          balance: '42000.0',
          payment_system: 'mastercard'
        },
        {
          id: '3',
          card_id: '3',
          name: 'Карта для путешествий',
          balance: '73400.0',
          payment_system: 'mir'
        }
      ],
      500
    )
  }
}
