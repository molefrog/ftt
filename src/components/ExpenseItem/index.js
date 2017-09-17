import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { colors } from '../../styles'
import Roubles from '../Roubles'

import unconfirmedIcon from './unconfirmed-icon.svg'
import confirmedIcon from './confirmed-icon.svg'

const ExpenseItem = ({ expense, carded }) => (
  <Expense carded={carded}>
    <Icon width={22} src={expense.reviewed ? confirmedIcon : unconfirmedIcon} />
    <Info>
      <ExpenceDate>{expense.created_at}</ExpenceDate>
      <ExpencePlace>{expense.place}</ExpencePlace>
    </Info>
    <ExpenceValue>
      <Roubles size={17} amount={expense.amount} />
    </ExpenceValue>
  </Expense>
)

const Icon = styled.img`margin-right: 20px;`

const Info = styled.div`flex: 1 1;`

const Expense = styled.div`
  border-bottom: 1px ${colors.grayLighter} solid;

  display: flex;
  align-items: center;
  padding: 14px 0;

  ${props =>
    props.carded
      ? css`
          border: 2px solid ${colors.grayLighter};
          border-radius: 6px;
          padding: 14px;
        `
      : ''};
`

const ExpenceDate = styled.div`
  font-size: 15px;
  color: ${colors.gray};
  margin-bottom: 2px;
`

const ExpencePlace = styled.div`
  font-size: 16px;
  color: ${colors.black};
`

const ExpenceValue = styled.div``

ExpenseItem.propTypes = {
  expense: PropTypes.object,
  carded: PropTypes.bool
}

export default ExpenseItem
