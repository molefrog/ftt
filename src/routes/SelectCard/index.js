import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { colors } from '../../styles'
import CardOption from '../../components/CardOption'
import LoadingSpinner from '../../ui/LoadingSpinner'

// redux actions and selectors
import { getCards } from '../../store/modules/cards'
import { setupWithCard, isSyncing } from '../../store/modules/transactions'

class SelectCardRoute extends React.Component {
  static propTypes = {
    cards: PropTypes.array,
    setupWithCard: PropTypes.func,
    isSyncing: PropTypes.bool
  }

  render() {
    return (
      <SelectCard>
        <Header>
          Выберите карту
          {this.props.isSyncing && (
            <Loader>
              <LoadingSpinner />
            </Loader>
          )}
        </Header>

        <Content inactive={this.props.isSyncing}>
          <LoginText>
            Выберите счет, на основе которого вы будете контроллировать расходы.
            Вы сможете поменять счет через настройки приложения в любое время.
          </LoginText>

          {this.props.cards.map(card => (
            <CardOption
              key={card.card_id}
              name={card.name}
              type={card.payment_system}
              balance={parseFloat(card.balance)}
              onSelect={() => this.props.setupWithCard(card.card_id)}
            />
          ))}
        </Content>
      </SelectCard>
    )
  }
}

const Content = styled.div`
  transition: opacity 0.5s ease;

  ${props =>
    props.inactive
      ? css`
          opacity: 0.5;
          pointer-events: none;
        `
      : ''};
`

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
  display: flex;
  align-items: center;
`

const Loader = styled.div`
  margin-left: 10px;
  margin-top: 4px;
`

function mapStateToProps(state) {
  return {
    cards: getCards(state),
    isSyncing: isSyncing(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupWithCard: card => dispatch(setupWithCard(card))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCardRoute)
