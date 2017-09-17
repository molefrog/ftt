import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colors } from '../../styles'
import CardOption from '../../components/CardOption'

// redux actions and selectors
import { getCards } from '../../store/modules/cards'
import { setupWithCard } from '../../store/modules/transactions'

class SelectCardRoute extends React.Component {
  static propTypes = {
    cards: PropTypes.array,
    setupWithCard: PropTypes.func
  }

  render() {
    return (
      <SelectCard>
        <Header>Выберите карту</Header>
        <LoginText>
          Выберите счет, на основе которого вы будете контроллировать расходы.
          Вы сможете поменять счет через настройки приложения в любое время.
        </LoginText>

        {this.props.cards.map(card => (
          <CardOption
            key={card.id}
            name={card.name}
            type={card.type}
            balance={card.balance}
            onSelect={() => this.props.setupWithCard(card.id)}
          />
        ))}
      </SelectCard>
    )
  }
}

const SelectCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 140px;
`

const LoginText = styled.div`
  color: ${colors.gray};
  font-size: 16px;
  margin-bottom: 35px;
`

const Header = styled.h3`
  size: 20px;
  font-weight: 500;
  color: ${colors.black};
`

function mapStateToProps(state) {
  return {
    cards: getCards(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupWithCard: card => dispatch(setupWithCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCardRoute)
